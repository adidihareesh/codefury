const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/OcrUploader.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace handleFileUpload
const regex = /const handleFileUpload = async \(e\) => \{[\s\S]*?reader\.readAsDataURL\(file\);\n\s*\};/g;

const newImplementation = `const rotateImage90Degrees = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.height;
        canvas.height = img.width;
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        resolve(canvas.toDataURL());
      };
      img.src = src;
    });
  };

  const processImageWithRetry = async (imgSrc, attempt) => {
    try {
        if (attempt > 1) {
           setStatusText('Rotating and retrying...');
           setProgress(0);
        }
        
        const result = await Tesseract.recognize(
          imgSrc,
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
        
        let dobIndex = lines.findIndex(l => l.match(/(DOB|YOB|Year|Birth|Date)/i));
        
        if (dobIndex > 0) {
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

        const aadhaarMatch = text.match(/\\d{4}\\s?\\d{4}\\s?\\d{4}/);
        if (aadhaarMatch) {
           finalAadhaar = aadhaarMatch[0].replace(/\\s/g, '');
        } else if (text.replace(/\\D/g, '').length >= 12) {
           finalAadhaar = text.replace(/\\D/g, '').match(/\\d{12}/)?.[0] || text.replace(/\\D/g, '').substring(0, 12);
        }

        // If it's completely unreadable (like when rotated), fail so we can trigger a retry
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
      if (attempt === 1) {
         // First attempt failed, automatically try rotating 90 degrees!
         const rotatedSrc = await rotateImage90Degrees(imgSrc);
         setPreviewImage(rotatedSrc); // Update UI so user sees the rotation
         await processImageWithRetry(rotatedSrc, 2);
      } else {
         console.error(err);
         setErrorState(true);
         setIsProcessing(false);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorState(false);
    setProgress(0);
    setIsProcessing(true);
    setStatusText('Reading document...');

    const reader = new FileReader();
    reader.onload = async () => {
      setPreviewImage(reader.result);
      await processImageWithRetry(reader.result, 1);
    };
    reader.readAsDataURL(file);
  };`;

content = content.replace(regex, newImplementation);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Implemented auto-rotation");
