import React, { createContext, useContext, useState, useEffect } from 'react';
import { textStrings } from '../utils/simplifiedText';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  // Language Selection: 'en' | 'hi' | 'kn' | 'ta'
  const [language, setLanguage] = useState('en');

  // Color Blindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy'
  const [colorBlindness, setColorBlindness] = useState('none');

  // Low-Vision / High-Contrast Mode: true | false
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Cognitive / Simplify Text Mode: true | false
  const [isSimplifyText, setIsSimplifyText] = useState(false);

  // Floating settings drawer state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // SpeechSynthesis speaking indicator state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Language speech codes map
  const speechLangMap = {
    en: 'en-IN',
    hi: 'hi-IN',
    kn: 'kn-IN',
    ta: 'ta-IN'
  };

  // Composable string lookup: language + simplification
  const t = (key) => {
    if (!textStrings[key]) return key;
    const entry = textStrings[key];

    const simpleKey = `${language}_simple`;
    if (isSimplifyText && entry[simpleKey]) {
      return entry[simpleKey];
    }
    if (entry[language]) {
      return entry[language];
    }
    if (isSimplifyText && entry.en_simple) {
      return entry.en_simple;
    }
    return entry.en || key;
  };

  // 3. VOICE OUTPUT (Text-to-Speech via browser SpeechSynthesis API)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLangMap[language] || 'en-IN';
      utterance.rate = 0.95; // Slightly slower for clarity
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Get CSS filter rule for color blindness
  const getFilterStyle = () => {
    switch (colorBlindness) {
      case 'protanopia':
        return 'url(#protanopia-filter)';
      case 'deuteranopia':
        return 'url(#deuteranopia-filter)';
      case 'tritanopia':
        return 'url(#tritanopia-filter)';
      case 'monochromacy':
        return 'grayscale(100%)';
      default:
        return 'none';
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        speechLangCode: speechLangMap[language] || 'en-IN',
        colorBlindness,
        setColorBlindness,
        isHighContrast,
        setIsHighContrast,
        isSimplifyText,
        setIsSimplifyText,
        isMenuOpen,
        setIsMenuOpen,
        isSpeaking,
        speakText,
        stopSpeaking,
        t,
        getFilterStyle
      }}
    >
      {/* SVG Color Blindness Matrix Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Protanopia (Red-blind) */}
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0,     0, 0
                      0.558, 0.442, 0,     0, 0
                      0,     0.242, 0.758, 0, 0
                      0,     0,     0,     1, 0"
            />
          </filter>

          {/* Deuteranopia (Green-blind) */}
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0,   0, 0
                      0.7,   0.3,   0,   0, 0
                      0,     0.3,   0.7, 0, 0
                      0,     0,     0,   1, 0"
            />
          </filter>

          {/* Tritanopia (Blue-blind) */}
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05,  0,     0, 0
                      0,    0.433, 0.567, 0, 0
                      0,    0.475, 0.525, 0, 0
                      0,    0,     0,     1, 0"
            />
          </filter>

          {/* Monochromacy (Full color blind) */}
          <filter id="monochromacy-filter">
            <feColorMatrix
              type="matrix"
              values="0.299, 0.587, 0.114, 0, 0
                      0.299, 0.587, 0.114, 0, 0
                      0.299, 0.587, 0.114, 0, 0
                      0,     0,     0,     1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Root App Wrapper with Filter & High-Contrast Class Application */}
      <div 
        style={{ filter: getFilterStyle() }}
        className={`min-h-screen transition-all duration-200 ${
          isHighContrast ? 'high-contrast-mode' : ''
        } ${isSimplifyText ? 'simplify-text-mode' : ''}`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
