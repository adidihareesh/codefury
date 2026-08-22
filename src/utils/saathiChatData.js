/**
 * Saathi Conversational Dialog & UI Dictionary
 * Supports English (en), Hindi (hi), Kannada (kn), and Tamil (ta).
 */

export const saathiDialogs = {
  // Step 1: Ask Recipient
  askRecipient: {
    en: "Hi, I'm Saathi 🙂 Let's send some money safely. Who are you sending it to?",
    hi: "नमस्ते, मैं साथी हूँ 🙂 चलिए सुरक्षित रूप से पैसे भेजते हैं। आप किसे पैसे भेजना चाहते हैं?",
    kn: "ನಮಸ್ಕಾರ, ನಾನು ಸಾಥಿ 🙂 ಹಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಕಳುಹಿಸೋಣ. ನೀವು ಯಾರಿಗೆ ಹಣ ಕಳುಹಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    ta: "வணக்கம், நான் சாதி 🙂 பாதுகாப்பாக பணம் அனுப்புவோம். நீங்கள் யாருக்கு பணம் அனுப்ப விரும்புகிறீர்கள்?"
  },

  // Step 2: Confirm Recipient & Ask Amount
  askAmount: {
    en: (name) => ({
      en: `Got it — sending to ${name}. How much would you like to send?`,
      hi: `समझ गया — ${name} को पैसे भेजने हैं। आप कितनी राशि भेजना चाहते हैं?`,
      kn: `ಅರ್ಥವಾಯಿತು — ${name} ಅವರಿಗೆ ಕಳುಹಿಸಲಾಗುವುದು. ನೀವು ಎಷ್ಟು ಹಣ ಕಳುಹಿಸಲು ಬಯಸುತ್ತೀರಿ?`,
      ta: `புரிந்தது — ${name} அவர்களுக்கு அனுப்ப வேண்டும். எவ்வளவு தொகை அனுப்ப விரும்புகிறீர்கள்?`
    })
  },

  // Step 3: Confirm Amount & Ask OTP
  askOtp: {
    en: (amt, name) => ({
      en: `₹${amt} to ${name}, got it. Now I'll send a 6-digit OTP to your mobile phone — type it or speak it when you get it. (Simulated code: 839201)`,
      hi: `${name} को ₹${amt}, नोट कर लिया। अब आपके फ़ोन पर 6 अंकों का OTP भेजा गया है — कृपया दर्ज करें या बोलें। (कोड: 839201)`,
      kn: `${name} ಅವರಿಗೆ ₹${amt}, ಸರಿ. ಈಗ ನಿಮ್ಮ ಫೋನ್‌ಗೆ 6 ಅಂಕಿಯ OTP ಕಳುಹಿಸಲಾಗಿದೆ — ದಯವಿಟ್ಟು ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ. (ಕೋಡ್: 839201)`,
      ta: `${name} அவர்களுக்கு ₹${amt}, பதிவானது. இப்போது உங்கள் போனுக்கு 6 இலக்க OTP அனுப்பப்பட்டுள்ளது — உள்ளிடவும் அல்லது பேசவும். (குறியீடு: 839201)`
    })
  },

  // Step 4: OTP Verified & Ask Final Summary Confirmation
  confirmTransfer: {
    en: "Perfect! OTP verified. Here is your transfer summary. Review and hold the button to authorize:",
    hi: "उत्कृष्ट! OTP सत्यापित हो गया है। कृपया विवरण की समीक्षा करें और स्वीकृत करने के लिए बटन दबाएं:",
    kn: "ಉತ್ತಮ! OTP ದೃಢೀಕರಿಸಲಾಗಿದೆ. ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅಧಿಕೃತಗೊಳಿಸಲು ಬಟನ್ ಒತ್ತಿಹಿಡಿಯಿರಿ:",
    ta: "அற்புதம்! OTP சரிபார்க்கப்பட்டது. விவரங்களை சரிபார்த்து உறுதிப்படுத்த பொத்தானை அழுத்தவும்:"
  },

  // Step 5: Transfer Success
  successReceipt: {
    en: (amt, name) => ({
      en: `🎉 Transfer complete! ₹${amt} has been securely authorized and sent to ${name}. Reference: TXN-892104`,
      hi: `🎉 हस्तांतरण पूरा हुआ! ₹${amt} सफलतापूर्वक ${name} को भेज दिए गए हैं। संदर्भ: TXN-892104`,
      kn: `🎉 ವರ್ಗಾವಣೆ ಯಶಸ್ವಿಯಾಗಿದೆ! ₹${amt} ಹಣವನ್ನು ${name} ಅವರಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ. ರೆಫರೆನ್ಸ್: TXN-892104`,
      ta: `🎉 பரிமாற்றம் முடிந்தது! ₹${amt} பாதுகாப்பாக ${name} அவர்களுக்கு அனுப்பப்பட்டது. குறிப்பு: TXN-892104`
    })
  },

  // Adaptive Tone Reassurance Lines when Tremor / Struggle is detected
  tremorReassurance: {
    en: "Take your time, there's no rush at all 🙂 You can also tap the mic to speak if typing is tricky.",
    hi: "आराम से समय लें, कोई जल्दी नहीं है 🙂 यदि टाइप करना कठिन हो तो आप बोलकर भी दर्ज कर सकते हैं।",
    kn: "ನಿಧಾನವಾಗಿ ಮಾಡಿ, ಯಾವುದೇ ಆತುರವಿಲ್ಲ 🙂 ಟೈಪ್ ಮಾಡಲು ಕಷ್ಟವಾದರೆ ಮೈಕ್ ಬಳಸಿ ಮಾತನಾಡಬಹುದು.",
    ta: "பொறுமையாக செய்யுங்கள், அவசரமில்லை 🙂 தட்டச்சு செய்ய சிரமமாக இருந்தால் மைக் மூலம் பேசலாம்."
  },

  // Trust Layer Verified Notice in Chat
  trustTokenNotice: {
    en: "🛡️ Accessibility Trust Verified: Your motor tremor pattern is authenticated against your signed Ed25519 token. Zero bot flags!",
    hi: "🛡️ एक्सेसिबिलिटी ट्रस्ट सत्यापित: आपके हाथ का कंपन सत्यापित है। कोई बॉट रुकावट नहीं!",
    kn: "🛡️ ಪ್ರವೇಶಸಾಧ್ಯತೆ ದೃಢೀಕರಿಸಲಾಗಿದೆ: ನಿಮ್ಮ ಕೈ ನಡುಕವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ. ಯಾವುದೇ ಬಾಟ್ ಅಡೆತಡೆ ಇಲ್ಲ!",
    ta: "🛡️ அணுகல்தன்மை சரிபார்க்கப்பட்டது: உங்கள் நடுக்கம் அங்கீகரிக்கப்பட்டது. கணக்கு முடக்கப்படாது!"
  },

  // Fraud alert in chat when without trust layer
  fraudAlertNotice: {
    en: "⚠️ Security alert: Erratic interaction pattern flagged by anti-bot filter (reCAPTCHA score < 0.50).",
    hi: "⚠️ सुरक्षा चेतावनी: एंटी-बॉट फ़िल्टर द्वारा अनियमित गतिविधि पाई गई (reCAPTCHA स्कोर < 0.50)।",
    kn: "⚠️ ಭದ್ರತಾ ಎಚ್ಚರಿಕೆ: ಬಾಟ್ ಫಿಲ್ಟರ್‌ನಿಂದ ಅಸ್ಥಿರ ಚಟುವಟಿಕೆ ಗುರುತಿಸಲಾಗಿದೆ (reCAPTCHA ಸ್ಕೋರ್ < 0.50).",
    ta: "⚠️ பாதுகாப்பு எச்சரிக்கை: பாட் எதிர்ப்பு வடிகட்டி மூலம் அசாதாரண முறை கண்டறியப்பட்டது (reCAPTCHA < 0.50)."
  },

  // Clarification / Fallback
  unknownInputHelp: {
    en: "I'm Saathi, your banking helper 🙂 Please reply to the question above, or tap one of the quick suggestions below!",
    hi: "मैं साथी हूँ, आपकी सहायता के लिए 🙂 कृपया ऊपर पूछे गए प्रश्न का उत्तर दें या नीचे दिए गए सुझावों में से चुनें!",
    kn: "ನಾನು ಸಾಥಿ, ನಿಮ್ಮ ಬ್ಯಾಂಕಿಂಗ್ ಸಹಾಯಕ 🙂 ದಯವಿಟ್ಟು ಮೇಲಿನ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ ಅಥವಾ ಕೆಳಗಿನ ಆಯ್ಕೆಗಳನ್ನು ಬಳಸಿ!",
    ta: "நான் சாதி, உங்கள் வங்கி உதவியாளர் 🙂 மேலே உள்ள கேள்விக்கு பதிலளிக்கவும் அல்லது கீழே உள்ள விருப்பங்களை தேர்வு செய்யவும்!"
  },

  // UI Strings
  uiAssistantBadge: {
    en: "Banking Assistant",
    hi: "बैंकिंग सहायक",
    kn: "ಬ್ಯಾಂಕಿಂಗ್ ಸಹಾಯಕ",
    ta: "வங்கி உதவியாளர்"
  },
  uiStartOver: {
    en: "Start Over",
    hi: "फिर से शुरू करें",
    kn: "ಮತ್ತೆ ಆರಂಭಿಸಿ",
    ta: "மீண்டும் தொடங்கவும்"
  },
  uiTrustActive: {
    en: "Accessibility Trust Shield Active",
    hi: "एक्सेसिबिलिटी ट्रस्ट सुरक्षा सक्रिय",
    kn: "ಪ್ರವೇಶಸಾಧ್ಯತೆ ವಿಶ್ವಾಸ ರಕ್ಷಣೆ ಸಕ್ರಿಯವಾಗಿದೆ",
    ta: "அணுகல்தன்மை நம்பிக்கை பாதுகாப்பு செயலில் உள்ளது"
  },
  uiTrustDisabled: {
    en: "Standard Security Mode",
    hi: "मानक सुरक्षा मोड",
    kn: "ಸಾಮಾನ್ಯ ಭದ್ರತಾ ಮೋಡ್",
    ta: "வழக்கமான பாதுகாப்பு பயன்முறை"
  },
  uiSuggestions: {
    en: "Suggestions:",
    hi: "सुझाव:",
    kn: "ಸೂಚನೆಗಳು:",
    ta: "பரிந்துரைகள்:"
  },
  uiUseOtpChip: {
    en: "🔑 Use OTP: 839201",
    hi: "🔑 OTP उपयोग करें: 839201",
    kn: "🔑 OTP ಬಳಸಿ: 839201",
    ta: "🔑 OTP பயன்படுத்தவும்: 839201"
  },
  uiAuthCardTitle: {
    en: "Transfer Authorization Card",
    hi: "हस्तांतरण प्राधिकरण कार्ड",
    kn: "ವರ್ಗಾವಣೆ ಅಧಿಕೃತ ಕಾರ್ಡ್",
    ta: "பரிமாற்ற அங்கீகார அட்டை"
  },
  uiOtpVerifiedBadge: {
    en: "OTP Verified ✅",
    hi: "OTP सत्यापित ✅",
    kn: "OTP ದೃಢೀಕರಿಸಲಾಗಿದೆ ✅",
    ta: "OTP சரிபார்க்கப்பட்டது ✅"
  },
  uiRecipientLabel: {
    en: "Recipient:",
    hi: "प्राप्तकर्ता:",
    kn: "ಸ್ವೀಕರಿಸುವವರು:",
    ta: "பெறுநர்:"
  },
  uiTotalAmountLabel: {
    en: "Total Amount:",
    hi: "कुल राशि:",
    kn: "ಒಟ್ಟು ಮೊತ್ತ:",
    ta: "மொத்த தொகை:"
  },
  uiDwellNotice: {
    en: "Hold button for 500ms to authorize with dwell protection.",
    hi: "स्वीकृत करने के लिए 500ms बटन दबाए रखें।",
    kn: "ಡ್ಯುಯೆಲ್ ರಕ್ಷಣೆಯೊಂದಿಗೆ ಅಧಿಕೃತಗೊಳಿಸಲು 500ms ಬಟನ್ ಒತ್ತಿಹಿಡಿಯಿರಿ.",
    ta: "அங்கீகரிக்க 500ms பொத்தானை அழுத்திப் பிடிக்கவும்."
  },
  uiEditAmountBtn: {
    en: "Edit Amount",
    hi: "राशि बदलें",
    kn: "ಮೊತ್ತ ತಿದ್ದುಪಡಿ",
    ta: "தொகையை திருத்து"
  },
  uiConfirmSendBtn: {
    en: "Confirm & Send",
    hi: "पुष्टि करें और भेजें",
    kn: "ದೃಢೀಕರಿಸಿ ಕಳುಹಿಸಿ",
    ta: "உறுதிசெய்து அனுப்பவும்"
  },
  uiTransferSuccessTitle: {
    en: "Transfer Successful",
    hi: "हस्तांतरण सफल",
    kn: "ವರ್ಗಾವಣೆ ಯಶಸ್ವಿಯಾಗಿದೆ",
    ta: "பரிமாற்றம் வெற்றிகரமாக முடிந்தது"
  },
  uiTransferSecuredSubtitle: {
    en: "Secured via Accessibility Trust Token",
    hi: "एक्सेसिबिलिटी ट्रस्ट टोकन द्वारा सुरक्षित",
    kn: "ಪ್ರವೇಶಸಾಧ್ಯತೆ ಟ್ರಸ್ಟ್ ಟೋಕನ್ ಮೂಲಕ ಸುರಕ್ಷಿತ",
    ta: "அணுகல்தன்மை டோக்கன் மூலம் பாதுகாக்கப்பட்டது"
  },
  uiSendAnotherBtn: {
    en: "Send Another Payment with Saathi",
    hi: "साथी के साथ दूसरा भुगतान भेजें",
    kn: "ಸಾಥಿ ಮೂಲಕ ಮತ್ತೊಂದು ಪಾವತಿ ಕಳುಹಿಸಿ",
    ta: "சாதி மூலம் மற்றொரு பரிவர்த்தனை"
  },
  placeholderRecipient: {
    en: "Type or speak recipient name...",
    hi: "प्राप्तकर्ता का नाम लिखें या बोलें...",
    kn: "ಸ್ವೀಕರಿಸುವವರ ಹೆಸರನ್ನು ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ...",
    ta: "பெறுநரின் பெயரை உள்ளிடவும் அல்லது பேசவும்..."
  },
  placeholderAmount: {
    en: "Enter amount in Rupees (e.g. 350)...",
    hi: "रुपये में राशि लिखें (उदा. 350)...",
    kn: "ರೂಪಾಯಿಗಳಲ್ಲಿ ಮೊತ್ತ ನಮೂದಿಸಿ (ಉದಾ. 350)...",
    ta: "தொகையை ரூபாயில் உள்ளிடவும் (எ.கா. 350)..."
  },
  placeholderOtp: {
    en: "Type or speak 6-digit OTP (e.g. 839201)...",
    hi: "6 अंकों का OTP लिखें या बोलें (उदा. 839201)...",
    kn: "6 ಅಂಕಿಯ OTP ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ (ಉದಾ. 839201)...",
    ta: "6 இலக்க OTP-ஐ உள்ளிடவும் அல்லது பேசவும் (எ.கா. 839201)..."
  },
  placeholderReady: {
    en: "Transfer is ready to authorize above...",
    hi: "हस्तांतरण ऊपर स्वीकृत करने के लिए तैयार है...",
    kn: "ವರ್ಗಾವಣೆ ಅಧಿಕೃತಗೊಳಿಸಲು ಸಿದ್ಧವಾಗಿದೆ...",
    ta: "பரிமாற்றம் மேலே உறுதிப்படுத்த தயாராக உள்ளது..."
  }
};
