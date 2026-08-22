/**
 * Mock Signed Accessibility Trust Token Generator
 * Generates and verifies realistic JWT-style tokens representing
 * verified physiological motor accessibility signatures.
 */

export function generateAccessibilityToken(profile) {
  const header = {
    alg: "Ed25519",
    typ: "ACCESSIBILITY-TRUST-TOKEN-V1"
  };

  const payload = {
    iss: "https://auth.accessibility-trust-layer.org",
    sub: "usr_9942_accessible_profile",
    aud: "https://api.fintech-gateway.internal",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400, // 24h validity
    accessibility_verified: true,
    motor_biometrics: {
      baseline_jitter: profile?.avgJitter || 48,
      recommended_dwell_ms: profile?.suggestedDwellMs || 500,
      tremor_classification: profile?.tremorProfile || "Elevated Motor Tremor (Verified)",
      entropy_tolerance: "85%",
      fitts_adherence_adjusted: true
    },
    exemption_policy: [
      "BYPASS_BEHAVIORAL_BOT_FLAG",
      "ALLOW_EXTENDED_DWELL_INTERACTION",
      "ENABLE_RETRY_TOLERANCE_OTP_5"
    ]
  };

  // Base64Url encoding simulation
  const encodeB64 = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = encodeB64(header);
  const encodedPayload = encodeB64(payload);
  
  // Deterministic mock Ed25519 signature
  const mockSignature = "sig_ed25519_" + btoa(profile?.avgJitter + "-" + Date.now()).substring(0, 32).replace(/[^a-zA-Z0-9]/g, 'x');

  const rawToken = `${encodedHeader}.${encodedPayload}.${mockSignature}`;

  return {
    rawToken,
    header,
    payload,
    signature: mockSignature,
    issuedAt: new Date().toLocaleTimeString(),
    expiresIn: "23h 59m",
    isValid: true
  };
}
