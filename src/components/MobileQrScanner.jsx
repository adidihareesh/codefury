import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { X, QrCode } from 'lucide-react';

export default function MobileQrScanner({ onScan, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let stream = null;
    let requestAnimationId = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', true);
          videoRef.current.play();
          requestAnimationId = requestAnimationFrame(tick);
        }
      } catch (err) {
        console.error(err);
        setError('Unable to access camera. Please check permissions.');
      }
    };

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Tremor Accessibility: jsQR handles blurred/moving frames relatively well, 
        // we just continuously scan until ONE good frame parses successfully.
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        
        if (code && code.data) {
          onScan(code.data);
          return; // stop ticking
        }
      }
      requestAnimationId = requestAnimationFrame(tick);
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (requestAnimationId) {
        cancelAnimationFrame(requestAnimationId);
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center md:hidden">
      <div className="absolute top-4 right-4 z-50">
        <button type="button" onClick={onClose} className="p-3 bg-white/20 rounded-full text-white backdrop-blur-md">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="w-full max-w-sm px-6 text-center mb-8 relative z-10 mt-8">
        <h2 className="text-xl font-bold text-white mb-2">Scan QR Code</h2>
        <p className="text-sm text-slate-300 leading-relaxed">Point at a UPI QR Code. We'll automatically capture it even if your hands are shaking.</p>
      </div>
      <div className="relative w-full aspect-square max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/50 bg-slate-900 mx-auto px-4">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
            {error}
          </div>
        ) : (
          <video ref={videoRef} className="w-full h-full object-cover scale-110" />
        )}
        {/* Scanning reticle overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-2/3 h-2/3 border-2 border-white/50 rounded-xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-xl -mt-0.5 -ml-0.5"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-xl -mt-0.5 -mr-0.5"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-xl -mb-0.5 -ml-0.5"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-xl -mb-0.5 -mr-0.5"></div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
