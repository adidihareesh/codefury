import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Mic, 
  Target, 
  Lock, 
  Layers, 
  Eye, 
  FileCode2,
  Cpu
} from 'lucide-react';

export default function Home({ setCurrentRoute }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accentBg border border-accent/80 text-accent rounded-full text-xs font-bold mb-4 shadow-sm">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span>Hackathon Demo • Accessibility Trust Layer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-textPrimary tracking-tight leading-tight mb-4">
          Fixing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-success">Disability-as-Fraud</span> Paradox in Digital Banking
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          When motor-impaired users (Parkinson's, cerebral palsy, essential tremor) shake their mouse, take longer on a form, or mistype an OTP, modern AI fraud detection algorithms classify that struggling behavior as automated bot attacks. Our <strong>Accessibility Trust Layer</strong> solves this double penalty with cryptographic proof of human accessibility.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentRoute('/trust-layer')}
            className="px-6 py-3 rounded-2xl bg-accent hover:bg-accent text-white font-bold text-sm shadow-lg shadow-accent transition-all flex items-center gap-2 active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Launch Trust Layer Demo (/trust-layer)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentRoute('/dummy-bank')}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-yellow-400" />
            <span>View Unprotected Victim Bank (/dummy-bank)</span>
          </button>
        </div>
      </div>

      {/* 4-Step Live Demo Presentation Guide for Judges */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-accent" />
          <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
            Interactive Judge & Presenter Walkthrough Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-dangerBg text-danger flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h3 className="font-bold text-sm text-slate-200 mb-1">The Victim Site</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Open <strong className="text-danger">/dummy-bank</strong>. Log in and trigger 3 failed OTPs or click "Simulate Tremor" to witness the hostile account lock.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('/dummy-bank')}
              className="mt-4 text-xs text-danger hover:text-danger font-bold flex items-center gap-1"
            >
              <span>Try /dummy-bank</span> &rarr;
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-accentBg text-accent flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <h3 className="font-bold text-sm text-slate-200 mb-1">15s Baseline Calibration</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Open <strong className="text-accent">/trust-layer</strong>. Tap 5 target discs to calibrate the user's tremor envelope and generate the Ed25519 token.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('/trust-layer')}
              className="mt-4 text-xs text-accent hover:text-accent font-bold flex items-center gap-1"
            >
              <span>Calibrate Profile</span> &rarr;
            </button>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h3 className="font-bold text-sm text-slate-200 mb-1">Master Defense Toggle</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Flip the centerpiece switch between <strong>"Without Layer"</strong> (locked) and <strong>"With Layer"</strong> (smooth bypass with verified trust).
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('/trust-layer')}
              className="mt-4 text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
            >
              <span>Test Toggle</span> &rarr;
            </button>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-successBg text-success flex items-center justify-center font-bold text-xs mb-3">
                04
              </div>
              <h3 className="font-bold text-sm text-slate-200 mb-1">Voice-to-Text & Dwell</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Speak the recipient, amount, or OTP using native Web Speech, then hold the button for 500ms dwell-click protection.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('/trust-layer')}
              className="mt-4 text-xs text-success hover:text-success font-bold flex items-center gap-1"
            >
              <span>Test Voice & Dwell</span> &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Architectural Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Victim Card */}
        <div className="bg-white border-2 border-danger/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-dangerBg text-danger flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-dangerBg text-danger text-[10px] font-bold uppercase rounded-full tracking-wider">
                Unprotected Legacy
              </span>
            </div>

            <h3 className="text-xl font-bold text-textPrimary mb-2">The Problem: Unprotected Bank Portal</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Standard legacy banking interfaces with zero accommodations and aggressive, un-tuned anti-bot filters.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                <span><strong>Aggressive OTP Lockout:</strong> Fails on 3 attempts with zero retry grace.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                <span><strong>Strict 30s Timeout:</strong> Cuts off users who take longer to coordinate movements.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                <span><strong>No Motor Accommodations:</strong> Tiny click targets, zero voice input, zero dwell-click.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentRoute('/dummy-bank')}
            className="w-full mt-6 py-3 bg-dangerBg hover:bg-dangerBg text-danger border border-danger rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Victim Bank Demo (/dummy-bank)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Layer Card */}
        <div className="bg-white border-2 border-accent/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between ring-2 ring-accent">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-accentBg text-accent flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-accentBg text-accent text-[10px] font-bold uppercase rounded-full tracking-wider">
                Full Trust Layer
              </span>
            </div>

            <h3 className="text-xl font-bold text-textPrimary mb-2">The Solution: Accessibility Trust Layer</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Modern fintech frontend equipped with personalized baseline calibration, signed trust tokens, and adaptive UI.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Signed Trust Token:</strong> Ed25519 cryptographic-style token exempts verified tremors from bot defense.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Adaptive UI & Dwell Click:</strong> Enlarges touch targets (+30%) and activates 500ms hold-to-confirm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span><strong>Voice-to-Text Input:</strong> Native Web Speech dictation for Recipient, Amount, and OTP.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentRoute('/trust-layer')}
            className="w-full mt-6 py-3 bg-accent hover:bg-accent text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-accent"
          >
            <span>Launch Full Trust Layer (/trust-layer)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
