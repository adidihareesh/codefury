const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Button
const buttonRegex = /<button[\s\S]*?onClick=\{\(e\) => \{ e\.preventDefault\(\); e\.stopPropagation\(\); setIsQrScannerOpen\(true\); \}\}[\s\S]*?<QrCode className="w-5 h-5" \/>\n\s*<\/button>/;
content = content.replace(buttonRegex, '');

// 2. Remove Component 
const componentRegex = /\{isQrScannerOpen && \([\s\S]*?<\/MobileQrScanner>\n\s*\)\}/;
content = content.replace(componentRegex, '');

// 3. Remove State
const stateRegex = /const \[isQrScannerOpen, setIsQrScannerOpen\] = useState\(false\);[\s\S]*?\}\n\s*\};/;
content = content.replace(stateRegex, '');

// 4. Remove imports
content = content.replace("import MobileQrScanner from '../components/MobileQrScanner';\n", "");
content = content.replace("import { QrCode } from 'lucide-react';\n", "");

// Restore div flex
content = content.replace('<div className="shrink-0 mb-1 flex items-center">', '<div className="shrink-0 mb-1">');


fs.writeFileSync(filePath, content, 'utf8');
console.log("Reverted QR Scanner from TrustLayer");
