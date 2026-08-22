const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tailwind.config.js');
let content = fs.readFileSync(filePath, 'utf8');

// The first colors object is around line 10, the second around line 27.
// We can just merge them.
content = content.replace(
  "accentBg: 'var(--color-accent-bg)',\n      },",
  "accentBg: 'var(--color-accent-bg)',\n        fintech: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' }\n      },"
);

content = content.replace(/colors: \{\s*fintech: \{[\s\S]*?\}\s*\},/, "");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed tailwind.config.js");
