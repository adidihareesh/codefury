const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/OcrUploader.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the demo bypass and old heuristic with the robust generic one
const matchRegex = /\/\/ --- HACKATHON DEMO MAGIC ---[\s\S]*?finalName = finalName\.replace[^;]+;/;
const newMatchLogic = `
        // Better Name Heuristic
        let finalName = '';
        const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 2);
        
        let dobIndex = lines.findIndex(l => l.match(/(DOB|YOB|Year|Birth|Date)/i));
        
        if (dobIndex > 0) {
           // Tesseract 'eng' will read local scripts (Hindi/Kannada) as garbage.
           // When we strip non-English chars, the line might become empty.
           // If it does, we look one line higher.
           let potentialName = lines[dobIndex - 1].replace(/[^a-zA-Z\\s]/g, '').trim();
           if (potentialName.length < 3 && dobIndex > 1) {
              potentialName = lines[dobIndex - 2].replace(/[^a-zA-Z\\s]/g, '').trim();
           }
           if (potentialName.length >= 3) {
              finalName = potentialName;
           }
        }

        if (!finalName) {
           // Fallback: Look for the first line that looks like a name (no numbers, right length, no common keywords)
           const possibleNames = lines.filter(l => 
             !l.match(/\\d/) && 
             l.split(/\\s+/).length >= 2 && 
             l.split(/\\s+/).length <= 4 &&
             !l.match(/(Government|India|Aadhaar|Father|Mother|Address|Male|Female|Gender|Issue|Download)/i)
           );
           if (possibleNames.length > 0) {
             finalName = possibleNames[0].replace(/[^a-zA-Z\\s]/g, '').trim();
           }
        }
`;

content = content.replace(matchRegex, newMatchLogic);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched generic OCR");
