import React from 'react';
import { ShieldCheck, AlertOctagon, Sparkles, Home } from 'lucide-react';
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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">{t('brandTitle')}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {t('navReadyBadge')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">{t('brandSubtitle')}</p>
          </div>
        </div>

        {/* Right Navigation & Accessibility Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Route switcher navigation */}
          <nav className="flex items-center gap-1.5 sm:gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setCurrentRoute('/')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentRoute === '/'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('navOverview')}</span>
            </button>

            <button
              onClick={() => setCurrentRoute('/dummy-bank')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === '/dummy-bank'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-red-300 hover:bg-red-950/30'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
              <span>{t('navVictimSite')}</span>
            </button>

            <button
              onClick={() => setCurrentRoute('/trust-layer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentRoute === '/trust-layer'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-teal-300 hover:bg-teal-950/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
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
