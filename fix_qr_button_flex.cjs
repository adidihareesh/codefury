const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  '<div className="shrink-0 mb-1">',
  '<div className="shrink-0 mb-1 flex items-center">'
);

fs.writeFileSync(filePath, content, 'utf8');
