const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /{step === 'OTP' && \(\s*<button[^>]*>\s*<span>{getDialog\('uiUseOtpChip'\)}<\/span>\s*<\/button>\s*\)}/;
content = content.replace(regex, "");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Removed UI chip from Saathi");
