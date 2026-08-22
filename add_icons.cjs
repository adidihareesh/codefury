const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. HUD Recaptcha
content = content.replace(
  "reCAPTCHA: {recaptchaScore.toFixed(2)}",
  "{recaptchaScore >= 0.50 ? '✅ SAFE: ' : '🚫 FLAGGED: '} reCAPTCHA {recaptchaScore.toFixed(2)}"
);

// 2. HUD Tremor Likelihood
content = content.replace(
  "{liveJitterMetrics.tremorLikelihood}% Jitter",
  "{liveJitterMetrics.tremorLikelihood >= 60 ? '⚠️ HIGH: ' : '✨ CALM: '}{liveJitterMetrics.tremorLikelihood}% Jitter"
);

// 3. Metric 3 (Tremor Likelihood)
content = content.replace(
  "{liveJitterMetrics.tremorLikelihood}%",
  "{liveJitterMetrics.tremorLikelihood >= 60 ? '⚠️ ' : '✅ '}{liveJitterMetrics.tremorLikelihood}%"
);

// 4. Metric 4 (Security Status)
content = content.replace(
  `                  isGracefulTimeout 
                    ? 'text-accent' 
                    : isLocked 
                    ? 'text-danger' 
                    : 'text-success'
                }\`}>
                  {isGracefulTimeout ? 'Session Ended' : isLocked ? 'Access Revoked' : 'Active Channel'}`,
  `                  isGracefulTimeout 
                    ? 'text-warning' 
                    : isLocked 
                    ? 'text-danger' 
                    : 'text-success'
                }\`}>
                  {isGracefulTimeout ? '⏳ SESSION ENDED' : isLocked ? '🚫 ACCESS REVOKED' : '✅ ACTIVE CHANNEL'}`
);

// 5. Hard Cap Status (in the Trust Token Card)
content = content.replace(
  "Valid & Signed",
  "✅ Valid & Signed"
);

content = content.replace(
  "{sessionTimeElapsed}s / 5:00",
  "⏳ {sessionTimeElapsed}s / 5:00"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated status icons in TrustLayer");
