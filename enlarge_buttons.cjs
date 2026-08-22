const fs = require('fs');
const path = require('path');

// 1. AccessibilityMenu Button
const accessPath = path.join(__dirname, 'src/components/AccessibilityMenu.jsx');
let accessContent = fs.readFileSync(accessPath, 'utf8');
accessContent = accessContent.replace(
  /className=\{`px-3 py-1\.5 rounded-2xl text-xs font-bold flex items-center gap-2/g,
  "className={`px-5 py-2.5 rounded-2xl text-sm font-extrabold flex items-center gap-2"
);
fs.writeFileSync(accessPath, accessContent, 'utf8');

// 2. TrustLayer View Mode Switcher
const tlPath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let tlContent = fs.readFileSync(tlPath, 'utf8');
tlContent = tlContent.replace(
  /px-3 py-1\.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1\.5 font-sans/g,
  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 font-sans"
);
tlContent = tlContent.replace(
  /px-3 py-1\.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1\.5 font-sans/g,
  "px-6 py-3 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 font-sans"
);
fs.writeFileSync(tlPath, tlContent, 'utf8');

// 3. Navigation
const navPath = path.join(__dirname, 'src/components/Navigation.jsx');
let navContent = fs.readFileSync(navPath, 'utf8');
navContent = navContent.replace(
  /px-3 py-1\.5 rounded-xl text-xs font-medium/g,
  "px-4 py-2 rounded-xl text-sm font-medium"
);
navContent = navContent.replace(
  /px-3 py-1\.5 rounded-xl text-xs font-semibold/g,
  "px-4 py-2 rounded-xl text-sm font-semibold"
);
fs.writeFileSync(navPath, navContent, 'utf8');

// 4. Proceed to Pay Dwell Button is already quite large based on the screenshot, 
// let's bump it up just a bit in DwellButton.jsx
const dwellPath = path.join(__dirname, 'src/components/DwellButton.jsx');
let dwellContent = fs.readFileSync(dwellPath, 'utf8');
dwellContent = dwellContent.replace(
  /'py-4 px-7 text-sm sm:text-base font-bold rounded-2xl/g,
  "'py-5 px-8 text-base sm:text-lg font-extrabold rounded-2xl"
);
fs.writeFileSync(dwellPath, dwellContent, 'utf8');

console.log("Enlarged all buttons");
