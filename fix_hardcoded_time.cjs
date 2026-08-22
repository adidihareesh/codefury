const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix initial state
content = content.replace(/const \[timeRemaining, setTimeRemaining\] = useState\(60\);/, 'const [timeRemaining, setTimeRemaining] = useState(180);');

// Fix hardcoded UI strings
content = content.replace(/1:00 Base/g, '3:00 Base');
content = content.replace(/2:00 Base/g, '3:00 Base');
content = content.replace(/2-Minute Base/g, '3-Minute Base');
content = content.replace(/2 mins \(120s\)/g, '3 mins (180s)');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed hardcoded times");
