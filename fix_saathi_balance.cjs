const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /if \(timerIntervalRef\.current\) clearInterval\(timerIntervalRef\.current\);\n\s*\}\}\n\s*\/>/;
const replacement = `if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                const transferAmount = parseFloat((details.amount || amount).toString().replace(/,/g, '')) || 0;
                setAccounts(prevAccounts => 
                  prevAccounts.map(acc => {
                    if (acc.username === currentUser) {
                      return { ...acc, balance: Math.max(0, (acc.balance || 124450.80) - transferAmount) };
                    }
                    return acc;
                  })
                );
              }}
            />`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched Saathi Chat balance deduction");
