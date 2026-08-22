const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Top Signature Counter Badge
const badgeRegex = /\{\/\* Signature Counter Badge \*\/\}\n\s*<div className=\{`inline-flex items-center gap-2 px-3 py-1 rounded-xl border transition-all duration-300 \$\{\n\s*counterPulse \? 'scale-110 bg-teal-500 text-slate-950 border-white' : 'bg-slate-950 text-teal-300 border-slate-800'\n\s*\}\`\}>\n\s*<Activity className="w-3\.5 h-3\.5 text-teal-400" \/>\n\s*<span>\{t\('signaturesLogged'\)\}: <strong className="text-white text-sm">\{tremorSignaturesCount\}<\/strong><\/span>\n\s*<\/div>/;
content = content.replace(badgeRegex, '');

// 2. Remove yield earned part
const yieldRegex = /<div className="flex items-center gap-2 text-xs font-medium text-teal-300 bg-teal-900\/40 border border-teal-500\/30 rounded-xl px-3 py-2 w-fit mb-6">\n\s*<TrendingUp className="w-3\.5 h-3\.5" \/>\n\s*<span>\{t\('yieldEarned'\)\}<\/span>\n\s*<\/div>/;
content = content.replace(yieldRegex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Removed features successfully");
