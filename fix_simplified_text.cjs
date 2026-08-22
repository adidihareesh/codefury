const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/utils/simplifiedText.js');
let content = fs.readFileSync(filePath, 'utf8');

const newTranslations = `
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

// Inject into the UI_TRANSLATIONS dictionary inside simplifiedText.js
content = content.replace(/authErrorInvalid: \{[\s\S]*?\},/, (match) => match + '\n' + newTranslations);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched simplifiedText.js");
