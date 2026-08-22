const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/DummyBank.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace emerald-950 with textPrimary
content = content.replace(/text-emerald-[0-9]{3}/g, 'text-textPrimary');

// Add icons to recaptcha status
content = content.replace(
  "{recaptchaScore.toFixed(2)} / 1.0",
  "{recaptchaScore >= 0.50 ? '✅ SAFE: ' : '🚫 SUSPICIOUS: '} {recaptchaScore.toFixed(2)} / 1.0"
);

content = content.replace(
  "{recaptchaScore >= 0.50 ? 'Valid Human' : 'Bot Detected'}",
  "{recaptchaScore >= 0.50 ? '✅ Valid Human' : '🚫 Bot Detected'}"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated DummyBank");
