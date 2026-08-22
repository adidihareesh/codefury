const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /import \{ \n  ShieldCheck,/;
const replacement = `import { \n  ShieldCheck, \n  Shield,`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Added Shield to lucide-react imports");
