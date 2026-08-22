const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/SaathiChatAssistant.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix timestamp contrast
content = content.replace(
  "msg.sender === 'user' ? 'text-accent justify-end' : 'text-slate-500'",
  "msg.sender === 'user' ? 'text-textInverse opacity-75 justify-end' : 'text-slate-500'"
);

// Fix CheckCircle2 contrast
content = content.replace(
  "{msg.sender === 'user' && <CheckCircle2 className=\"w-3 h-3 text-accent\" />}",
  "{msg.sender === 'user' && <CheckCircle2 className=\"w-3 h-3 text-textInverse opacity-75\" />}"
);

// Check if input background needs better contrast
content = content.replace(
  "className=\"flex-1 bg-bgPrimary border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-textPrimary focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent outline-none transition-all disabled:opacity-50 font-sans\"",
  "className=\"flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-textPrimary focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent outline-none transition-all disabled:bg-slate-100 disabled:opacity-60 font-sans shadow-inner\""
);

// Make the send button stand out more
content = content.replace(
  "className=\"p-3 rounded-2xl bg-accent hover:brightness-90 text-textInverse font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-accent active:scale-95 flex items-center justify-center\"",
  "className=\"p-3 rounded-2xl bg-success hover:brightness-90 text-white font-bold transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-success active:scale-95 flex items-center justify-center\""
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed Saathi contrast");
