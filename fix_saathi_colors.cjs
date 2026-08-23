const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. User Message Bubble
content = content.replace(
  "'bg-accent text-textInverse rounded-tr-sm'",
  "'bg-[#E5F0FF] text-slate-900 border border-[#CCE0FF] rounded-tr-sm'"
);

// 2. Bot Avatar
content = content.replace(
  'bg-accent text-textInverse flex items-center justify-center shrink-0 shadow-sm mt-1',
  'bg-[#E5F0FF] text-[#0047AB] flex items-center justify-center shrink-0 shadow-sm mt-1 border border-[#CCE0FF]'
);

// 3. Bot Avatar in Typing Indicator
content = content.replace(
  'bg-accent text-textInverse flex items-center justify-center shrink-0 shadow-sm"',
  'bg-[#E5F0FF] text-[#0047AB] flex items-center justify-center shrink-0 shadow-sm border border-[#CCE0FF]"'
);

// 4. Send Button
content = content.replace(
  'bg-accent hover:brightness-90 text-textInverse font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-accent',
  'bg-[#E5F0FF] hover:bg-[#CCE0FF] text-[#0047AB] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm border border-[#CCE0FF]'
);

// 5. Dwell Button (Confirm & Send)
content = content.replace(
  'bg-accent hover:brightness-90 text-textInverse font-bold shadow-lg shadow-accent',
  'bg-[#E5F0FF] hover:bg-[#CCE0FF] text-[#0047AB] font-bold shadow-md border border-[#CCE0FF]'
);

// 6. Typing Indicator Dots
content = content.replaceAll(
  'bg-accent animate-bounce',
  'bg-[#80B3FF] animate-bounce'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Saathi UI to soft blue!");
