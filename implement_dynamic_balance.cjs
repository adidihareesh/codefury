const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update initial state of accounts to include balance if it's the default
content = content.replace(
  /upiPin: '1234'\n\s*\}\];/,
  `upiPin: '1234',\n      balance: 124450.80\n    }];`
);

// 2. Add balance to new account in handleAuthSubmit
content = content.replace(
  /phone: authFormPhone,\n\s*prefs: newPrefs/,
  `phone: authFormPhone,\n        balance: Math.floor(Math.random() * (200000 - 50000 + 1) + 50000) + 0.80,\n        prefs: newPrefs`
);

// 3. Update handleTransfer to deduct balance
const transferSuccessRegex = /setTransferSuccess\(true\);\n\s*if \(timerIntervalRef\.current\) clearInterval\(timerIntervalRef\.current\);/;
const transferSuccessReplacement = `setTransferSuccess(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Deduct amount from balance
    const transferAmount = parseFloat(amount.toString().replace(/,/g, '')) || 0;
    setAccounts(prevAccounts => 
      prevAccounts.map(acc => {
        if (acc.username === currentUser) {
          return { ...acc, balance: Math.max(0, (acc.balance || 124450.80) - transferAmount) };
        }
        return acc;
      })
    );`;
content = content.replace(transferSuccessRegex, transferSuccessReplacement);

// 4. In render, format the balance
const balanceRenderRegex = /<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">\n\s*₹1,24,450<span className="text-teal-400 text-2xl font-semibold">\.80<\/span>\n\s*<\/div>/;

// We need to inject the variables into the render scope.
// We can just compute it directly inside the JSX since it's simple enough.
const newBalanceRender = `<div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                  ₹{Math.floor((accounts.find(a => a.username === currentUser)?.balance || 124450.80)).toLocaleString('en-IN')}<span className="text-teal-400 text-2xl font-semibold">{((accounts.find(a => a.username === currentUser)?.balance || 124450.80) % 1).toFixed(2).substring(1)}</span>
                </div>`;
                
content = content.replace(balanceRenderRegex, newBalanceRender);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Implemented dynamic balances");
