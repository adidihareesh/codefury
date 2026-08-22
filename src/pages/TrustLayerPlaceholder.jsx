import React from 'react';
import { Sparkles, ArrowLeft, Layers, ShieldCheck, Clock } from 'lucide-react';

export default function TrustLayerPlaceholder({ setCurrentRoute }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accentBg text-accent flex items-center justify-center mx-auto mb-4 border border-accent shadow-sm">
        <Sparkles className="w-8 h-8 animate-pulse" />
      </div>
      <span className="px-3 py-1 bg-accentBg text-accent text-xs font-bold rounded-full uppercase tracking-wider">
        Ready for Next Phase
      </span>
      <h2 className="text-2xl font-extrabold text-textPrimary mt-3 mb-2">Accessibility Trust Layer App</h2>
      <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
        Phase 0 is currently active on <span className="font-mono font-bold text-danger">/dummy-bank</span>. Confirm Phase 0 to unlock Phase 1 (Fintech dashboard baseline form).
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-5 text-left max-w-md mx-auto mb-6 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> Upcoming Build Phases:
        </h4>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-bgPrimary border border-slate-200 rounded text-slate-700">
            <strong>Phase 1:</strong> Modern fintech dashboard with baseline fraud lock
          </div>
          <div className="p-2 bg-bgPrimary border border-slate-200 rounded text-slate-500">
            <strong>Phase 2:</strong> Real-time tremor tracking + 15s calibration + adaptive UI
          </div>
          <div className="p-2 bg-bgPrimary border border-slate-200 rounded text-slate-500">
            <strong>Phase 3:</strong> Signed Accessibility Trust Token + Master Toggle
          </div>
          <div className="p-2 bg-bgPrimary border border-slate-200 rounded text-slate-500">
            <strong>Phase 4:</strong> Voice-to-Text accessibility input
          </div>
          <div className="p-2 bg-bgPrimary border border-slate-200 rounded text-slate-500">
            <strong>Phase 5:</strong> End-to-end polish pass & live telemetry captions
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentRoute('/dummy-bank')}
        className="px-4 py-2 bg-danger hover:bg-danger text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Phase 0 (/dummy-bank)</span>
      </button>
    </div>
  );
}
