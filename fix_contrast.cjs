const fs = require('fs');
const path = require('path');

// Fix DwellButton
const dwellButtonPath = path.join(__dirname, 'src/components/DwellButton.jsx');
let dwellContent = fs.readFileSync(dwellButtonPath, 'utf8');
dwellContent = dwellContent.replace(/text-accent border border-accent\/30/g, 'text-white border-white/30');
fs.writeFileSync(dwellButtonPath, dwellContent, 'utf8');

// Fix TrustLayer Live Inspector text-accent on dark background
const trustLayerPath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let tlContent = fs.readFileSync(trustLayerPath, 'utf8');
// Tremor Likelihood 8% color
tlContent = tlContent.replace(/'text-warning' : 'text-accent'/g, "'text-warning' : 'text-blue-400'");
// isGracefulTimeout color
tlContent = tlContent.replace(/\? 'text-accent'/g, "? 'text-blue-400'");
fs.writeFileSync(trustLayerPath, tlContent, 'utf8');

console.log("Fixed contrasts");
