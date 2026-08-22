const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/OcrUploader.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /try \{[\s\S]*?reader\.readAsDataURL\(file\);/g;

const newTryBlock = `try {
        const result = await Tesseract.recognize(
          reader.result,
          'eng',
          {
            logger: m => {
              if (m.status === 'recognizing text') {
                setProgress(Math.round(m.progress * 100));
              }
            }
          }
        );

        const text = result.data.text;
        
        let finalName = '';
        let finalDob = '';
        let finalAadhaar = '';

        const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 2);
        
        // 1. Name Heuristic
        let dobIndex = lines.findIndex(l => l.match(/(DOB|YOB|Year|Birth|Date)/i));
        
        if (dobIndex > 0) {
           // If the line right above DOB is empty after stripping non-English (e.g. Kannada text), look one line higher
           let potentialName = lines[dobIndex - 1].replace(/[^a-zA-Z\\s]/g, '').trim();
           if (potentialName.length < 3 && dobIndex > 1) {
              potentialName = lines[dobIndex - 2].replace(/[^a-zA-Z\\s]/g, '').trim();
           }
           if (potentialName.length >= 3) {
              finalName = potentialName;
           }
        }

        if (!finalName) {
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

        // 2. DOB Heuristic
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

        // 3. Aadhaar Heuristic
        const aadhaarMatch = text.match(/\\d{4}\\s?\\d{4}\\s?\\d{4}/);
        if (aadhaarMatch) {
           finalAadhaar = aadhaarMatch[0].replace(/\\s/g, '');
        } else if (text.replace(/\\D/g, '').length >= 12) {
           finalAadhaar = text.replace(/\\D/g, '').match(/\\d{12}/)?.[0] || text.replace(/\\D/g, '').substring(0, 12);
        }

        if (!finalAadhaar && !finalDob && !finalName) {
          throw new Error('No patterns matched');
        }

        const data = {
          aadhaar: finalAadhaar,
          dob: finalDob,
          name: finalName || 'Manual Entry Required'
        };

        onExtract(data);
        setIsProcessing(false);
      } catch (err) {
        console.error(err);
        setErrorState(true);
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);`;

content = content.replace(regex, newTryBlock);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Completely replaced OCR logic");
