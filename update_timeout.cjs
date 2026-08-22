const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update state declarations
content = content.replace("useState(60); // 60s base", "useState(120); // 120s base");
content = content.replace("setTimeRemaining(60);", "setTimeRemaining(120);");
content = content.replace("setAllocatedBudgetSeconds(60);", "setAllocatedBudgetSeconds(120);");

// Update comments/text in code
content = content.replace("Extends gap from 1 min (60s) directly to 5 mins (300s)", "Extends gap from 2 mins (120s) directly to 5 mins (300s)");
content = content.replace("return 60; // Base 1 minute", "return 120; // Base 2 minutes");
content = content.replace("return Math.max(60, finalRemaining);", "return Math.max(120, finalRemaining);");
content = content.replace("expires in 60s and flags as fraud", "expires in 120s and flags as fraud");
content = content.replace("Math.min(100, ((60 - timeRemaining) / 60) * 100)", "Math.min(100, ((120 - timeRemaining) / 120) * 100)");

// Text UI strings
content = content.replace("1-Minute Base", "2-Minute Base");
content = content.replace("Base 1 minute", "Base 2 minutes");
content = content.replace("1:00 Base", "2:00 Base");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated timeout logic");
