const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/utils/saathiChatData.js');
let content = fs.readFileSync(filePath, 'utf8');

const askOtpOld = `  askOtp: {
    en: (amt, name) => ({
      en: \`₹\${amt} to \${name}, got it. Now I'll send a 4-digit UPI PIN to your mobile phone — type it or speak it when you get it. (Simulated code: 8392)\`,
      hi: \`\${name} को ₹\${amt}, नोट कर लिया। अब आपके फ़ोन पर 4 अंकों का UPI PIN भेजा गया है — कृपया दर्ज करें या बोलें। (कोड: 8392)\`,
      kn: \`\${name} ಅವರಿಗೆ ₹\${amt}, ಸರಿ. ಈಗ ನಿಮ್ಮ ಫೋನ್‌ಗೆ 6 ಅಂಕಿಯ OTP ಕಳುಹಿಸಲಾಗಿದೆ — ದಯವಿಟ್ಟು ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ. (ಕೋಡ್: 8392)\`,
      ta: \`\${name} அவர்களுக்கு ₹\${amt}, பதிவானது. இப்போது உங்கள் போனுக்கு 4 இலக்க UPI PIN அனுப்பப்பட்டுள்ளது — உள்ளிடவும் அல்லது பேசவும். (குறியீடு: 8392)\`
    })
  },`;

const askOtpNew = `  askOtp: {
    en: (amt, name) => ({
      en: \`Please enter or speak your 4-digit secret UPI PIN to authorize this transfer.\`,
      hi: \`इस हस्तांतरण को स्वीकृत करने के लिए कृपया अपना 4 अंकों का गुप्त UPI PIN दर्ज करें या बोलें।\`,
      kn: \`ಈ ವರ್ಗಾವಣೆಯನ್ನು ಅಧಿಕೃತಗೊಳಿಸಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ 4 ಅಂಕಿಯ ಗೌಪ್ಯ UPI PIN ಅನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಮಾತನಾಡಿ.\`,
      ta: \`இந்தப் பரிமாற்றத்தை அங்கீகரிக்க உங்கள் 4 இலக்க ரகசிய UPI PIN-ஐ உள்ளிடவும் அல்லது பேசவும்.\`
    })
  },`;

content = content.replace(askOtpOld, askOtpNew);

// Remove uiUseOtpChip completely
const uiUseOtpChipOld = `  uiUseOtpChip: {
    en: "🔑 Use PIN: 8392",
    hi: "🔑 PIN उपयोग करें: 8392",
    kn: "🔑 PIN ಬಳಸಿ: 8392",
    ta: "🔑 PIN பயன்படுத்தவும்: 8392"
  },`;
content = content.replace(uiUseOtpChipOld, "");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Saathi text successfully");
