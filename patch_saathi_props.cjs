const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/onResetSession\n\}\) \{/g, 'onResetSession,\n  expectedPin = "1234"\n}) {');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched Saathi props");
