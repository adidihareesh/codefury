const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\s*\{\/\* Signature Counter Badge \*\/\}\n\s*<div className=\{`inline-flex items-center gap-2 px-3 py-1 rounded-xl border transition-all duration-300 \$\{\n\s*counterPulse \? 'scale-110 bg-accent text-textInverse border-white' : 'bg-slate-950 text-blue-400 border-slate-800'\n\s*\}\`\}>\n\s*<Activity className="w-3\.5 h-3\.5 text-blue-400" \/>\n\s*<span>\{t\('signaturesLogged'\)\}: <strong className="text-white text-sm">\{tremorSignaturesCount\}<\/strong><\/span>\n\s*<\/div>/;

content = content.replace(regex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Removed signature counter badge");
