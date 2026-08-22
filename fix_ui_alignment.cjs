const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace Recipient Input Block
const recipientOld = `<div className="relative mt-3 w-full max-w-sm flex items-center justify-center">
        <input
          type="text"
          required
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Name, UPI ID or Number"
          className={\`w-full text-center bg-transparent border-b-2 border-slate-300 font-semibold text-slate-900 focus:border-teal-500 outline-none transition-all placeholder-slate-400 \${
            isAdaptiveActive && isTrustLayerEnabled ? 'py-3 text-2xl' : 'py-2 text-xl'
          }\`}
        />
        <VoiceInputButton
          onTranscript={(text) => setRecipient(text)}
          fieldLabel={t('recipientLabel')}
          className={\`absolute right-0 bottom-2 \${isAdaptiveActive && isTrustLayerEnabled ? 'py-2 px-2 rounded-xl' : 'py-1 px-1 rounded-lg'}\`}
        />
      </div>`;

const recipientNew = `<div className="flex items-center gap-3 mt-3 w-full max-w-sm border-b-2 border-slate-300 focus-within:border-teal-500 transition-all">
        <input
          type="text"
          required
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Name, UPI ID or Number"
          className={\`flex-1 text-center bg-transparent font-semibold text-slate-900 outline-none placeholder-slate-400 \${
            isAdaptiveActive && isTrustLayerEnabled ? 'py-3 text-2xl' : 'py-2 text-xl'
          }\`}
        />
        <div className="shrink-0 mb-1">
          <VoiceInputButton
            onTranscript={(text) => setRecipient(text)}
            fieldLabel={t('recipientLabel')}
            className={isAdaptiveActive && isTrustLayerEnabled ? 'py-2 px-2 rounded-xl' : 'py-1.5 px-1.5 rounded-lg'}
          />
        </div>
      </div>`;

content = content.replace(recipientOld, recipientNew);

// Replace Amount Input Block
const amountOld = `<div className="relative flex items-center justify-center w-full max-w-sm mt-4 group">
        <span className={\`text-slate-900 font-extrabold font-sans pr-2 \${isAdaptiveActive && isTrustLayerEnabled ? 'text-6xl' : 'text-5xl'}\`}>₹</span>
        <input
          type="number"
          step="0.01"
          min="1"
          max="120000"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className={\`bg-transparent font-mono font-extrabold text-slate-900 w-3/4 outline-none transition-all placeholder-slate-300 \${
            isAdaptiveActive && isTrustLayerEnabled ? 'text-6xl' : 'text-5xl'
          }\`}
        />
        <VoiceInputButton
          onTranscript={(amt) => setAmount(amt)}
          fieldLabel={t('amountLabel')}
          isNumeric={true}
          presetSpoken="350"
          className={\`absolute right-0 bottom-2 \${isAdaptiveActive && isTrustLayerEnabled ? 'py-2 px-2 rounded-xl' : 'py-1 px-1 rounded-lg'}\`}
        />
      </div>`;

const amountNew = `<div className="flex items-center justify-center gap-4 mt-4 w-full">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-3xl px-6 py-2 shadow-sm focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
          <span className={\`text-slate-900 font-extrabold font-sans pr-2 \${isAdaptiveActive && isTrustLayerEnabled ? 'text-5xl' : 'text-4xl'}\`}>₹</span>
          <input
            type="number"
            step="0.01"
            min="1"
            max="120000"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className={\`bg-transparent font-mono font-extrabold text-slate-900 w-[180px] outline-none transition-all placeholder-slate-300 \${
              isAdaptiveActive && isTrustLayerEnabled ? 'text-5xl' : 'text-4xl'
            }\`}
          />
        </div>
        <div className="shrink-0">
          <VoiceInputButton
            onTranscript={(amt) => setAmount(amt)}
            fieldLabel={t('amountLabel')}
            isNumeric={true}
            presetSpoken="350"
            className={isAdaptiveActive && isTrustLayerEnabled ? 'py-4 px-4 rounded-2xl shadow-sm' : 'py-3 px-3 rounded-xl shadow-sm'}
          />
        </div>
      </div>`;

content = content.replace(amountOld, amountNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated UI alignment successfully");
