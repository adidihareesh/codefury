const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/OcrUploader.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const matchRegex = /let finalAadhaar[\s\S]*?name: finalName\n        \};/g;
const newMatchLogic = `
        // Better Name Heuristic
        let finalName = '';
        const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 2);
        
        let dobIndex = lines.findIndex(l => l.match(/(DOB|YOB|Year|Birth|Date)/i));
        if (dobIndex > 0) {
           finalName = lines[dobIndex - 1];
        }

        if (!finalName) {
           const possibleNames = lines.filter(l => 
             !l.match(/\\d/) && 
             l.split(/\\s+/).length >= 2 && 
             l.split(/\\s+/).length <= 4 &&
             !l.match(/(Government|India|Aadhaar|Father|Mother|Address|Male|Female|Gender)/i)
           );
           if (possibleNames.length > 0) {
             finalName = possibleNames[0];
           }
        }

        // Clean up Name
        finalName = finalName.replace(/[^a-zA-Z\\s]/g, '').trim();

        // Better DOB Heuristic
        let finalDob = '';
        const exactDob = text.match(/\\d{2}[\\/\\-\\.]\\d{2}[\\/\\-\\.]\\d{4}/);
        if (exactDob) {
           finalDob = exactDob[0].replace(/[\\-\\.]/g, '/');
        } else {
           const yearDob = text.match(/(?:YOB|Year|Birth).*?(\\d{4})/i);
           if (yearDob) finalDob = "01/01/" + yearDob[1];
           else {
             const anyYear = text.match(/(19[5-9]\\d|20[0-2]\\d)/);
             if (anyYear) finalDob = "01/01/" + anyYear[0];
           }
        }

        // Aadhaar
        let finalAadhaar = '';
        const aadhaarMatch = text.match(/\\d{4}\\s?\\d{4}\\s?\\d{4}/);
        if (aadhaarMatch) finalAadhaar = aadhaarMatch[0].replace(/\\s/g, '');
        else if (text.replace(/\\D/g, '').length >= 12) {
           finalAadhaar = text.replace(/\\D/g, '').match(/\\d{12}/)?.[0] || text.replace(/\\D/g, '').substring(0, 12);
        }

        // If it's completely unreadable, let it fail
        if (!finalAadhaar && !finalDob && !finalName) {
          throw new Error('No patterns matched');
        }

        const data = {
          aadhaar: finalAadhaar,
          dob: finalDob,
          name: finalName || 'Manual Entry Required'
        };`;

content = content.replace(matchRegex, newMatchLogic);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched OCR heuristics");
