const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, 'src/context/AccessibilityContext.jsx');
let contextContent = fs.readFileSync(contextPath, 'utf8');

const newTranslations = `
    // Additions for Transfer Form
    proceedToPay: {
      en: 'Proceed to Pay',
      hi: 'भुगतान करने के लिए आगे बढ़ें',
      kn: 'ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ',
      ta: 'பணம் செலுத்த தொடரவும்'
    },
    paying: {
      en: 'Paying',
      hi: 'भुगतान कर रहे हैं',
      kn: 'ಪಾವತಿಸುತ್ತಿರುವ',
      ta: 'செலுத்துகிறார்'
    },
    cancel: {
      en: 'Cancel',
      hi: 'रद्द करें',
      kn: 'ರದ್ದುಮಾಡಿ',
      ta: 'ரத்து செய்'
    },
    confirm: {
      en: 'Confirm',
      hi: 'पुष्टि करें',
      kn: 'ಖಚಿತಪಡಿಸಿ',
      ta: 'உறுதிப்படுத்து'
    },
    enterPin: {
      en: 'Enter 4-Digit UPI PIN',
      hi: '4-अंकीय UPI पिन दर्ज करें',
      kn: '4-ಅಂಕಿಯ UPI ಪಿನ್ ನಮೂದಿಸಿ',
      ta: '4 இலக்க UPI PIN ஐ உள்ளிடவும்'
    },
    spokenConfirmPrompt: {
      en: 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.',
      hi: 'RECIPIENT को AMOUNT का भुगतान करने के लिए आगे बढ़ें। कृपया पुष्टि करें या रद्द करें।',
      kn: 'RECIPIENT ಗೆ AMOUNT ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ. ದಯವಿಟ್ಟು ಖಚಿತಪಡಿಸಿ ಅಥವಾ ರದ್ದುಮಾಡಿ.',
      ta: 'RECIPIENT க்கு AMOUNT செலுத்த தொடரவும். தயவுசெய்து உறுதிப்படுத்தவும் அல்லது ரத்து செய்யவும்.'
    },
`;

contextContent = contextContent.replace(/authErrorInvalid: \{[\s\S]*?\},/, (match) => match + newTranslations);
fs.writeFileSync(contextPath, contextContent, 'utf8');
console.log("Patched AccessibilityContext.jsx");

const tlPath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let tlContent = fs.readFileSync(tlPath, 'utf8');

tlContent = tlContent.replace(/<span>Proceed to Pay<\/span>/g, "<span>{t('proceedToPay')}</span>");
tlContent = tlContent.replace(/<h3 className="text-xl text-slate-500 font-medium">Paying<\/h3>/g, '<h3 className="text-xl text-slate-500 font-medium">{t(\'paying\')}</h3>');
tlContent = tlContent.replace(/>\n\s*Cancel\n\s*<\/button>/g, ">\n        {t('cancel')}\n      </button>");
tlContent = tlContent.replace(/>\n\s*Confirm\n\s*<\/DwellButton>/g, ">\n        {t('confirm')}\n      </DwellButton>");
tlContent = tlContent.replace(/<h2 className="text-lg font-bold text-slate-700 mb-2">Enter 4-Digit UPI PIN<\/h2>/g, '<h2 className="text-lg font-bold text-slate-700 mb-2">{t(\'enterPin\')}</h2>');

// Inject the speak effect. We need `speakText` from `useAccessibility`.
// TrustLayer already has: const { t, isHighContrast... } = useAccessibility();
// We will replace it to include speakText.
tlContent = tlContent.replace(/colorBlindness, setColorBlindness/, "colorBlindness, setColorBlindness,\n    speakText");

// Inject the useEffect right before the return statement of TrustLayer
const effectStr = `
  useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);
`;

tlContent = tlContent.replace(/return \(\n\s*<div className="max-w-6xl mx-auto px-4 py-4 font-sans">/, effectStr + "\n  return (\n    <div className=\"max-w-6xl mx-auto px-4 py-4 font-sans\">");

fs.writeFileSync(tlPath, tlContent, 'utf8');
console.log("Patched TrustLayer.jsx translations and voice");
