const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/useState\(120\); \/\/ 120s base/g, 'useState(180); // 180s base');
content = content.replace(/Extends gap from 2 mins \(120s\)/g, 'Extends gap from 3 mins (180s)');
content = content.replace(/return 120; \/\/ Base 2 minutes/g, 'return 180; // Base 3 minutes');
content = content.replace(/Math\.max\(120, finalRemaining\)/g, 'Math.max(180, finalRemaining)');
content = content.replace(/expires in 120s/g, 'expires in 180s');
content = content.replace(/setTimeRemaining\(120\)/g, 'setTimeRemaining(180)');
content = content.replace(/setAllocatedBudgetSeconds\(120\)/g, 'setAllocatedBudgetSeconds(180)');
content = content.replace(/\(\(120 - timeRemaining\) \/ 120\)/g, '((180 - timeRemaining) / 180)');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched session timeout to 3 minutes");
