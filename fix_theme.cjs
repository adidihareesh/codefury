const fs = require('fs');
const path = require('path');

// 1. Revert tailwind.config.js to remove the buggy inverted scales
const configPath = path.join(__dirname, 'tailwind.config.js');
let configContent = fs.readFileSync(configPath, 'utf8');
configContent = configContent.replace(/\/\/ Soft Lavender[\s\S]*?950: '#FEF8F7',\n        \},/, '');
fs.writeFileSync(configPath, configContent, 'utf8');

// 2. Append precise utility overrides to index.css
const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const themeOverrides = `

/* ========================================================================= */
/* GLOBAL WARM LIGHT THEME OVERRIDES (NEURODIVERGENT ACCESSIBILITY) */
/* ========================================================================= */
@layer utilities {
  /* Backgrounds -> Soft Warm Beige & White */
  .bg-slate-950 { background-color: #FAF5F0 !important; }
  .bg-slate-900 { background-color: #FFFFFF !important; border: 1px solid #EBE3DB !important; }
  .bg-slate-800 { background-color: #F4EBE1 !important; }
  .bg-bgInverse { background-color: #FFFFFF !important; border-color: #EBE3DB !important; }
  
  /* Text -> Deep Plums and Lavenders instead of stark black/white */
  .text-white { color: #3A2E3D !important; }
  .text-slate-100 { color: #3A2E3D !important; }
  .text-slate-200 { color: #4B3E4F !important; }
  .text-slate-300 { color: #5D4F62 !important; }
  .text-slate-400 { color: #7A6C80 !important; }
  .text-slate-500 { color: #8F8196 !important; }
  .text-slate-900 { color: #2B212E !important; }
  .text-slate-700 { color: #4B3E4F !important; }
  
  /* Auth Card & Classic Forms */
  .bg-white { background-color: #FFFFFF !important; }
  
  /* Accents -> Soft Peaches and Warm Terracottas */
  .bg-teal-600 { background-color: #F2BBAF !important; color: #2B212E !important; }
  .hover\\:bg-teal-700:hover { background-color: #E8A89A !important; }
  .bg-teal-500 { background-color: #F6C8BE !important; color: #2B212E !important; }
  
  .text-teal-600 { color: #C26E5C !important; }
  .text-teal-500 { color: #D68675 !important; }
  .text-teal-400 { color: #E8A89A !important; }
  .text-teal-300 { color: #F2BBAF !important; }
  
  .border-slate-800 { border-color: #EBE3DB !important; }
  .border-slate-700 { border-color: #EBE3DB !important; }
  
  /* Fix opacity backgrounds */
  .bg-slate-900\\/90 { background-color: rgba(255, 255, 255, 0.95) !important; }
  .bg-teal-500\\/20 { background-color: rgba(242, 187, 175, 0.3) !important; }
}
`;

if (!cssContent.includes('GLOBAL WARM LIGHT THEME OVERRIDES')) {
  fs.writeFileSync(cssPath, cssContent + themeOverrides, 'utf8');
}

console.log("Applied absolute light warm theme via index.css overrides!");
