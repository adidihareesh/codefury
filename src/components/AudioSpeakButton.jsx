import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioSpeakButton({ text, label = 'instruction', className = '' }) {
  const { speakText, stopSpeaking, isSpeaking, language } = useAccessibility();
  const [isCurrentlyReadingThis, setIsCurrentlyReadingThis] = useState(false);

  const langNames = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ta: 'தமிழ் (Tamil)'
  };

  const handleSpeak = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentlyReadingThis && isSpeaking) {
      stopSpeaking();
      setIsCurrentlyReadingThis(false);
      return;
    }

    setIsCurrentlyReadingThis(true);
    speakText(text);

    // Reset local reading state after reasonable speech time
    setTimeout(() => {
      setIsCurrentlyReadingThis(false);
    }, 4500);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={`Listen aloud in ${langNames[language] || 'selected language'} (Text-to-Speech)`}
      aria-label={`Read ${label} aloud`}
      className={`p-1.5 rounded-lg transition-all duration-200 inline-flex items-center gap-1 text-slate-500 hover:text-teal-600 hover:bg-teal-50 border border-transparent hover:border-teal-200 ${
        isCurrentlyReadingThis && isSpeaking 
          ? 'bg-teal-100 text-teal-900 border-teal-400 animate-pulse ring-2 ring-teal-300' 
          : ''
      } ${className}`}
    >
      {isCurrentlyReadingThis && isSpeaking ? (
        <Volume2 className="w-3.5 h-3.5 text-teal-700 animate-bounce" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
      <span className="sr-only">Read aloud</span>
    </button>
  );
}
