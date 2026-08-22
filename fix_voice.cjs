const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const \[showPinPad, setShowPinPad\] = useState\(false\);/;
const replacement = `const [showPinPad, setShowPinPad] = useState(false);

  // Trigger voice confirmation
  useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Injected voiceover useEffect successfully.");
