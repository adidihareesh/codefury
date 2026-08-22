const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Import
content = content.replace(
  "import DwellButton from '../components/DwellButton';",
  "import DwellButton from '../components/DwellButton';\nimport MobileQrScanner from '../components/MobileQrScanner';\nimport { QrCode } from 'lucide-react';"
);

// 2. Add State and Handler
const stateInjectionPoint = "const [transferViewMode, setTransferViewMode] = useState('FORM');";
const stateCode = `const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const handleQrScan = (data) => {
    setIsQrScannerOpen(false);
    try {
      if (data.startsWith('upi://')) {
        const url = new URL(data);
        const pa = url.searchParams.get('pa');
        const am = url.searchParams.get('am');
        if (pa) setRecipient(pa);
        if (am) setAmount(am);
      } else {
        setRecipient(data);
      }
    } catch (e) {
      setRecipient(data);
    }
  };`;
content = content.replace(stateInjectionPoint, stateInjectionPoint + "\n  " + stateCode);

// 3. Add Component at the bottom
const endInjectionPoint = "</main>";
const componentCode = `{isQrScannerOpen && (
        <MobileQrScanner
          onScan={handleQrScan}
          onClose={() => setIsQrScannerOpen(false)}
        />
      )}`;
content = content.replace(endInjectionPoint, componentCode + "\n      " + endInjectionPoint);

// 4. Add QR Code button next to VoiceInputButton, making sure it only shows on mobile via md:hidden
const voiceInputPoint = `<VoiceInputButton
            onTranscript={(text) => setRecipient(text)}
            fieldLabel={t('recipientLabel')}
            className={isAdaptiveActive && isTrustLayerEnabled ? 'py-2 px-2 rounded-xl' : 'py-1.5 px-1.5 rounded-lg'}
          />`;
const qrButtonCode = `${voiceInputPoint}
          <button 
            type="button" 
            onClick={() => setIsQrScannerOpen(true)}
            className={\`md:hidden ml-2 \${isAdaptiveActive && isTrustLayerEnabled ? 'py-2 px-2 rounded-xl' : 'py-1.5 px-1.5 rounded-lg'} bg-accent text-white font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all\`}
          >
            <QrCode className="w-5 h-5" />
          </button>`;
content = content.replace(voiceInputPoint, qrButtonCode);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Added MobileQrScanner to TrustLayer");
