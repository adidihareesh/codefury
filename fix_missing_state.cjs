const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const \[transferSuccess, setTransferSuccess\] = useState\(false\);/;
const replacement = `const [transferSuccess, setTransferSuccess] = useState(false);\n  const [showConfirmation, setShowConfirmation] = useState(false);\n  const [showPinPad, setShowPinPad] = useState(false);`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched missing state variables");
