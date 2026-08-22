const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add OcrUploader import
if (!content.includes('import OcrUploader from')) {
    content = content.replace("import SaathiChatAssistant from '../components/SaathiChatAssistant';", "import SaathiChatAssistant from '../components/SaathiChatAssistant';\nimport OcrUploader from '../components/OcrUploader';");
}

// 2. Add State for Auth Form if missing
const stateRegex = /const \[authMode, setAuthMode\] = useState\('login'\);/;
if (!content.includes('authFormName')) {
  const stateReplacement = `const [authMode, setAuthMode] = useState('login');
  const [authFormName, setAuthFormName] = useState('');
  const [authFormDob, setAuthFormDob] = useState('');
  const [authFormPhone, setAuthFormPhone] = useState('');
  const [ocrSuccessNotice, setOcrSuccessNotice] = useState(false);`;
  content = content.replace(stateRegex, stateReplacement);
}

// 3. Update handleAuthSubmit to reset notice
const submitRegex = /setAuthError\(''\);/;
if (!content.includes('setOcrSuccessNotice(false)')) {
  const submitReplacement = `setAuthError('');\n    setOcrSuccessNotice(false);`;
  content = content.replace(submitRegex, submitReplacement);
}

// 4. Update account creation to include new fields
const accountCreationRegex = /setAccounts\(\[\.\.\.accounts, \{ username: authFormUser, password: authFormPass, upiPin: authFormPin \|\| '1234', prefs: newPrefs \}\]\);/;
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

// 5. Replace the signup form UI with mandatory fields and OcrUploader
const signupFormStart = "{authMode === 'signup' && (";
const signupFormEnd = "<button type=\"submit\" className=\"w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-6\">";
const signupFormRegex = new RegExp(signupFormStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + signupFormEnd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const newSignupForm = `{authMode === 'signup' && (
              <div className="space-y-4">
                <OcrUploader 
                  onExtract={(data) => {
                    if (data.name) setAuthFormName(data.name);
                    if (data.dob) setAuthFormDob(data.dob);
                    if (data.aadhaar) setAuthFormPhone(data.aadhaar); // map to a field for demo
                    setOcrSuccessNotice("We read this from your uploaded document — please check it's correct. You can edit any field below.");
                  }}
                  onVoiceFallback={() => {
                     // Hand off to voice flow logic or alert for demo
                     alert("Voice Fallback Activated: 'Hi, I can help you fill this out. What is your name?'");
                  }}
                />

                {ocrSuccessNotice && (
                  <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-xl mb-4 text-xs font-bold text-emerald-700 flex items-start gap-2 text-left">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{ocrSuccessNotice}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={authFormName}
                    onChange={(e) => setAuthFormName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="e.g. Rahul Sharma" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input 
                    type="text" 
                    value={authFormDob}
                    onChange={(e) => setAuthFormDob(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="DD/MM/YYYY" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ID Number / Phone</label>
                  <input 
                    type="text" 
                    value={authFormPhone}
                    onChange={(e) => setAuthFormPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="e.g. 1234 5678 9012" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Create 4-Digit UPI PIN</label>
                  <input 
                    type="password" 
                    maxLength={4}
                    value={authFormPin}
                    onChange={(e) => setAuthFormPin(e.target.value.replace(/\\D/g, ''))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono font-bold tracking-widest focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="••••" 
                    required
                  />
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-6">`;

content = content.replace(signupFormRegex, newSignupForm);

// 6. Fix the Saathi AI Chat button text color to be white when inactive
content = content.replace(/transferViewMode === 'CHAT'\n\s*\? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'\n\s*: 'text-slate-400 hover:text-white'/g, `transferViewMode === 'CHAT'\n                    ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'\n                    : 'text-white hover:text-slate-200'`);
// Also fix Classic Form tab
content = content.replace(/transferViewMode === 'FORM'\n\s*\? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'\n\s*: 'text-slate-400 hover:text-white'/g, `transferViewMode === 'FORM'\n                    ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'\n                    : 'text-white hover:text-slate-200'`);
// Fix the icon color inside Saathi button (was text-teal-400)
content = content.replace(/<Bot className="w-4 h-4 text-teal-400" \/>/g, '<Bot className="w-4 h-4" />');
// If it was w-3.5 h-3.5
content = content.replace(/<Bot className="w-3\.5 h-3\.5 text-teal-400" \/>/g, '<Bot className="w-4 h-4" />');
content = content.replace(/<FileText className="w-3\.5 h-3\.5" \/>/g, '<FileText className="w-4 h-4" />');

// Make the username field required too
content = content.replace(/<input \n\s*type="text" \n\s*value=\{authFormUser\}\n\s*onChange=\{\(e\) => setAuthFormUser\(e\.target\.value\)\}\n\s*className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" \n\s*placeholder="Enter username" \n\s*\/>/, `<input \n                type="text" \n                value={authFormUser}\n                onChange={(e) => setAuthFormUser(e.target.value)}\n                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" \n                placeholder="Enter username" \n                required \n              />`);


fs.writeFileSync(filePath, content, 'utf8');
console.log("Reverted the state accurately.");
