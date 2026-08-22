import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function MasterToggle({ isTrustLayerEnabled, onToggle }) {
  const { t } = useAccessibility();

  return (
    <div className="w-full max-w-2xl mx-auto my-3">
      <div className={`p-1.5 rounded-3xl transition-all duration-300 border shadow-xl ${
        isTrustLayerEnabled 
          ? 'bg-bgInverse border-accent shadow-accent ring-2 ring-accent/20' 
          : 'bg-bgInverse border-danger shadow-danger'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 gap-4">
          {/* Status Label & Micro-explanation */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
              isTrustLayerEnabled 
                ? 'bg-accent border border-accent/40 text-accent scale-105' 
                : 'bg-danger border border-danger/40 text-danger'
            }`}>
              {isTrustLayerEnabled ? (
                <ShieldCheck className="w-7 h-7 text-accent animate-pulse" />
              ) : (
                <ShieldAlert className="w-7 h-7 text-danger" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full font-bold bg-black/40 text-slate-300 border border-slate-700">
                  {isTrustLayerEnabled ? 'PROTECTED' : 'UNPROTECTED'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  isTrustLayerEnabled 
                    ? 'bg-accent text-textInverse shadow-sm' 
                    : 'bg-danger text-textInverse'
                }`}>
                  {isTrustLayerEnabled ? 'TRUST LAYER ON' : 'TRUST LAYER OFF'}
                </span>
              </div>
              
              <h3 className="text-sm sm:text-base font-extrabold text-textInverse mt-0.5">
                {isTrustLayerEnabled ? (
                  <span className="text-accent">{t('toggleWithTitle')}</span>
                ) : (
                  <span className="text-danger">{t('toggleWithoutTitle')}</span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isTrustLayerEnabled ? t('toggleWithDesc') : t('toggleWithoutDesc')}
              </p>
            </div>
          </div>

          {/* Interactive Sliding Toggle Switch */}
          <div 
            onClick={onToggle}
            className="flex items-center bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 cursor-pointer select-none hover:border-slate-700 transition-all shrink-0"
          >
            <button
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !isTrustLayerEnabled 
                  ? 'bg-danger text-textInverse shadow-md' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              OFF
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isTrustLayerEnabled 
                  ? 'bg-accent text-textInverse shadow-md shadow-accent' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              ON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
