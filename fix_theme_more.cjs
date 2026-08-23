const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const additionalOverrides = `
  /* Fix Navigation Accessibility Button */
  .text-textInverse { color: #3A2E3D !important; }
  .text-slate-800 { color: #2B212E !important; }
  
  /* Fix Home.jsx Overview Grid Boxes */
  .bg-slate-950\\/70 { background-color: #FAF5F0 !important; }
  .bg-slate-900\\/50 { background-color: #FFFFFF !important; }
  
  /* Make sure background for Home buttons looks right */
  .bg-slate-950 { background-color: #FAF5F0 !important; }
  
  /* Specific override for any text-slate-200 to be very visible */
  .text-slate-200 { color: #2B212E !important; font-weight: bold !important; }
`;

if (!cssContent.includes('Fix Navigation Accessibility Button')) {
  // Insert right before the last closing brace of the @layer utilities block
  cssContent = cssContent.replace('}\n\n', additionalOverrides + '\n}\n\n');
  fs.writeFileSync(cssPath, cssContent, 'utf8');
}

console.log("Applied additional theme fixes for Home.jsx and Navigation!");
