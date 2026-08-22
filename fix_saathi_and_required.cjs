const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Saathi AI Chat button text color
content = content.replace(/: 'text-slate-500 hover:text-white'/g, ": 'text-white hover:text-slate-200'");
content = content.replace(/<FileText className="w-3\.5 h-3\.5" \/>/g, '<FileText className="w-4 h-4" />');
content = content.replace(/<Bot className="w-3\.5 h-3\.5 text-accent" \/>/g, '<Bot className="w-4 h-4" />');

// 2. Make create account fields mandatory
content = content.replace(
  /className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n\s*placeholder="e\.g\. Rahul Sharma" \n\s*\/>/g,
  'className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n                    placeholder="e.g. Rahul Sharma" \n                    required\n                  />'
);

content = content.replace(
  /className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n\s*placeholder="DD\/MM\/YYYY" \n\s*\/>/g,
  'className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n                    placeholder="DD/MM/YYYY" \n                    required\n                  />'
);

// We need to match the ID Number / Phone field properly
content = content.replace(
  /<label className="block text-xs font-bold text-slate-700 mb-1">ID Number \/ Phone<\/label>\n\s*<input \n\s*type="text" \n\s*value=\{authFormPhone\}\n\s*onChange=\{\(e\) => setAuthFormPhone\(e\.target\.value\)\}\n\s*className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n\s*placeholder="Aadhaar or Mobile" \n\s*\/>/g,
  '<label className="block text-xs font-bold text-slate-700 mb-1">ID Number / Phone</label>\n                  <input \n                    type="text" \n                    value={authFormPhone}\n                    onChange={(e) => setAuthFormPhone(e.target.value)}\n                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n                    placeholder="Aadhaar or Mobile" \n                    required\n                  />'
);

// And we must add `required` to the password (UPI PIN setup) field
content = content.replace(
  /<label className="block text-xs font-bold text-slate-700 mb-1">Create 4-Digit UPI PIN<\/label>\n\s*<input \n\s*type="password" \n\s*maxLength=\{4\}\n\s*value=\{authFormPin\}\n\s*onChange=\{\(e\) => setAuthFormPin\(e\.target\.value\)\}\n\s*className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all tracking-widest font-mono" \n\s*placeholder="••••" \n\s*\/>/g,
  '<label className="block text-xs font-bold text-slate-700 mb-1">Create 4-Digit UPI PIN</label>\n                  <input \n                    type="password" \n                    maxLength={4}\n                    value={authFormPin}\n                    onChange={(e) => setAuthFormPin(e.target.value)}\n                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all tracking-widest font-mono" \n                    placeholder="••••" \n                    required\n                  />'
);

// And the username field if we want
content = content.replace(
  /<label className="block text-xs font-bold text-slate-700 mb-1">UPI Handle \(Username\)<\/label>\n\s*<input \n\s*type="text" \n\s*value=\{authFormUsername\}\n\s*onChange=\{\(e\) => setAuthFormUsername\(e\.target\.value\.toLowerCase\(\)\)\}\n\s*className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n\s*placeholder="e\.g\. rahul@trust" \n\s*\/>/g,
  '<label className="block text-xs font-bold text-slate-700 mb-1">UPI Handle (Username)</label>\n                  <input \n                    type="text" \n                    value={authFormUsername}\n                    onChange={(e) => setAuthFormUsername(e.target.value.toLowerCase())}\n                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" \n                    placeholder="e.g. rahul@trust" \n                    required\n                  />'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched TrustLayer");
