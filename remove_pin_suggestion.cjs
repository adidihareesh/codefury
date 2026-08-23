const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\{\s*step === 'OTP' && \([\s\S]*?<\/button>\s*\)\s*\}/;

content = content.replace(regex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Removed PIN suggestion chip");
