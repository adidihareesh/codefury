const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add hasSpokenConfirmationRef
const stateRegex = /const \[showPinPad, setShowPinPad\] = useState\(false\);/;
content = content.replace(stateRegex, "const [showPinPad, setShowPinPad] = useState(false);\n  const hasSpokenConfirmationRef = useRef(false);");

// Update the useEffect
const oldEffect = `useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);`;

const newEffect = `useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      if (!hasSpokenConfirmationRef.current) {
        const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
        const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
        speakText(msg);
        hasSpokenConfirmationRef.current = true;
      }
    } else {
      hasSpokenConfirmationRef.current = false;
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);`;

content = content.replace(oldEffect, newEffect);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched TrustLayer to stop double voiceover");
