/**
 * Real-Time Continuous Jitter & Tremor Likelihood Detection Engine
 * Samples mouse coordinates every ~50ms into a 2-second rolling buffer.
 * Calculates jitterRatio (totalPath / netDisplacement) and micro-reversals
 * to output a calibrated 0-100% Tremor Likelihood Score.
 */

export class LiveJitterTracker {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 2000; // 2-second rolling buffer
    this.sampleIntervalMs = options.sampleIntervalMs || 45; // ~50ms sampling
    this.points = []; // [{x, y, t}]
    this.lastSampleTime = 0;
    this.threshold = options.threshold || 60; // 60% threshold
    this.onUpdate = options.onUpdate || null;
  }

  addPoint(x, y) {
    const now = Date.now();
    // Throttle sampling to ~50ms intervals
    if (now - this.lastSampleTime < this.sampleIntervalMs && this.points.length > 0) {
      return null;
    }
    this.lastSampleTime = now;

    this.points.push({ x, y, t: now });

    // Evict points older than rolling window (2s)
    const cutoff = now - this.windowMs;
    while (this.points.length > 0 && this.points[0].t < cutoff) {
      this.points.shift();
    }

    const metrics = this.computeScore();
    if (this.onUpdate) {
      this.onUpdate(metrics);
    }
    return metrics;
  }

  computeScore() {
    if (this.points.length < 6) {
      return {
        tremorLikelihood: 8,
        jitterRatio: 1.1,
        directionReversals: 0,
        isTremorDetected: false,
        classification: 'Smooth / Normal Trajectory'
      };
    }

    let totalPathLength = 0;
    let directionReversals = 0;
    let prevDx = 0;
    let prevDy = 0;

    const first = this.points[0];
    const last = this.points[this.points.length - 1];

    // Net straight-line displacement
    const netDisplacement = Math.sqrt(
      Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2)
    );

    for (let i = 1; i < this.points.length; i++) {
      const p1 = this.points[i - 1];
      const p2 = this.points[i];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      totalPathLength += dist;

      if (i > 1) {
        // Micro direction changes on X and Y axis
        if ((dx > 1.2 && prevDx < -1.2) || (dx < -1.2 && prevDx > 1.2)) {
          directionReversals++;
        }
        if ((dy > 1.2 && prevDy < -1.2) || (dy < -1.2 && prevDy > 1.2)) {
          directionReversals++;
        }
      }

      prevDx = dx;
      prevDy = dy;
    }

    // Minimum baseline displacement to avoid division by zero when stationary
    const effectiveDisplacement = Math.max(12, netDisplacement);
    
    // Jitter ratio: total path length / net displacement
    // Straight smooth motion: 1.0 - 1.6
    // Shaky tremor motion: 3.0 - 8.0+
    const jitterRatio = totalPathLength > 0 ? (totalPathLength / effectiveDisplacement) : 1.0;

    // Weighting calculation
    // Path excess contribution (up to 55 points)
    const ratioPenalty = Math.min(55, Math.max(0, (jitterRatio - 1.2) * 16));

    // Direction reversal density contribution (up to 45 points)
    const reversalPenalty = Math.min(45, (directionReversals / (this.points.length || 1)) * 140);

    const rawScore = ratioPenalty + reversalPenalty;
    const tremorLikelihood = Math.min(100, Math.max(5, Math.round(rawScore)));

    const isTremorDetected = tremorLikelihood >= this.threshold;

    let classification = 'Smooth / Natural Human Motion';
    if (tremorLikelihood >= 80) {
      classification = 'Severe Tremor / High-Frequency Oscillation';
    } else if (tremorLikelihood >= 60) {
      classification = 'Parkinsonian / Tremor Pattern Detected';
    } else if (tremorLikelihood >= 35) {
      classification = 'Mild Hand Sway / Hesitation';
    }

    return {
      tremorLikelihood,
      jitterRatio: Number(jitterRatio.toFixed(2)),
      directionReversals,
      netDisplacement: Math.round(netDisplacement),
      totalPathLength: Math.round(totalPathLength),
      isTremorDetected,
      classification,
      sampleCount: this.points.length
    };
  }

  reset() {
    this.points = [];
  }
}
