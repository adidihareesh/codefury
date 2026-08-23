const fs = require('fs');
const path = require('path');

// 1. Fix SaathiChatAssistant "Start Over" button
const saathiPath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let saathiContent = fs.readFileSync(saathiPath, 'utf8');

saathiContent = saathiContent.replace(
  'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-textInverse border border-slate-700',
  'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
);

fs.writeFileSync(saathiPath, saathiContent, 'utf8');
console.log("Fixed Saathi Start Over button");

// 2. Fix Live Inspector text colors in TrustLayer
const trustPath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let trustContent = fs.readFileSync(trustPath, 'utf8');

// Replace light metric text classes with darker versions
trustContent = trustContent.replace(
  "'text-teal-300' : 'text-slate-400'",
  "'text-teal-600' : 'text-slate-700'"
);
trustContent = trustContent.replace(
  "'text-amber-400' : 'text-emerald-400'",
  "'text-amber-600' : 'text-emerald-600'"
);
trustContent = trustContent.replace(
  'text-slate-300">Ratio:',
  'text-slate-700">Ratio:'
);

fs.writeFileSync(trustPath, trustContent, 'utf8');
console.log("Fixed TrustLayer Live Inspector text");
