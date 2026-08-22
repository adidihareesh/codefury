const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/context/AccessibilityContext.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /window\.speechSynthesis\.speak\(utterance\);\n\s*\/\/ Hack for some browsers that stall\n\s*if \(window\.speechSynthesis\.resume\) \{\n\s*window\.speechSynthesis\.resume\(\);\n\s*\}/;

const replacement = `// Chrome desktop bug workaround: slight delay after cancel()
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
        if (window.speechSynthesis.resume) {
          window.speechSynthesis.resume();
        }
      }, 50);`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched TTS for Chrome Desktop");
