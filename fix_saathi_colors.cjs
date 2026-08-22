const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950/g, 'bg-bgInverse');
content = content.replace(/from-teal-400 to-emerald-400/g, 'from-accent to-success');
content = content.replace(/bg-teal-950\/60/g, 'bg-accentBg');
content = content.replace(/text-amber-950/g, 'text-textPrimary');
content = content.replace(/bg-emerald-950\/90/g, 'bg-bgInverse');
content = content.replace(/text-white/g, 'text-textInverse');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed SaathiChatAssistant colors");
