const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const messyRegex = /useEffect\(\(\) => \{\n\s*useEffect\(\(\) => \{\n\s*if \(showConfirmation && !showPinPad && !transferSuccess\) \{\n\s*const msgTemplate = t\('spokenConfirmPrompt'\) \|\| 'Proceed to pay AMOUNT to RECIPIENT\. Please confirm or cancel\.';\n\s*const msg = msgTemplate\.replace\('AMOUNT', amount\)\.replace\('RECIPIENT', recipient\);\n\s*speakText\(msg\);\n\s*\}\n\s*\}, \[showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText\]\);\n\s*if \(!isAuthenticated\) \{/g;

const cleanReplacement = `useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);

  useEffect(() => {
    if (!isAuthenticated) {`;

content = content.replace(messyRegex, cleanReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed the nested useEffect mess!");
