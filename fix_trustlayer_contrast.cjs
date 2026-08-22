const fs = require('fs');
const path = require('path');

const trustLayerPath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let tlContent = fs.readFileSync(trustLayerPath, 'utf8');

// Replace text-accent with text-blue-400 inside the dark banner elements
tlContent = tlContent.replace(/<span className="text-accent capitalize">/g, '<span className="text-blue-400 capitalize">');
tlContent = tlContent.replace(/bg-slate-950 text-accent border-slate-800/g, 'bg-slate-950 text-blue-400 border-slate-800');
tlContent = tlContent.replace(/<Activity className="w-3.5 h-3.5 text-accent" \/>/g, '<Activity className="w-3.5 h-3.5 text-blue-400" />');
tlContent = tlContent.replace(/<Timer className="w-4 h-4 text-accent" \/>/g, '<Timer className="w-4 h-4 text-blue-400" />');
tlContent = tlContent.replace(/<strong className="text-accent font-bold font-mono">/g, '<strong className="text-blue-400 font-bold font-mono">');

// Live Inspector actions
tlContent = tlContent.replace(/text-accent border border-accent/g, 'text-blue-400 border border-blue-400');
tlContent = tlContent.replace(/<FastForward className="w-4 h-4 text-accent" \/>/g, '<FastForward className="w-4 h-4 text-blue-400" />');

fs.writeFileSync(trustLayerPath, tlContent, 'utf8');
console.log("Fixed TrustLayer contrasts");
