const fs = require('fs');
let content = fs.readFileSync('src/pages/TrustLayer.jsx', 'utf8');

const target = "setAccounts([...accounts, { username: authFormUser, password: authFormPass, upiPin: authFormPin || '1234', prefs: newPrefs }]);";
const replacement = `setAccounts([...accounts, { 
        username: authFormUser, 
        password: authFormPass, 
        upiPin: authFormPin || '1234', 
        name: authFormName,
        dob: authFormDob,
        phone: authFormPhone,
        prefs: newPrefs 
      }]);`;

content = content.replace(target, replacement);
fs.writeFileSync('src/pages/TrustLayer.jsx', content, 'utf8');
