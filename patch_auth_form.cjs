const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import OcrUploader from')) {
    content = content.replace("import SaathiChatAssistant from '../components/SaathiChatAssistant';", "import SaathiChatAssistant from '../components/SaathiChatAssistant';\nimport OcrUploader from '../components/OcrUploader';");
}

// Add state for new fields
const stateRegex = /const \[authMode, setAuthMode\] = useState\('login'\);/;
const stateReplacement = `const [authMode, setAuthMode] = useState('login');
  const [authFormName, setAuthFormName] = useState('');
  const [authFormDob, setAuthFormDob] = useState('');
  const [authFormPhone, setAuthFormPhone] = useState('');
  const [ocrSuccessNotice, setOcrSuccessNotice] = useState(false);`;
content = content.replace(stateRegex, stateReplacement);

// Update handleAuthSubmit to reset the notice
const submitRegex = /setAuthError\(''\);/;
const submitReplacement = `setAuthError('');\n    setOcrSuccessNotice(false);`;
content = content.replace(submitRegex, submitReplacement);

// Update account creation to include new fields
const accountCreationRegex = /setAccounts\(\[\.\.\.accounts, \{ username: authFormUser, password: authFormPass, upiPin: authFormPin || '1234', prefs: newPrefs \}\]\);/;
const accountCreationReplacement = `setAccounts([...accounts, { 
        username: authFormUser, 
        password: authFormPass, 
        upiPin: authFormPin || '1234', 
        name: authFormName,
        dob: authFormDob,
        phone: authFormPhone,
        prefs: newPrefs 
      }]);`;
content = content.replace(accountCreationRegex, accountCreationReplacement);

// Replace the signup form UI
const signupFormStart = "{authMode === 'signup' && (";
const signupFormEnd = "<button type=\"submit\" className=\"w-full bg-accent hover:brightness-90 text-textInverse font-bold py-3 rounded-xl transition-all shadow-md mt-6\">";
const signupFormRegex = new RegExp(signupFormStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + signupFormEnd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const newSignupForm = `{authMode === 'signup' && (
              <div className="space-y-4">
                <OcrUploader 
                  onExtract={(data) => {
                    if (data.name) setAuthFormName(data.name);
                    if (data.dob) setAuthFormDob(data.dob);
                    if (data.aadhaar) setAuthFormPhone(data.aadhaar); // map to a field for demo
                    setOcrSuccessNotice(true);
                  }}
                  onVoiceFallback={() => {
                     // Hand off to voice flow logic or alert for demo
                     alert("Voice Fallback Activated: 'Hi, I can help you fill this out. What is your name?'");
                  }}
                />

                {ocrSuccessNotice && (
                  <div className="bg-successBg border-2 border-success p-3 rounded-xl mb-4 text-xs font-bold text-success flex items-start gap-2 text-left">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>We read this from your uploaded document — please check it's correct. You can edit any field below.</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={authFormName}
                    onChange={(e) => setAuthFormName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" 
                    placeholder="e.g. Rahul Sharma" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input 
                    type="text" 
                    value={authFormDob}
                    onChange={(e) => setAuthFormDob(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" 
                    placeholder="DD/MM/YYYY" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ID Number / Phone</label>
                  <input 
                    type="text" 
                    value={authFormPhone}
                    onChange={(e) => setAuthFormPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary focus:ring-2 focus:ring-accent outline-none transition-all" 
                    placeholder="e.g. 1234 5678 9012" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Create 4-Digit UPI PIN</label>
                  <input 
                    type="text" 
                    maxLength={4}
                    value={authFormPin}
                    onChange={(e) => setAuthFormPin(e.target.value.replace(/\\D/g, ''))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-textPrimary font-mono font-bold tracking-widest focus:ring-2 focus:ring-accent outline-none transition-all" 
                    placeholder="e.g. 1234" 
                    required={authMode === 'signup'} 
                  />
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-accent hover:brightness-90 text-textInverse font-bold py-3 rounded-xl transition-all shadow-md mt-6">`;

content = content.replace(signupFormRegex, newSignupForm);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched Auth Form");
