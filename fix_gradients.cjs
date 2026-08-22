const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/from-amber-500 to-red-500/g, 'from-warning to-danger');
content = content.replace(/from-teal-400 to-amber-400/g, 'from-success to-warning');
content = content.replace(/from-teal-500 to-emerald-400/g, 'from-accent to-success');

content = content.replace(/bg-teal-950\/90/g, 'bg-bgInverse');
content = content.replace(/bg-emerald-950\/90/g, 'bg-bgInverse');
content = content.replace(/bg-red-950\/50/g, 'bg-dangerBg');
content = content.replace(/bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950/g, 'bg-bgInverse');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed TrustLayer gradients");
