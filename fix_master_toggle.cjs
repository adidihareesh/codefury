const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/MasterToggle.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace dark colors with bgInverse
content = content.replace(/bg-gradient-to-r from-teal-950\/90 via-slate-900 to-teal-950\/90/g, 'bg-bgInverse');
content = content.replace(/bg-gradient-to-r from-red-950\/90 via-slate-900 to-red-950\/90/g, 'bg-bgInverse');

// text-white -> text-textInverse
content = content.replace(/text-white/g, 'text-textInverse');

// Icons missing in toggle?
// It has: ShieldCheck and ShieldAlert.
// And text ON/OFF.
content = content.replace(">ON<", ">✅ ON<");
content = content.replace(">OFF<", ">🚫 OFF<");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed MasterToggle");
