const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update SaathiChatAssistant to accept expectedPin prop
content = content.replace(
  "export default function SaathiChatAssistant({ onTransferCompleted, onTriggerLockout }) {",
  "export default function SaathiChatAssistant({ onTransferCompleted, onTriggerLockout, expectedPin = '1234' }) {"
);

content = content.replace(
  "const actualOtp = '8392';",
  "const actualOtp = expectedPin;"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated SaathiChatAssistant successfully");
