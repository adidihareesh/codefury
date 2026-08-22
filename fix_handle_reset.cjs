const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /setTransferSuccess\(false\);/;
const replacement = `setTransferSuccess(false);\n    setShowConfirmation(false);\n    setShowPinPad(false);`;

// Wait, I should also add it to handleAuthSubmit to reset when logging out/in
content = content.replace(new RegExp(regex, 'g'), replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched reset logic");
