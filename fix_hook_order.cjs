const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Extract the useEffect from the bottom
const effectRegex = /useEffect\(\(\) => \{\n\s*if \(showConfirmation && !showPinPad && !transferSuccess\) \{\n\s*const msgTemplate = t\('spokenConfirmPrompt'\) \|\| 'Proceed to pay AMOUNT to RECIPIENT\. Please confirm or cancel\.';\n\s*const msg = msgTemplate\.replace\('AMOUNT', amount\)\.replace\('RECIPIENT', recipient\);\n\s*speakText\(msg\);\n\s*\}\n\s*\}, \[showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText\]\);/g;

content = content.replace(effectRegex, '');

// 2. Inject it at the top, right before `if (!isAuthenticated)`
const injectionTarget = "if (!isAuthenticated) {";
const effectToInject = `useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);
  
  `;

content = content.replace(injectionTarget, effectToInject + injectionTarget);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed React Hook Order");
