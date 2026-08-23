const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/AccessibilityMenu.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace bg-bgInverse on the toggles with bg-slate-200
content = content.replaceAll(
  "? 'bg-accent' : 'bg-bgInverse'",
  "? 'bg-teal-500' : 'bg-slate-200'"
);

// Note: I also changed bg-accent to bg-teal-500 so the ON state is peach/lavender instead of blue!

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed invisible toggle buttons in AccessibilityMenu");
