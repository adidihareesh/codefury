const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find where SaathiChatAssistant is rendered
content = content.replace(
  "<SaathiChatAssistant \n              onTransferCompleted={(details) => {",
  "<SaathiChatAssistant \n              expectedPin={accounts.find(a => a.username === currentUser)?.upiPin || '1234'}\n              onTransferCompleted={(details) => {"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated TrustLayer props successfully");
