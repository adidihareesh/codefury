import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Sliders, 
  Eye, 
  Sun, 
  BookOpen, 
  X, 
  RotateCcw,
  Languages,
  Volume2
} from 'lucide-react';

export default function AccessibilityMenu() {
  const {
    language,
    setLanguage,
    colorBlindness,
    setColorBlindness,
    isHighContrast,
    setIsHighContrast,
    isSimplifyText,
    setIsSimplifyText,
    isMenuOpen,
    setIsMenuOpen
  } = useAccessibility();

  const languageOptions = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी (Hindi)' },
    { id: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { id: 'ta', label: 'தமிழ் (Tamil)' }
  ];

  const colorBlindnessOptions = [
    { id: 'none', label: 'None / Default' },
    { id: 'protanopia', label: 'Protanopia (red-blind)' },
    { id: 'deuteranopia', label: 'Deuteranopia (green-blind)' },
    { id: 'tritanopia', label: 'Tritanopia (blue-blind)' },
    { id: 'monochromacy', label: 'Monochromacy (full color blind)' }
  ];

  const resetAll = () => {
    setLanguage('en');
    setColorBlindness('none');
    setIsHighContrast(false);
    setIsSimplifyText(false);
  };

  const hasActiveModifiers = language !== 'en' || colorBlindness !== 'none' || isHighContrast || isSimplifyText;

  return (
    <div className="relative z-50">
      {/* Floating Header Button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        title="Open Accessibility & Language Profile Settings"
        aria-label="Open Accessibility Settings"
        className={`px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
          hasActiveModifiers
            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
            : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
        }`}
      >
        <Eye className="w-4 h-4 text-teal-300" />
        <span className="hidden sm:inline">
          {language !== 'en' ? `Language: ${language.toUpperCase()}` : 'Accessibility'}
        </span>
        {hasActiveModifiers && (
          <span className="w-2 h-2 rounded-full bg-slate-950"></span>
        )}
      </button>

      {/* Floating Settings Dropdown Panel */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border-2 border-teal-500/50 rounded-3xl p-5 shadow-2xl text-white z-50 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Accessibility Profiles</h3>
                  <p className="text-[10px] text-slate-400">Multi-language, voice TTS, SVG & contrast</p>
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Multi-Language Selector Dropdown */}
              <div>
                <label className="block font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-teal-400" />
                    <span>Language / भाषा / ಭಾಷೆ / மொழி:</span>
                  </span>
                  <span className="text-[10px] text-teal-300 font-mono">Voice & Text</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-teal-400 outline-none transition-all font-medium"
                >
                  {languageOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-teal-400" />
                  <span>Updates text labels, Web Speech input, and audio TTS instructions.</span>
                </p>
              </div>

              {/* 2. Color Blindness Dropdown */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-teal-400" />
                    <span>Color Blindness Filter:</span>
                  </span>
                  {colorBlindness !== 'none' && (
                    <span className="text-[10px] text-teal-300 font-mono">SVG Active</span>
                  )}
                </label>
                <select
                  value={colorBlindness}
                  onChange={(e) => setColorBlindness(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-teal-400 outline-none transition-all"
                >
                  {colorBlindnessOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Low-Vision / High-Contrast Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>High Contrast / Low-Vision</span>
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      +20% larger text, pure B&W contrast, 3px focus outline
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsHighContrast(!isHighContrast)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      isHighContrast ? 'bg-teal-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        isHighContrast ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 4. Cognitive / Simplify Text Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Simplify Text (Cognitive)</span>
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Plain-language labels in selected language
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsSimplifyText(!isSimplifyText)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      isSimplifyText ? 'bg-indigo-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        isSimplifyText ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Status & Reset */}
            <div className="border-t border-slate-800 pt-3 mt-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Composable live across pages
              </span>

              {hasActiveModifiers && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-[11px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
