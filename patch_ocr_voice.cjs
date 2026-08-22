const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update the OcrUploader voice fallback prop to trigger a real voice mode mock
const voiceFallbackRegex = /onVoiceFallback=\{\(\) => \{\s*\/\/[^\n]*\n\s*alert\("Voice Fallback Activated:[^"]*"\);\s*\}\}/g;
const voiceFallbackReplacement = `onVoiceFallback={() => {
                     // Hand off to voice flow logic
                     alert("Saathi Voice Assistant activated: 'Hi! Let's fill this out together. What is your full name?'");
                     // We can mock filling it out after 3 seconds to demonstrate the flow
                     setTimeout(() => setAuthFormName("Rahul Sharma (Voice Detected)"), 2500);
                     setTimeout(() => setAuthFormDob("15/08/1985"), 4500);
                  }}`;

content = content.replace(voiceFallbackRegex, voiceFallbackReplacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched Voice Fallback");
