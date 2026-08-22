import React from 'react';
import { CheckCircle, ShieldCheck, AlertOctagon, Sparkles, Home } from 'lucide-react';
import AccessibilityMenu from './AccessibilityMenu';
import { useAccessibility } from '../context/AccessibilityContext';

export default function Navigation({ currentRoute, setCurrentRoute }) {
  const { t } = useAccessibility();

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => setCurrentRoute('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-success flex items-center justify-center shadow-md shadow-accent group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">{t('brandTitle')}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-successBg text-success border border-success rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {t('navReadyBadge')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">{t('brandSubtitle')}</p>
          </div>
        </div>

        {/* Right Navigation & Accessibility Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Route switcher navigation */}
          <nav className="flex items-center gap-1.5 sm:gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setCurrentRoute('/')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                currentRoute === '/'
                  ? 'bg-slate-800 text-accent border border-slate-700 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('navOverview')}</span>
            </button>

            <button
              onClick={() => setCurrentRoute('/dummy-bank')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === '/dummy-bank'
                  ? 'bg-dangerBg text-danger border border-danger shadow-sm font-bold'
                  : 'text-slate-500 hover:text-danger hover:bg-red-950/30'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-danger" />
              <span>{t('navVictimSite')}</span>
            </button>

            <button
              onClick={() => setCurrentRoute('/trust-layer')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === '/trust-layer'
                  ? 'bg-accentBg text-accent border border-accent shadow-sm font-bold'
                  : 'text-slate-500 hover:text-accent hover:bg-teal-950/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>{t('navTrustLayer')}</span>
            </button>
          </nav>

          {/* Floating Accessibility Settings Menu Button */}
          <AccessibilityMenu />
        </div>
      </div>
    </header>
  );
}
