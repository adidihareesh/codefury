const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix Auth Page Background (Soft Peach/Pink)
content = content.replace(
  '<div className="max-w-md mx-auto mt-12 px-4 py-8 font-sans">',
  '<div className="fixed inset-0 bg-[#FDF0EE] overflow-y-auto">\n      <div className="max-w-md mx-auto mt-12 px-4 py-8 font-sans relative z-10">'
);
// Make sure to close the new fixed div (search for the end of !isAuthenticated return block)
content = content.replace(
  '    </div>\n    );\n  }\n\n  // ===================================',
  '    </div>\n    </div>\n    );\n  }\n\n  // ==================================='
);

// Fix Live Inspector Dark Boxes
// From: bg-slate-900 border border-slate-800
// To: bg-white border border-slate-200
content = content.replace(
  'bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-2xl',
  'bg-white border border-slate-200 rounded-3xl p-5 text-slate-900 shadow-xl'
);
content = content.replace(
  'border-b border-slate-800 pb-3 mb-4',
  'border-b border-slate-200 pb-3 mb-4'
);

// Change text-white on the toggle button to text-slate-900
content = content.replace(
  'text-xs text-slate-400 hover:text-white underline',
  'text-xs text-slate-500 hover:text-slate-900 underline'
);

// Fix the metric boxes (4 of them)
// From: bg-slate-950/60 border border-slate-800/80
// To: bg-slate-50 border border-slate-200
content = content.replaceAll(
  'bg-slate-950/60 border border-slate-800/80',
  'bg-slate-50 border border-slate-200'
);

// Fix white text inside inspector
content = content.replaceAll(
  'text-white font-mono',
  'text-slate-900 font-mono'
);

// Also fix the Auth Wrapper if it wasn't replaced exactly
if (!content.includes('bg-[#FDF0EE]')) {
  console.log("Failed to inject peach background!");
} else {
  console.log("Injected peach background!");
}

fs.writeFileSync(filePath, content, 'utf8');
