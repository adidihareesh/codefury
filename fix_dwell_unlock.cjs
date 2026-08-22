const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/DwellButton.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const startHold = \(e\) => \{/;
const replacement = `const startHold = (e) => {
    // UNLOCK WEB SPEECH API SYNCHRONOUSLY ON FIRST HOLD
    if ('speechSynthesis' in window && window.speechSynthesis.paused === false) {
      const unlock = new SpeechSynthesisUtterance('');
      unlock.volume = 0;
      window.speechSynthesis.speak(unlock);
    }
`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Injected synchronous unlock into DwellButton.");
