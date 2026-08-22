const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the incorrectly injected useEffect
const badEffectRegex = /useEffect\(\(\) => \{\n\s*if \(showConfirmation && !showPinPad && !transferSuccess\) \{\n\s*const msgTemplate = t\('spokenConfirmPrompt'\) \|\| 'Proceed to pay AMOUNT to RECIPIENT\. Please confirm or cancel\.';\n\s*const msg = msgTemplate\.replace\('AMOUNT', amount\)\.replace\('RECIPIENT', recipient\);\n\s*speakText\(msg\);\n\s*\}\n\s*\}, \[showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText\]\);\n\s*/;

content = content.replace(badEffectRegex, '');

// 2. Inject it safely at the top, right after `const { t, language, setLanguage... } = useAccessibility();`
const injectionTarget = "const { t, language, setLanguage, isHighContrast, setIsHighContrast, isSimplifyText, setIsSimplifyText, colorBlindness, setColorBlindness,\n    speakText } = useAccessibility();";

const effectToInject = `const { t, language, setLanguage, isHighContrast, setIsHighContrast, isSimplifyText, setIsSimplifyText, colorBlindness, setColorBlindness, speakText } = useAccessibility();

  useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);
`;

content = content.replace(injectionTarget, effectToInject);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed React Hook Order Properly");
