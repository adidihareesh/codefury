/**
 * Complete Universal Multi-Language String Lookup Dictionary
 * Supports English (en), Hindi (hi), Kannada (kn), and Tamil (ta) across the ENTIRE app.
 * Composable with isSimplifyText toggle.
 */

export const textStrings = {
  // Login Gate
  loginHeading: {
    en: "Secure Account Login",
    en_simple: "Sign In to Your Account",
    hi: "सुरक्षित खाता लॉगिन",
    hi_simple: "अपने खाते में साइन इन करें",
    kn: "ಸುರಕ್ಷಿತ ಖಾತೆ ಲಾಗಿನ್",
    kn_simple: "ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    ta: "பாதுகாப்பான கணக்கு உள்நுழைவு",
    ta_simple: "உங்கள் கணக்கில் உள்நுழையவும்"
  },
  loginSubtitle: {
    en: "Please verify your identity to access the Trust Layer.",
    en_simple: "Enter your details to bank safely.",
    hi: "ट्रस्ट लेयर तक पहुंचने के लिए कृपया अपनी पहचान सत्यापित करें।",
    hi_simple: "सुरक्षित रूप से बैंक करने के लिए अपना विवरण दर्ज करें।",
    kn: "ಟ್ರಸ್ಟ್ ಲೇಯರ್ ಪ್ರವೇಶಿಸಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಗುರುತನ್ನು ಪರಿಶೀಲಿಸಿ.",
    kn_simple: "ಸುರಕ್ಷಿತವಾಗಿ ಬ್ಯಾಂಕ್ ಮಾಡಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
    ta: "நம்பிக்கை அடுக்கை அணுக உங்கள் அடையாளத்தை சரிபார்க்கவும்.",
    ta_simple: "பாதுகாப்பாக வங்கி சேவையை பெற உங்கள் விவரங்களை உள்ளிடவும்."
  },
  usernameLabel: {
    en: "Username / Account ID",
    en_simple: "Your Username",
    hi: "उपयोगकर्ता नाम / खाता आईडी",
    hi_simple: "आपका उपयोगकर्ता नाम",
    kn: "ಬಳಕೆದಾರ ಹೆಸರು / ಖಾತೆ ಐಡಿ",
    kn_simple: "ನಿಮ್ಮ ಬಳಕೆದಾರ ಹೆಸರು",
    ta: "பயனர்பெயர் / கணக்கு ஐடி",
    ta_simple: "உங்கள் பயனர்பெயர்"
  },
  passwordLabel: {
    en: "Secure Password",
    en_simple: "Your Password",
    hi: "सुरक्षित पासवर्ड",
    hi_simple: "आपका पासवर्ड",
    kn: "ಸುರಕ್ಷಿತ ಪಾಸ್‌ವರ್ಡ್",
    kn_simple: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್",
    ta: "பாதுகாப்பான கடவுச்சொல்",
    ta_simple: "உங்கள் கடவுச்சொல்"
  },
  loginButton: {
    en: "Sign In & Authenticate",
    en_simple: "Sign In",
    hi: "साइन इन और प्रमाणित करें",
    hi_simple: "साइन इन करें",
    kn: "ಸೈನ್ ಇನ್ ಮತ್ತು ದೃಢೀಕರಿಸಿ",
    kn_simple: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    ta: "உள்நுழைந்து அங்கீகரிக்கவும்",
    ta_simple: "உள்நுழையவும்"
  },
  // Sign Up & Auth Errors
  signupHeading: {
    en: "Create New Account",
    hi: "नया खाता बनाएँ",
    kn: "ಹೊಸ ಖಾತೆ ರಚಿಸಿ",
    ta: "புதிய கணக்கை உருவாக்கவும்"
  },
  signupSubtitle: {
    en: "Register to access the secure Trust Layer.",
    hi: "सुरक्षित ट्रस्ट लेयर तक पहुंचने के लिए पंजीकरण करें।",
    kn: "ಸುರಕ್ಷಿತ ಟ್ರಸ್ಟ್ ಲೇಯರ್ ಪ್ರವೇಶಿಸಲು ನೋಂದಾಯಿಸಿ.",
    ta: "பாதுகாப்பான நம்பிக்கை அடுக்கை அணுக பதிவு செய்யவும்."
  },
  signupButton: {
    en: "Create Account",
    hi: "खाता बनाएँ",
    kn: "ಖಾತೆ ರಚಿಸಿ",
    ta: "கணக்கை உருவாக்கவும்"
  },
  authErrorExists: {
    en: "Username already exists. Please choose another or log in.",
    hi: "उपयोगकर्ता नाम पहले से मौजूद है। कृपया कोई अन्य चुनें या लॉग इन करें।",
    kn: "ಬಳಕೆದಾರ ಹೆಸರು ಈಗಾಗಲೇ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ. ದಯವಿಟ್ಟು ಬೇರೊಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಲಾಗಿನ್ ಮಾಡಿ.",
    ta: "பயனர்பெயர் ஏற்கனவே உள்ளது. வேறு ஒன்றைத் தேர்ந்தெடுக்கவும் அல்லது உள்நுழையவும்."
  },
  authErrorInvalid: {
    en: "Invalid username or password.",
    hi: "अमान्य उपयोगकर्ता नाम या पासवर्ड।",
    kn: "ಅಮಾನ್ಯ ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್.",
    ta: "தவறான பயனர்பெயர் அல்லது கடவுச்சொல்."
  },
  noAccountPrompt: {
    en: "Don't have an account?",
    hi: "खाता नहीं है?",
    kn: "ಖಾತೆ ಇಲ್ಲವೇ?",
    ta: "கணக்கு இல்லையா?"
  },
  signupLink: {
    en: "Create one",
    hi: "एक बनाएँ",
    kn: "ಒಂದನ್ನು ರಚಿಸಿ",
    ta: "ஒன்றை உருவாக்கவும்"
  },
  hasAccountPrompt: {
    en: "Already have an account?",
    hi: "क्या आपके पास पहले से खाता है?",
    kn: "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?",
    ta: "ஏற்கனவே கணக்கு உள்ளதா?"
  },
  loginLink: {
    en: "Sign In",
    hi: "साइन इन करें",
    kn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    ta: "உள்நுழையவும்"
  },

  // Navigation & Header
  brandTitle: {
    en: "Accessibility Trust Layer",
    en_simple: "Safe & Accessible Banking",
    hi: "एक्सेसिबिलिटी ट्रस्ट लेयर",
    hi_simple: "सुरक्षित और सुलभ बैंकिंग",
    kn: "ಪ್ರವೇಶಸಾಧ್ಯತೆ ವಿಶ್ವಾಸ ಪದರ",
    kn_simple: "ಸುರಕ್ಷಿತ ಮತ್ತು ಸುಲಭ ಬ್ಯಾಂಕಿಂಗ್",
    ta: "அணுகல்தன்மை நம்பிக்கை அடுக்கு",
    ta_simple: "பாதுகாப்பான மற்றும் எளிதான வங்கி"
  },
  brandSubtitle: {
    en: "Solving the disability-flagged-as-fraud paradox",
    en_simple: "Helping tremor-affected users bank safely without lockouts",
    hi: "दिव्यांगता को धोखाधड़ी समझे जाने की समस्या का समाधान",
    hi_simple: "हाथ के कंपन वाले उपयोगकर्ताओं को बिना रुकावट बैंकिंग में मदद",
    kn: "ವಿಕಲಚೇತನತೆಯನ್ನು ವಂಚನೆ ಎಂದು ತಪ್ಪಾಗಿ ಗ್ರಹಿಸುವ ಸಮಸ್ಯೆಗೆ ಪರಿಹಾರ",
    kn_simple: "ಕೈ ನಡುಕವಿರುವವರು ಲಾಕ್ ಆಗದೆ ಸುರಕ್ಷಿತವಾಗಿ ಬ್ಯಾಂಕ್ ಮಾಡಲು ಸಹಾಯ",
    ta: "மாற்றுத்திறனாளிகளை மோசடி செய்பவர்கள் என தவறாக கருதும் பிரச்சனைக்கு தீர்வு",
    ta_simple: "நடுக்கம் உள்ளவர்கள் தடங்கலின்றி வங்கி சேவைகளை பெற உதவி"
  },
  navOverview: {
    en: "Overview",
    hi: "अवलोकन",
    kn: "ಅವಲೋಕನ",
    ta: "கண்ணோட்டம்"
  },
  navVictimSite: {
    en: "Victim Site (/dummy-bank)",
    hi: "असुरक्षित बैंक (/dummy-bank)",
    kn: "ಬಲಿಪಶು ಸೈಟ್ (/dummy-bank)",
    ta: "பாதிக்கப்பட்ட தளம் (/dummy-bank)"
  },
  navTrustLayer: {
    en: "Trust Layer (/trust-layer)",
    hi: "ट्रस्ट लेयर (/trust-layer)",
    kn: "ಟ್ರಸ್ಟ್ ಲೇಯರ್ (/trust-layer)",
    ta: "நம்பிக்கை அடுக்கு (/trust-layer)"
  },
  navReadyBadge: {
    en: "v1.0 Ready",
    hi: "v1.0 तैयार",
    kn: "v1.0 ಸಿದ್ಧವಾಗಿದೆ",
    ta: "v1.0 தயார்"
  },

  // Master Toggle
  toggleWithoutTitle: {
    en: "Without Trust Layer (OFF)",
    en_simple: "Standard Security (No Protection)",
    hi: "ट्रस्ट लेयर के बिना (बंद)",
    hi_simple: "सामान्य सुरक्षा (कोई सुरक्षा नहीं)",
    kn: "ಟ್ರಸ್ಟ್ ಲೇಯರ್ ಇಲ್ಲದೆ (ಆಫ್)",
    kn_simple: "ಸಾಮಾನ್ಯ ಭದ್ರತೆ (ಯಾವುದೇ ರಕ್ಷಣೆ ಇಲ್ಲ)",
    ta: "நம்பிக்கை அடுக்கு இல்லாமல் (ஆஃப்)",
    ta_simple: "வழக்கமான பாதுகாப்பு (பாதுகாப்பற்றது)"
  },
  toggleWithoutDesc: {
    en: "Standard AI anti-bot defense treats hand tremors as bot attacks and locks user accounts.",
    en_simple: "Standard systems mistakenly lock you out if your mouse shakes.",
    hi: "मानक एआई एंटी-बॉट सुरक्षा हाथ के कंपन को बॉट हमला मानकर खाता लॉक कर देती है।",
    hi_simple: "कर्सर हिलने पर सामान्य सिस्टम आपका खाता तुरंत लॉक कर देते हैं।",
    kn: "ಸಾಮಾನ್ಯ AI ವ್ಯವಸ್ಥೆಯು ಕೈ ನಡುಕವನ್ನು ಬಾಟ್ ದಾಳಿ ಎಂದು ಭಾವಿಸಿ ಖಾತೆಯನ್ನು ಲಾಕ್ ಮಾಡುತ್ತದೆ.",
    kn_simple: "ಕರ್ಸರ್ ನಡುಗಿದರೆ ಸಾಮಾನ್ಯ ವ್ಯವಸ್ಥೆಯು ನಿಮ್ಮನ್ನು ಹೊರಹಾಕುತ್ತದೆ.",
    ta: "வழக்கமான AI அமைப்புகள் கை நடுக்கத்தை பாட் தாக்குதல் எனக் கருதி கணக்கை முடக்கும்.",
    ta_simple: "மவுஸ் அசைந்தால் உங்கள் கணக்கு உடனடியாக முடக்கப்படும்."
  },
  toggleWithTitle: {
    en: "With Trust Layer (ON)",
    en_simple: "Accessibility Shield (Active)",
    hi: "ट्रस्ट लेयर के साथ (चालू)",
    hi_simple: "सुलभता सुरक्षा (सक्रिय)",
    kn: "ಟ್ರಸ್ಟ್ ಲೇಯರ್ ಜೊತೆಗೆ (ಆನ್)",
    kn_simple: "ಪ್ರವೇಶಸಾಧ್ಯತೆ ರಕ್ಷಣೆ (ಸಕ್ರಿಯ)",
    ta: "நம்பிக்கை அடுக்குடன் (ஆன்)",
    ta_simple: "அணுகல்தன்மை பாதுகாப்பு (செயலில்)"
  },
  toggleWithDesc: {
    en: "Signed Ed25519 token verifies motor profile, overrides false bot alerts, and adapts UI.",
    en_simple: "Cryptographic token recognizes your tremor and keeps you safe.",
    hi: "हस्ताक्षरित Ed25519 टोकन कंपन प्रोफ़ाइल की पुष्टि करता है और बॉट अलर्ट को हटाता है।",
    hi_simple: "टोकन आपके हाथ के कंपन को पहचानता है और आपको सुरक्षित रखता है।",
    kn: "ಸಹಿ ಮಾಡಲಾದ Ed25519 ಟೋಕನ್ ನಿಮ್ಮ ನಡುಕದ ಪ್ರೊಫೈಲ್ ದೃಢೀಕರಿಸಿ ಬಾಟ್ ಎಚ್ಚರಿಕೆಯನ್ನು ತಡೆಯುತ್ತದೆ.",
    kn_simple: "ಟೋಕನ್ ನಿಮ್ಮ ನಡುಕವನ್ನು ಗುರುತಿಸಿ ನಿಮ್ಮನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡುತ್ತದೆ.",
    ta: "கையொப்பமிட்ட Ed25519 டோக்கன் நடுக்கத்தை உறுதிசெய்து தவறான பாட் எச்சரிக்கைகளை நீக்குகிறது.",
    ta_simple: "டோக்கன் உங்கள் நடுக்கத்தை உணர்ந்து உங்களை பாதுகாப்பாக வைத்திருக்கிறது."
  },

  // HUD & Telemetry Bar
  hudMotorBaseline: {
    en: "Motor Baseline",
    hi: "मोटर बेसलाइन",
    kn: "ಮೋಟಾರ್ ಬೇಸ್‌ಲೈನ್",
    ta: "இயக்க அடிப்படை"
  },
  hudRecaptcha: {
    en: "reCAPTCHA v3",
    hi: "reCAPTCHA v3",
    kn: "reCAPTCHA v3",
    ta: "reCAPTCHA v3"
  },
  hudTrustToken: {
    en: "Trust Token",
    hi: "ट्रस्ट टोकन",
    kn: "ಟ್ರಸ್ಟ್ ಟೋಕನ್",
    ta: "நம்பிக்கை டோக்கன்"
  },
  hudAdaptiveUI: {
    en: "Adaptive UI",
    hi: "अनुकूलन इंटरफ़ेस",
    kn: "ಹೊಂದಾಣಿಕೆಯ UI",
    ta: "தகவமைப்பு UI"
  },
  hudVoiceDictate: {
    en: "Voice Dictate",
    hi: "आवाज़ से लिखें",
    kn: "ಧ್ವನಿ ಬರಹ",
    ta: "குரல் தட்டச்சு"
  },
  hudTremorLikelihood: {
    en: "Tremor Likelihood",
    hi: "कंपन संभावना",
    kn: "ನಡುಕದ ಸಂಭವನೀಯತೆ",
    ta: "நடுக்கத்தின் நிகழ்தகவு"
  },
  hudActiveDwell: {
    en: "Active (Dwell 500ms)",
    hi: "सक्रिय (500ms होल्ड)",
    kn: "ಸಕ್ರಿಯ (500ms ಹಿಡಿದುಕೊಳ್ಳಿ)",
    ta: "செயலில் (500ms அழுத்திப் பிடிக்கவும்)"
  },
  hudReady3Fields: {
    en: "Ready (3 Fields)",
    hi: "तैयार (3 फ़ील्ड)",
    kn: "ಸಿದ್ಧ (3 ಕ್ಷೇತ್ರಗಳು)",
    ta: "தயார் (3 புலங்கள்)"
  },
  hudSmoothNormal: {
    en: "Smooth / Natural Human Motion",
    hi: "सहज / प्राकृतिक मानवीय गति",
    kn: "ಸುಗಮ / ನೈಸರ್ಗಿಕ ಮಾನವ ಚಲನೆ",
    ta: "சீரான / இயல்பான மனித இயக்கம்"
  },
  hudTremorDetected: {
    en: "Parkinsonian / Tremor Pattern Detected",
    hi: "कंपन पैटर्न की पहचान हुई",
    kn: "ನಡುಕದ ಮಾದರಿ ಕಂಡುಬಂದಿದೆ",
    ta: "நடுக்க முறை கண்டறியப்பட்டது"
  },

  // Account Balance Card (Left Column)
  totalAvailableBalance: {
    en: "Total Available Balance",
    en_simple: "Your Account Balance",
    hi: "कुल उपलब्ध शेष राशि",
    hi_simple: "आपके खाते में कुल पैसे",
    kn: "ಒಟ್ಟು ಲಭ್ಯವಿರುವ ಬಾಕಿ",
    kn_simple: "ನಿಮ್ಮ ಖಾತೆಯಲ್ಲಿರುವ ಒಟ್ಟು ಹಣ",
    ta: "மொத்த இருப்புத் தொகை",
    ta_simple: "உங்கள் கணக்கில் உள்ள பணம்"
  },
  yieldEarned: {
    en: "+2.4% yield earned this cycle",
    hi: "+2.4% ब्याज अर्जित किया गया",
    kn: "+2.4% ಬಡ್ಡಿ ಗಳಿಸಲಾಗಿದೆ",
    ta: "+2.4% வட்டி பெறப்பட்டது"
  },
  signaturesLogged: {
    en: "Tremor Signatures Logged",
    hi: "दर्ज की गई कंपन घटनाएं",
    kn: "ದಾಖಲಾದ ನಡುಕದ ಘಟನೆಗಳು",
    ta: "பதிவு செய்யப்பட்ட நடுக்க நிகழ்வுகள்"
  },
  hardCapStatus: {
    en: "5:00 Hard Cap Status",
    hi: "5:00 अधिकतम समय स्थिति",
    kn: "5:00 ಗರಿಷ್ಠ ಸಮಯ ಸ್ಥಿತಿ",
    ta: "5:00 அதிகபட்ச நேர நிலை"
  },
  quickRecipientFill: {
    en: "Quick Recipient Fill",
    en_simple: "Choose a Contact",
    hi: "त्वरित प्राप्तकर्ता चुनें",
    hi_simple: "संपर्क चुनें",
    kn: "ತ್ವರಿತ ಸ್ವೀಕರಿಸುವವರ ಆಯ್ಕೆ",
    kn_simple: "ಸಂಪರ್ಕ ಆಯ್ಕೆಮಾಡಿ",
    ta: "விரைவு பெறுநர் தேர்வு",
    ta_simple: "தொடர்பை தேர்ந்தெடுக்கவும்"
  },

  // Form Field Labels & Placeholders
  recipientLabel: {
    en: "Pay to (UPI ID or Contact)",
    en_simple: "Who are you sending money to?",
    hi: "प्राप्तकर्ता का कानूनी नाम",
    hi_simple: "आप किसे पैसे भेजना चाहते हैं?",
    kn: "ಸ್ವೀಕರಿಸುವವರ ಕಾನೂನುಬದ್ಧ ಹೆಸರು",
    kn_simple: "ನೀವು ಯಾರಿಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಿದ್ದೀರಿ?",
    ta: "பெறுநரின் சட்டப்பூர்வ பெயர்",
    ta_simple: "நீங்கள் யாருக்கு பணம் அனுப்புகிறீர்கள்?"
  },
  recipientPlaceholder: {
    en: "e.g. Dr. Alan Miller or Sarah Jenkins",
    en_simple: "Type the person's name here",
    hi: "उदा. डॉ. रमेश शर्मा या सरिता",
    hi_simple: "यहाँ व्यक्ति का नाम लिखें",
    kn: "ಉದಾ. ಡಾ. ರಾಜೇಶ್ ಗೌಡ ಅಥವಾ ಸುಮಾ",
    kn_simple: "ಇಲ್ಲಿ ವ್ಯಕ್ತಿಯ ಹೆಸರನ್ನು ಬರೆಯಿರಿ",
    ta: "எ.கா. டாக்டர் கார்த்திக் அல்லது பிரியா",
    ta_simple: "இங்கு நபரின் பெயரை தட்டச்சு செய்யவும்"
  },
  amountLabel: {
    en: "Transfer Amount (₹ INR)",
    en_simple: "How much money do you want to send?",
    hi: "हस्तांतरण राशि (₹ INR)",
    hi_simple: "आप कितने रुपये भेजना चाहते हैं?",
    kn: "ವರ್ಗಾವಣೆ ಮೊತ್ತ (₹ INR)",
    kn_simple: "ನೀವು ಎಷ್ಟು ಹಣ ಕಳುಹಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    ta: "பரிமாற்ற தொகை (₹ INR)",
    ta_simple: "நீங்கள் எவ்வளவு பணம் அனுப்ப விரும்புகிறீர்கள்?"
  },
  amountPlaceholder: {
    en: "0.00",
    en_simple: "Enter amount (e.g. 50)",
    hi: "0.00",
    hi_simple: "राशि लिखें (उदा. 50)",
    kn: "0.00",
    kn_simple: "ಮೊತ್ತ ನಮೂದಿಸಿ (ಉದಾ. 50)",
    ta: "0.00",
    ta_simple: "தொகையை உள்ளிடவும் (எ.கா. 50)"
  },
  otpLabel: {
    en: "4-Digit UPI PIN",
    en_simple: "Enter your 4-digit secret PIN",
    hi: "6-अंकों का SMS सुरक्षा कोड (OTP)",
    hi_simple: "अपने फ़ोन पर आया 6 अंकों का कोड दर्ज करें",
    kn: "6-ಅಂಕಿಯ SMS ಭದ್ರತಾ ಕೋಡ್ (OTP)",
    kn_simple: "ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಬಂದ 6 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ",
    ta: "6-இலக்க SMS பாதுகாப்பு குறியீடு (OTP)",
    ta_simple: "உங்கள் தொலைபேசிக்கு வந்த 6 இலக்க எண்ணை உள்ளிடவும்"
  },
  otpPlaceholder: {
    en: "Enter 6-digit OTP",
    en_simple: "Type the 6 numbers",
    hi: "6-अंकों का OTP दर्ज करें",
    hi_simple: "6 अंक यहाँ लिखें",
    kn: "6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ",
    kn_simple: "6 ಸಂಖ್ಯೆಗಳನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ",
    ta: "6-இலக்க OTP உள்ளிடவும்",
    ta_simple: "6 எண்களை இங்கு தட்டச்சு செய்யவும்"
  },
  smsSimulatedNotice: {
    en: "Simulated SMS verification code sent to registered mobile:",
    en_simple: "Your 6-digit security number is:",
    hi: "पंजीकृत मोबाइल पर भेजा गया सिम्युलेटेड SMS कोड:",
    hi_simple: "आपका 6 अंकों का सुरक्षा नंबर है:",
    kn: "ನೋಂದಾಯಿತ ಮೊಬೈಲ್‌ಗೆ ಕಳುಹಿಸಲಾದ SMS ಕೋಡ್:",
    kn_simple: "ನಿಮ್ಮ 6 ಅಂಕಿಯ ಭದ್ರತಾ ಸಂಖ್ಯೆ:",
    ta: "பதிவுசெய்த மொபைலுக்கு அனுப்பப்பட்ட SMS குறியீடு:",
    ta_simple: "உங்கள் 6 இலக்க பாதுகாப்பு எண்:"
  },

  // Form Headers and Actions
  formHeading: {
    en: "Send Money & Direct Wire Transfer",
    en_simple: "Transfer Money",
    hi: "पैसे भेजें और सीधा वायर ट्रांसफर",
    hi_simple: "पैसे भेजें",
    kn: "ಹಣ ಕಳುಹಿಸಿ ಮತ್ತು ನೇರ ವೈರ್ ವರ್ಗಾವಣೆ",
    kn_simple: "ಹಣ ವರ್ಗಾಯಿಸಿ",
    ta: "பணம் அனுப்புதல் மற்றும் நேரடி பரிமாற்றம்",
    ta_simple: "பணம் அனுப்பவும்"
  },
  formSubtitleProtected: {
    en: "🛡️ Real-time tremor tracking + automatic session extension active.",
    hi: "🛡️ वास्तविक समय कंपन ट्रैकिंग + स्वचालित सत्र विस्तार सक्रिय।",
    kn: "🛡️ ನೈಜ-ಸಮಯದ ನಡುಕ ಟ್ರ್ಯಾಕಿಂಗ್ + ಸ್ವಯಂಚಾಲಿತ ಸೆಷನ್ ವಿಸ್ತರಣೆ ಸಕ್ರಿಯವಾಗಿದೆ.",
    ta: "🛡️ நேரடி நடுக்கக் கண்காணிப்பு + தானியங்கி நேர நீட்டிப்பு செயலில் உள்ளது."
  },
  formSubtitleUnprotected: {
    en: "⚠️ Standard unaccommodated 60s timer active.",
    hi: "⚠️ मानक असुविधाजनक 60s टाइमर सक्रिय।",
    kn: "⚠️ ಸಾಮಾನ್ಯ 60s ಟೈಮರ್ ಸಕ್ರಿಯವಾಗಿದೆ.",
    ta: "⚠️ வழக்கமான 60 வினாடி டைமர் செயலில் உள்ளது."
  },
  submitTransfer: {
    en: "Authorize Transfer",
    en_simple: "Send Money Now",
    hi: "हस्तांतरण अधिकृत करें",
    hi_simple: "अभी पैसे भेजें",
    kn: "ವರ್ಗಾವಣೆ ಅಧಿಕೃತಗೊಳಿಸಿ",
    kn_simple: "ಈಗಲೇ ಹಣ ಕಳುಹಿಸಿ",
    ta: "பரிமாற்றத்தை அங்கீகரிக்கவும்",
    ta_simple: "இப்போதே பணம் அனுப்பவும்"
  },
  clearForm: {
    en: "Clear Form",
    en_simple: "Start Over",
    hi: "फ़ॉर्म साफ़ करें",
    hi_simple: "फिर से शुरू करें",
    kn: "ಫಾರ್ಮ್ ತೆರವುಗೊಳಿಸಿ",
    kn_simple: "ಮತ್ತೆ ಮೊದಲಿನಿಂದ ಆರಂಭಿಸಿ",
    ta: "படிவத்தை அழிக்கவும்",
    ta_simple: "மீண்டும் தொடங்கவும்"
  },
  voiceAssist: {
    en: "Voice Assist",
    en_simple: "Speak by Voice",
    hi: "आवाज़ सहायता",
    hi_simple: "बोलकर दर्ज करें",
    kn: "ಧ್ವನಿ ಸಹಾಯ",
    kn_simple: "ಮಾತನಾಡಿ ಬರೆಯಿರಿ",
    ta: "குரல் உதவி",
    ta_simple: "பேசி உள்ளிடவும்"
  },
  dwellClickNotice: {
    en: "Hold for 500ms to authorize",
    hi: "स्वीकृत करने के लिए 500ms दबाए रखें",
    kn: "ಅಧಿಕೃತಗೊಳಿಸಲು 500ms ಹಿಡಿದುಕೊಳ್ಳಿ",
    ta: "அங்கீகரிக்க 500ms அழுத்திப் பிடிக்கவும்"
  },

  // Token Card Details
  tokenCardTitle: {
    en: "Cryptographic Accessibility Trust Token (Ed25519)",
    hi: "क्रिप्टोग्राफिक एक्सेसिबिलिटी ट्रस्ट टोकन (Ed25519)",
    kn: "ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಪ್ರವೇಶಸಾಧ್ಯತೆ ಟ್ರಸ್ಟ್ ಟೋಕನ್ (Ed25519)",
    ta: "கிரிப்டோகிராஃபிக் அணுகல்தன்மை நம்பிக்கை டோக்கன் (Ed25519)"
  },
  tokenStatusActive: {
    en: "Valid & Signed",
    hi: "वैध और हस्ताक्षरित",
    kn: "ಮಾನ್ಯ ಮತ್ತು ಸಹಿ ಮಾಡಲಾಗಿದೆ",
    ta: "செல்லுபடியாகும் & கையொப்பமிட்டது"
  },
  tokenExemptNotice: {
    en: "Exempt from behavioral bot filters. Verified motor tremor envelope.",
    hi: "व्यवहार बॉट फ़िल्टर से छूट प्राप्त। सत्यापित मोटर कंपन।",
    kn: "ಬಾಟ್ ಫಿಲ್ಟರ್‌ಗಳಿಂದ ವಿನಾಯಿತಿ ನೀಡಲಾಗಿದೆ. ಪರಿಶೀಲಿಸಿದ ನಡುಕ.",
    ta: "பாட் வடிப்பான்களிலிருந்து விலக்கு அளிக்கப்பட்டது. சரிபார்க்கப்பட்ட நடுக்கம்."
  },

  // Fraud Lockout Modal
  fraudLockHeading: {
    en: "SUSPICIOUS ACTIVITY DETECTED: ACCOUNT RESTRICTED",
    en_simple: "Account Paused for Your Safety",
    hi: "संदिग्ध गतिविधि पाई गई: खाता प्रतिबंधित",
    hi_simple: "आपकी सुरक्षा के लिए खाता रोका गया है",
    kn: "ಅನುಮಾನಾಸ್ಪದ ಚಟುವಟಿಕೆ ಕಂಡುಬಂದಿದೆ: ಖಾತೆ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ",
    kn_simple: "ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ ಖಾತೆಯನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ನಿಲ್ಲಿಸಲಾಗಿದೆ",
    ta: "சந்தேகத்திற்கிடமான செயல்பாடு: கணக்கு முடக்கப்பட்டது",
    ta_simple: "உங்கள் பாதுகாப்பிற்காக கணக்கு தற்காலிகமாக நிறுத்தப்பட்டது"
  },
  fraudLockMessage: {
    en: "Behavioral risk scoring engine classified irregular cursor path, multiple retries, or extended interaction duration as an automated bot attack.",
    en_simple: "The system saw shaky cursor movements or typos and paused your account because it wasn't sure if it was you or a computer script.",
    hi: "सुरक्षा प्रणाली ने कर्सर के झटके या गलतियों को बॉट हमला समझकर खाता रोक दिया है।",
    hi_simple: "सिस्टम को लगा कि यह कोई कंप्यूटर प्रोग्राम है, इसलिए आपकी सुरक्षा के लिए खाता रोक दिया गया।",
    kn: "ಅಸ್ಥಿರ ಕರ್ಸರ್ ಚಲನೆ ಅಥವಾ ತಪ್ಪುಗಳನ್ನು ಭದ್ರತಾ ವ್ಯವಸ್ಥೆಯು ಬಾಟ್ ದಾಳಿ ಎಂದು ತಪ್ಪಾಗಿ ಭಾವಿಸಿದೆ.",
    kn_simple: "ಕಂಪ್ಯೂಟರ್ ತಪ್ಪು ತಿಳುವಳಿಕೆಯಿಂದ ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಲು ನಿಲ್ಲಿಸಿದೆ.",
    ta: "நடுக்கமான கர்சர் இயக்கம் அல்லது தவறுகளை தானியங்கி ஸ்கிரிப்ட் என தவறாக கருதி கணக்கு முடக்கப்பட்டுள்ளது.",
    ta_simple: "பாதுகாப்பு காரணங்களுக்காக உங்கள் கணக்கு தற்காலிகமாக இடைநிறுத்தப்பட்டுள்ளது."
  },
  fraudLockResolution: {
    en: "ACTION REQUIRED: VISIT PHYSICAL BRANCH WITH 2 IDS",
    en_simple: "What to do: Visit your local bank branch with your ID",
    hi: "आवश्यक कार्रवाई: 2 पहचान पत्रों के साथ बैंक शाखा में जाएं",
    hi_simple: "क्या करें: अपनी पहचान पत्र लेकर नज़दीकी बैंक शाखा जाएं",
    kn: "ಕ್ರಮ ಅಗತ್ಯವಿದೆ: 2 ಗುರುತಿನ ಚೀಟಿಗಳೊಂದಿಗೆ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ",
    kn_simple: "ಏನು ಮಾಡಬೇಕು: ನಿಮ್ಮ ಗುರುತಿನ ಚೀಟಿಯೊಂದಿಗೆ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಹೋಗಿ",
    ta: "தேவையான நடவடிக்கை: 2 அடையாள அட்டைகளுடன் வங்கி கிளைக்கு செல்லவும்",
    ta_simple: "என்ன செய்ய வேண்டும்: உங்கள் அடையாள அட்டையுடன் வங்கிக்கு செல்லவும்"
  },

  // Trust Verified Status
  trustVerifiedHeading: {
    en: "Accessibility Trust Verified — Proceeding Normally",
    en_simple: "Identity Confirmed: We Know It's You! ✅",
    hi: "एक्सेसिबिलिटी ट्रस्ट सत्यापित — सुरक्षित रूप से आगे बढ़ें",
    hi_simple: "पहचान की पुष्टि हो गई: हम जानते हैं कि यह आप ही हैं! ✅",
    kn: "ಪ್ರವೇಶಸಾಧ್ಯತೆ ವಿಶ್ವಾಸ ದೃಢೀಕರಿಸಲಾಗಿದೆ — ಸುರಕ್ಷಿತವಾಗಿ ಮುಂದುವರಿಯಿರಿ",
    kn_simple: "ದೃಢೀಕರಣ ಯಶಸ್ವಿ: ಇದು ನೀವೇ ಎಂದು ನಮಗೆ ತಿಳಿದಿದೆ! ✅",
    ta: "அணுகல்தன்மை சரிபார்க்கப்பட்டது — பாதுகாப்பாக தொடரவும்",
    ta_simple: "அடையாளம் உறுதியானது: இது நீங்கள் தான்! ✅"
  },
  trustVerifiedMessage: {
    en: "Motor tremor recognized via signed Accessibility Token (Ed25519). Bot defense bypassed.",
    en_simple: "Your hand tremor was recognized by your verified accessibility profile. You will not be locked out.",
    hi: "हस्ताक्षरित टोकन (Ed25519) के माध्यम से हाथ के कंपन की पुष्टि की गई। बॉट सुरक्षा बायपास हुई।",
    hi_simple: "आपकी हाथ की कंपन को पहचान लिया गया है। आपको लॉक नहीं किया जाएगा।",
    kn: "ಸಹಿ ಮಾಡಲಾದ ಟೋಕನ್ ಮೂಲಕ ನಡುಕವನ್ನು ಗುರುತಿಸಲಾಗಿದೆ. ಬಾಟ್ ತಡೆಗೋಡೆ ನಿವಾರಿಸಲಾಗಿದೆ.",
    kn_simple: "ನಿಮ್ಮ ಕೈ ನಡುಕವನ್ನು ವ್ಯವಸ್ಥೆಯು ಗುರುತಿಸಿದೆ. ನೀವು ಲಾಕ್ ಆಗುವುದಿಲ್ಲ.",
    ta: "கையொப்பமிட்ட டோக்கன் மூலம் நடுக்கம் அடையாளம் காணப்பட்டது. கணக்கு முடக்கப்படாது.",
    ta_simple: "உங்கள் நடுக்கத்தை கணினி புரிந்து கொண்டது. நீங்கள் தடையின்றி தொடரலாம்."
  },

  // Session Timeouts
  sessionTimeoutLabel: {
    en: "Session Time Remaining:",
    en_simple: "Time left on this page:",
    hi: "सत्र का बचा हुआ समय:",
    hi_simple: "इस पृष्ठ पर बचा हुआ समय:",
    kn: "ಸೆಷನ್‌ನ ಉಳಿದಿರುವ ಸಮಯ:",
    kn_simple: "ಈ ಪುಟದಲ್ಲಿ ಉಳಿದಿರುವ ಸಮಯ:",
    ta: "அமர்வில் மீதமுள்ள நேரம்:",
    ta_simple: "இப்பக்கத்தில் மீதமுள்ள நேரம்:"
  },
  sessionExtendedNotice: {
    en: "Session extended to 5:00 — adaptive accessibility mode active",
    en_simple: "We extended your time to 5:00 so you don't feel rushed!",
    hi: "सत्र समय 5:00 तक बढ़ाया गया — अनुकूलन मोड सक्रिय",
    hi_simple: "हमने आपका समय बढ़ाकर 5:00 कर दिया है ताकि आप आराम से काम कर सकें!",
    kn: "ಸೆಷನ್ 5:00 ವರೆಗೆ ವಿಸ್ತರಿಸಲಾಗಿದೆ — ಹೊಂದಾಣಿಕೆಯ ಪ್ರವೇಶಸಾಧ್ಯತೆ ಸಕ್ರಿಯ",
    kn_simple: "ನೀವು ನಿರಾಳವಾಗಿ ಬಳಸಲು ನಾವು ಸಮಯವನ್ನು 5:00 ಕ್ಕೆ ವಿಸ್ತರಿಸಿದ್ದೇವೆ!",
    ta: "நேரம் 5:00 வரை நீட்டிக்கப்பட்டது — அணுகல்தன்மை பயன்முறை செயலில் உள்ளது",
    ta_simple: "நீங்கள் அவசரப்படாமல் இருக்க நேரம் 5:00 ஆக நீட்டிக்கப்பட்டுள்ளது!"
  },
  gracefulTimeoutHeading: {
    en: "Session Ended for Your Security (5:00 Max Cap)",
    en_simple: "Time Limit Reached — Your Progress is Saved 🔒",
    hi: "सुरक्षा के लिए सत्र समाप्त (5:00 अधिकतम सीमा)",
    hi_simple: "समय सीमा समाप्त — आपका काम सुरक्षित है 🔒",
    kn: "ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ ಸೆಷನ್ ಮುಕ್ತಾಯಗೊಂಡಿದೆ (5:00 ಗರಿಷ್ಠ ಮಿತಿ)",
    kn_simple: "ಸಮಯ ಮಿತಿ ಮುಗಿದಿದೆ — ನಿಮ್ಮ ವಿವರಗಳು ಉಳಿಸಲಾಗಿದೆ 🔒",
    ta: "உங்கள் பாதுகாப்பிற்காக அமர்வு முடிந்தது (5:00 அதிகபட்ச வரம்பு)",
    ta_simple: "நேர வரம்பு முடிந்தது — உங்கள் விவரங்கள் சேமிக்கப்பட்டுள்ளன 🔒"
  },
  gracefulTimeoutMessage: {
    en: "Your 5-minute maximum session window has concluded. To protect your financial security, please sign back in to continue.",
    en_simple: "For your safety, banking pages close after 5 minutes. Everything you typed is saved — just sign back in to finish.",
    hi: "आपकी 5 मिनट की अधिकतम समय सीमा समाप्त हो गई है। कृपया जारी रखने के लिए फिर से लॉगिन करें।",
    hi_simple: "आपकी सुरक्षा के लिए पेज 5 मिनट बाद बंद होता है। सब कुछ सुरक्षित है — बस दोबारा लॉगिन करें।",
    kn: "ನಿಮ್ಮ 5 ನಿಮಿಷಗಳ ಗರಿಷ್ಠ ಸಮಯ ಮುಗಿದಿದೆ. ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
    kn_simple: "ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ 5 ನಿಮಿಷಗಳ ನಂತರ ಪುಟ ಮುಚ್ಚುತ್ತದೆ. ಎಲ್ಲಾ ಮಾಹಿತಿ ಉಳಿದಿದೆ — ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ.",
    ta: "உங்கள் 5 நிமிட அதிகபட்ச அமர்வு முடிந்தது. தொடர மீண்டும் உள்நுழையவும்.",
    ta_simple: "உங்கள் பாதுகாப்பிற்காக 5 நிமிடங்களுக்குப் பிறகு பக்கம் மூடப்படும். தகவல் பாதுகாப்பாக உள்ளது — மீண்டும் உள்நுழையவும்."
  },
  signBackIn: {
    en: "Sign Back In & Restore Session",
    hi: "फिर से लॉगिन करें और सत्र पुनर्स्थापित करें",
    kn: "ಮತ್ತೆ ಲಾಗಿನ್ ಮಾಡಿ ಮತ್ತು ಸೆಷನ್ ಮರುಸ್ಥಾಪಿಸಿ",
    ta: "மீண்டும் உள்நுழைந்து தொடரவும்"
  },

  // Success Screen
  transferSuccessHeading: {
    en: "Transfer Completed Successfully",
    hi: "हस्तांतरण सफलतापूर्वक पूरा हुआ",
    kn: "ವರ್ಗಾವಣೆ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
    ta: "பரிமாற்றம் வெற்றிகரமாக முடிந்தது"
  },
  startNewTransfer: {
    en: "Start New Transfer",
    hi: "नया हस्तांतरण शुरू करें",
    kn: "ಹೊಸ ವರ್ಗಾವಣೆ ಪ್ರಾರಂಭಿಸಿ",
    ta: "புதிய பரிமாற்றத்தைத் தொடங்கவும்"
  },

  // Inspector & Demo Buttons
  inspectorTitle: {
    en: "Live Inspector — Multi-Language, Jitter & Trust Controls",
    hi: "लाइव इंस्पेक्टर — बहुभाषी, कंपन और सुरक्षा नियंत्रण",
    kn: "ಲೈವ್ ಇನ್‌ಸ್ಪೆಕ್ಟರ್ — ಬಹುಭಾಷೆ, ನಡುಕ ಮತ್ತು ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳು",
    ta: "நேரடி ஆய்வாளர் — பன்மொழி, நடுக்கம் மற்றும் பாதுகாப்பு கட்டுப்பாடுகள்"
  },
  btnSimulateTremor: {
    en: "1. Simulate Tremor Input (Detect >2 tremors to extend 1:00 to 5:00)",
    hi: "1. कंपन इनपुट का अनुकरण करें (>2 कंपन पर 1:00 से 5:00 विस्तार)",
    kn: "1. ನಡುಕದ ಇನ್‌ಪುಟ್ ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ (>2 ನಡುಕ ಕಂಡುಬಂದರೆ 1:00 ರಿಂದ 5:00 ಕ್ಕೆ ವಿಸ್ತರಿಸಿ)",
    ta: "1. நடுக்க உள்ளீட்டை உருவகப்படுத்தவும் (>2 நடுக்கங்கள் கண்டறியப்பட்டால் 1:00 லிருந்து 5:00 ஆக நீட்டிக்கவும்)"
  },
  btnFastForward: {
    en: "Fast-Forward to 5:00 Cap",
    hi: "5:00 सीमा तक तेजी से आगे बढ़ें",
    kn: "5:00 ಮಿತಿಗೆ ವೇಗವಾಗಿ ಮುಂದುವರಿಯಿರಿ",
    ta: "5:00 வரம்பிற்கு விரைவாக செல்லவும்"
  },
  btnSimulateBot: {
    en: "Simulate Bot Cursor (Score 0.22)",
    hi: "बॉट कर्सर का अनुकरण करें (स्कोर 0.22)",
    kn: "ಬಾಟ್ ಕರ್ಸರ್ ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ (ಸ್ಕೋರ್ 0.22)",
    ta: "பாட் கர்சரை உருவகப்படுத்தவும் (மதிப்பெண் 0.22)"
  },
  btnRecalibrate: {
    en: "Recalibrate",
    hi: "पुनः कैलिब्रेट करें",
    kn: "ಮರುಮಾಪನ ಮಾಡಿ",
    ta: "மீண்டும் அளவீடு செய்யவும்"
  },
  btnResetDemo: {
    en: "Reset Demo",
    hi: "डेमो रीसेट करें",
    kn: "ಡೆಮೊ ಮರುಹೊಂದಿಸಿ",
    ta: "டெமோவை மீட்டமைக்கவும்"
  }
};
