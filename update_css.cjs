const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Insert variables into :root layer base
const cssVars = `
@layer base {
  :root {
    --color-text-primary: #1A1A2E;
    --color-bg-primary: #FAFAFA;
    --color-text-inverse: #FFFFFF;
    --color-bg-inverse: #1A1A2E;

    --color-danger: #E85D04;
    --color-danger-bg: #FFF3E8;
    
    --color-success: #0466C8;
    --color-success-bg: #E8F1FB;
    
    --color-warning: #FFB700;
    --color-warning-bg: #FFF8E1;

    --color-accent: #0466C8;
    --color-accent-bg: #E8F1FB;
  }

  .calm-mode {
    --color-bg-primary: #F4F1EC;
    --color-accent: #8D99AE;
    --color-accent-bg: #E8EBEF;
    --color-danger: #C97B63;
    --color-danger-bg: #F4E8E4;
    --color-success: #6B8F82;
    --color-success-bg: #E7EFEA;
    --color-warning: #D4A373;
    --color-warning-bg: #FAF3E6;
  }

  body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
  }
}
`;

if (!cssContent.includes('--color-text-primary')) {
  if (cssContent.includes('@tailwind utilities;')) {
    cssContent = cssContent.replace('@tailwind utilities;', '@tailwind utilities;\n' + cssVars);
  }
}
fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log("Updated index.css");

// Tailwind Config
const tailwindConfigPath = path.join(__dirname, 'tailwind.config.js');
let tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf8');

const colorsExt = `
      colors: {
        textPrimary: 'var(--color-text-primary)',
        bgPrimary: 'var(--color-bg-primary)',
        textInverse: 'var(--color-text-inverse)',
        bgInverse: 'var(--color-bg-inverse)',
        danger: 'var(--color-danger)',
        dangerBg: 'var(--color-danger-bg)',
        success: 'var(--color-success)',
        successBg: 'var(--color-success-bg)',
        warning: 'var(--color-warning)',
        warningBg: 'var(--color-warning-bg)',
        accent: 'var(--color-accent)',
        accentBg: 'var(--color-accent-bg)',
      },
`;

if (!tailwindContent.includes('textPrimary:')) {
  tailwindContent = tailwindContent.replace('extend: {', 'extend: {' + colorsExt);
}
fs.writeFileSync(tailwindConfigPath, tailwindContent, 'utf8');
console.log("Updated tailwind.config.js");

