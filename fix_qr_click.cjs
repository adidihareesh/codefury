const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /onClick=\{\(\) => setIsQrScannerOpen\(true\)\}/g,
  'onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsQrScannerOpen(true); }}'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed QR button click propagation");
