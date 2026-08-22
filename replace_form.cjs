const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// We will locate the exact <form onSubmit={handleTransfer} className="space-y-6"> and the closing </form>
const startToken = '<form onSubmit={handleTransfer} className="space-y-6">';
const startIndex = content.indexOf(startToken);
if (startIndex === -1) {
    console.log("Start token not found");
    process.exit(1);
}

const endToken = '</form>';
const endIndex = content.indexOf(endToken, startIndex);
if (endIndex === -1) {
    console.log("End token not found");
    process.exit(1);
}

const replacement = `{!showConfirmation && !showPinPad && !transferSuccess && (
  <form onSubmit={handleProceed} className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
    <div className="flex flex-col items-center justify-center pt-4 mb-4">
      <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-3 shadow-inner">
        <User className="w-8 h-8 text-slate-400" />
      </div>
      <label className={\`block font-bold text-slate-700 text-center flex flex-col items-center gap-1.5 \${isAdaptiveActive && isTrustLayerEnabled ? 'text-sm' : 'text-xs'}\`}>
        <div className="flex items-center gap-2">
          <span>{t('recipientLabel')}</span>
          <AudioSpeakButton text={t('recipientLabel')} label="Recipient Name" />
        </div>
      </label>
      <div className="relative mt-3 w-full max-w-sm flex items-center justify-center">
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
      </div>
    </div>

    <div className="flex flex-col items-center justify-center mb-6">
      <div className="relative flex items-center justify-center w-full max-w-sm mt-4 group">
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
      </div>

      <div className="mt-6 w-full max-w-sm">
        <div className="grid grid-cols-4 gap-2">
          {['50', '100', '250', '500'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setAmount(chip)}
              className={\`py-2 px-1 rounded-2xl font-mono font-bold text-xs border-2 transition-all shadow-sm \${
                amount === chip 
                  ? 'bg-slate-900 text-white border-slate-800' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }\`}
            >
              ₹{chip}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="pt-4 w-full flex flex-col items-center">
      <DwellButton
        type="submit"
        isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
        dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
        className="w-full max-w-sm bg-teal-600 hover:bg-teal-700 text-white shadow-lg text-base py-4 rounded-3xl font-bold flex justify-center items-center"
      >
        <span>Proceed to Pay</span>
      </DwellButton>
      <div className="mt-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
        <Shield className="w-3 h-3" /> Powered by UPI
      </div>
    </div>
  </form>
)}

{showConfirmation && !showPinPad && !transferSuccess && (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 flex flex-col items-center text-center mt-12 pb-12">
    <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
      <User className="w-10 h-10 text-teal-600" />
    </div>
    <h3 className="text-xl text-slate-500 font-medium">Paying</h3>
    <h2 className="text-3xl font-bold text-slate-900 capitalize">{recipient}</h2>
    <div className="text-5xl font-mono font-extrabold text-slate-900 my-4">₹{amount}</div>
    
    <div className="flex gap-4 w-full max-w-xs mt-8">
      <button 
        onClick={() => setShowConfirmation(false)} 
        className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
      >
        Cancel
      </button>
      <DwellButton
        onClick={() => { setShowConfirmation(false); setShowPinPad(true); }}
        isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
        dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
        className="flex-1 py-3 rounded-2xl bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-lg flex justify-center items-center"
      >
        Confirm
      </DwellButton>
    </div>
    <div className="mt-6 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
      <Shield className="w-3 h-3" /> Powered by UPI
    </div>
  </div>
)}

{showPinPad && !transferSuccess && (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 flex flex-col items-center mt-8 pb-12">
    <h2 className="text-lg font-bold text-slate-700 mb-2">Enter 4-Digit UPI PIN</h2>
    <div className="flex gap-4 justify-center mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={\`w-6 h-6 rounded-full border-2 \${otp.length > i ? 'bg-slate-900 border-slate-900' : 'bg-transparent border-slate-300'}\`}></div>
      ))}
    </div>

    {otpErrorMessage && (
      <p className="text-red-600 font-bold text-sm mb-4 bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        {otpErrorMessage}
      </p>
    )}

    <div className="grid grid-cols-3 gap-x-6 gap-y-4 max-w-[280px] mx-auto">
      {['1','2','3','4','5','6','7','8','9','X','0','OK'].map(key => {
        if (key === 'X') {
          return (
            <DwellButton
              key={key}
              onClick={() => setOtp(prev => prev.slice(0, -1))}
              isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
              dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
              className={\`rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center hover:bg-slate-200 active:bg-slate-300 \${isAdaptiveActive && isTrustLayerEnabled ? 'w-20 h-20 text-2xl' : 'w-16 h-16 text-xl'}\`}
            >
              ⌫
            </DwellButton>
          );
        }
        if (key === 'OK') {
          return (
            <DwellButton
              key={key}
              onClick={handleTransfer}
              isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
              dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
              className={\`rounded-full bg-teal-600 text-white font-bold flex items-center justify-center hover:bg-teal-700 active:bg-teal-800 shadow-md \${isAdaptiveActive && isTrustLayerEnabled ? 'w-20 h-20 text-xl' : 'w-16 h-16 text-lg'}\`}
            >
              <Send className="w-6 h-6" />
            </DwellButton>
          );
        }
        return (
          <DwellButton
            key={key}
            onClick={() => {
              if (otp.length < 4) setOtp(prev => prev + key);
            }}
            isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
            dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
            className={\`rounded-full border border-slate-200 bg-white text-slate-900 font-mono font-bold flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 shadow-sm \${isAdaptiveActive && isTrustLayerEnabled ? 'w-20 h-20 text-4xl' : 'w-16 h-16 text-3xl'}\`}
          >
            {key}
          </DwellButton>
        );
      })}
    </div>
    
    <div className="mt-8 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
      <Shield className="w-3 h-3" /> Powered by UPI
    </div>
  </div>
)}`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex + endToken.length);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully replaced the form");
