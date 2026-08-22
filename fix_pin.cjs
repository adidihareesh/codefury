const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add authFormPin state
content = content.replace(
  "const [authFormPass, setAuthFormPass] = useState('');",
  "const [authFormPass, setAuthFormPass] = useState('');\n  const [authFormPin, setAuthFormPin] = useState('');"
);

// 2. Default accounts initialization
content = content.replace(
  "prefs: { language: 'en', isHighContrast: false, isSimplifyText: false, colorBlindness: 'none' }",
  "prefs: { language: 'en', isHighContrast: false, isSimplifyText: false, colorBlindness: 'none' },\n      upiPin: '1234'"
);

// 3. handleAuthSubmit logic to save the pin
content = content.replace(
  "setAccounts([...accounts, { username: authFormUser, password: authFormPass, prefs: newPrefs }]);",
  "setAccounts([...accounts, { username: authFormUser, password: authFormPass, upiPin: authFormPin || '1234', prefs: newPrefs }]);"
);

// 4. Update the sign out button to clear authFormPin
content = content.replace(
  "setAuthFormPass('');\n          }}",
  "setAuthFormPass('');\n            setAuthFormPin('');\n          }}"
);

// Also update it in other places
content = content.replace(/setAuthFormPass\(''\);\s*}}/g, "setAuthFormPass(''); setAuthFormPin(''); }}");

// 5. Update auth form rendering to include the PIN field in signup mode
const authFormSnippet = `              </div>
            </div>
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Create 4-Digit UPI PIN</label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={authFormPin}
                  onChange={(e) => setAuthFormPin(e.target.value.replace(/\\D/g, ''))}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono font-bold tracking-widest focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                  placeholder="e.g. 1234" 
                  required={authMode === 'signup'} 
                />
              </div>
            )}
            <button type="submit"`;
            
content = content.replace(
  `              </div>
            </div>
            <button type="submit"`,
  authFormSnippet
);

// 6. Fix handleTransfer to check against current user's PIN instead of actualOtp
const handleTransferOld = `    if (otp !== actualOtp) {`;
const handleTransferNew = `    const currentUserObj = accounts.find(acc => acc.username === currentUser);
    const expectedPin = currentUserObj ? currentUserObj.upiPin : '1234';
    if (otp !== expectedPin) {`;
content = content.replace(handleTransferOld, handleTransferNew);

// Write changes
fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated TrustLayer.jsx successfully");

