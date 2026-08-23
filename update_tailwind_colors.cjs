const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'tailwind.config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

const colorOverrides = `
        // Soft Lavender, Warm Beige, Muted Peach Overrides
        white: '#3D3546', // Inverted: Dark Espresso/Plum for text on buttons and dark cards
        black: '#F9F6F0', // Inverted: Warm Beige
        slate: {
          50: '#2A2432',  // Darkest Plum
          100: '#3D3546', // Main Text (was lightest) -> Dark Espresso/Plum
          200: '#4F455A',
          300: '#625C70', // Regular Text -> Deep Lavender
          400: '#8A8498', // Muted Text -> Soft Lavender
          500: '#AAA2B6',
          600: '#C7C0C7', // Borders
          700: '#D5CDD4', 
          800: '#E6DFD3', // Elevated elements -> Muted Taupe
          900: '#F1EBE1', // Cards (was dark) -> Richer Warm Beige
          950: '#F9F6F0', // Main Background (was darkest) -> Soft Warm Beige
        },
        teal: {
          50: '#54362E',  // Darkest Peach-Brown
          100: '#75493F',
          200: '#9E6558',
          300: '#B87869', // Accent Text (was light) -> Rich Peach/Terracotta
          400: '#CD8B7C', 
          500: '#DFA290', // Accent elements
          600: '#E9B3A4', // Main Buttons (was primary dark teal) -> Muted Pastel Peach
          700: '#F0C4B8',
          800: '#F6D9D2',
          900: '#FBF0ED', // Lightest Peach background
          950: '#FEF8F7',
        },
`;

configContent = configContent.replace(/colors: \{/, 'colors: {' + colorOverrides);

fs.writeFileSync(configPath, configContent, 'utf8');
console.log("Updated tailwind.config.js with warm beige/lavender/peach theme!");
