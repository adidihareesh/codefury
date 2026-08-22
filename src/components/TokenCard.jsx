import React, { useState } from 'react';
import { Key, ShieldCheck, Copy, Check, ChevronDown, ChevronUp, Code2, Lock } from 'lucide-react';

export default function TokenCard({ tokenData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!tokenData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenData.rawToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-accent rounded-3xl p-4 sm:p-5 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accentBg border border-accent text-accent flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-white">Signed Accessibility Trust Token</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent text-textInverse flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              ALG: Ed25519 | CLAIMS: BYPASS_BOT_LOCKOUT | EXPIRES: {tokenData.expiresIn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JWT'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-xl bg-accent text-textInverse hover:brightness-90 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{isExpanded ? 'Hide Payload' : 'Inspect Token'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Raw String Preview */}
      <div className="mt-3 bg-black/60 rounded-2xl p-2.5 border border-slate-800 font-mono text-[11px] text-slate-500 truncate select-all">
        <span className="text-accent font-bold">{tokenData.rawToken.substring(0, 32)}</span>
        <span className="text-purple-400 font-bold">.{tokenData.rawToken.substring(33, 85)}</span>
        <span className="text-success font-bold">.{tokenData.rawToken.substring(86)}</span>
      </div>

      {/* Expanded JWT Claims Inspector */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-accent font-bold text-[10px] uppercase block mb-1">Header (Ed25519)</span>
            <pre className="text-slate-300 text-[11px] overflow-x-auto">
              {JSON.stringify(tokenData.header, null, 2)}
            </pre>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="text-purple-400 font-bold text-[10px] uppercase block mb-1">Payload & Exemption Policy</span>
            <pre className="text-slate-300 text-[11px] overflow-x-auto max-h-48">
              {JSON.stringify(tokenData.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
