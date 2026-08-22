import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertTriangle, Mic } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function OcrUploader({ onExtract, onVoiceFallback }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const fileInputRef = useRef(null);

  const rotateImage90Degrees = (src) => {
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

        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
        
        let dobIndex = lines.findIndex(l => l.match(/(DOB|YOB|Year|Birth|Date)/i));
        
        if (dobIndex > 0) {
           let potentialName = lines[dobIndex - 1].replace(/[^a-zA-Z\s]/g, '').trim();
           if (potentialName.length < 3 && dobIndex > 1) {
              potentialName = lines[dobIndex - 2].replace(/[^a-zA-Z\s]/g, '').trim();
           }
           if (potentialName.length >= 3) {
              finalName = potentialName;
           }
        }

        if (!finalName) {
           const possibleNames = lines.filter(l => 
             !l.match(/\d/) && 
             l.split(/\s+/).length >= 2 && 
             l.split(/\s+/).length <= 4 &&
             !l.match(/(Government|India|Aadhaar|Father|Mother|Address|Male|Female|Gender|Issue|Download)/i)
           );
           if (possibleNames.length > 0) {
             finalName = possibleNames[0].replace(/[^a-zA-Z\s]/g, '').trim();
           }
        }

        const exactDob = text.match(/\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4}/);
        if (exactDob) {
           finalDob = exactDob[0].replace(/[\-\.]/g, '/');
        } else {
           const yearDob = text.match(/(?:YOB|Year|Birth).*?(\d{4})/i);
           if (yearDob) finalDob = "01/01/" + yearDob[1];
           else {
             const anyYear = text.match(/(19[5-9]\d|20[0-2]\d)/);
             if (anyYear) finalDob = "01/01/" + anyYear[0];
           }
        }

        const aadhaarMatch = text.match(/\d{4}\s?\d{4}\s?\d{4}/);
        if (aadhaarMatch) {
           finalAadhaar = aadhaarMatch[0].replace(/\s/g, '');
        } else if (text.replace(/\D/g, '').length >= 12) {
           finalAadhaar = text.replace(/\D/g, '').match(/\d{12}/)?.[0] || text.replace(/\D/g, '').substring(0, 12);
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
  };

  return (
    <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center transition-all hover:bg-slate-100 mb-6">
      <div className="mb-3 text-xs text-slate-500 font-medium px-2">
        Typing forms can be hard — upload a photo of your ID instead, whenever you're ready, no rush.
      </div>

      {!isProcessing && !errorState && (
        <div 
          className="cursor-pointer py-4 flex flex-col items-center justify-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-accent">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="font-bold text-accent">📎 Drop image here or click to browse</span>
          <span className="text-[10px] text-slate-400">JPG, PNG, HEIC</span>
        </div>
      )}

      {isProcessing && (
        <div className="py-4 flex flex-col items-center justify-center gap-3">
          {previewImage && (
            <img src={previewImage} alt="Document preview" className="h-20 object-contain rounded-lg border border-slate-200 mb-2 opacity-50" />
          )}
          <div className="w-full max-w-xs bg-slate-200 rounded-full h-2 mb-1 overflow-hidden">
            <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs font-bold text-accent animate-pulse">{statusText} {progress}%</span>
        </div>
      )}

      {errorState && (
        <div className="py-4 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 bg-dangerBg rounded-full flex items-center justify-center shadow-sm border border-danger text-danger">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-danger max-w-xs">
            We couldn't read the details clearly.
          </p>
          
          <div className="flex flex-col w-full gap-2 mt-2">
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 shadow-sm"
            >
              Try a different photo
            </button>
            <button 
              type="button" 
              onClick={onVoiceFallback}
              className="py-2.5 px-4 rounded-xl bg-accent hover:brightness-90 text-textInverse font-bold text-xs shadow-sm flex items-center justify-center gap-2"
            >
              <Mic className="w-4 h-4" />
              Prefer to just tell me instead?
            </button>
          </div>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}
