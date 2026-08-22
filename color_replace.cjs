const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkSync(filepath, callback);
    } else if (filepath.endsWith('.jsx')) {
      callback(filepath);
    }
  });
}

function replaceColors(content) {
  // Danger (Red -> Danger)
  content = content.replace(/(bg|text|border|ring|shadow)-red-[56789]00(\/[0-9]+)?/g, '$1-danger');
  content = content.replace(/(bg|text|border|ring)-red-[1234]00/g, '$1-danger');
  content = content.replace(/(bg|text|border|ring)-red-50/g, '$1-dangerBg');

  // Success / Accent (Teal/Emerald -> Accent/Success)
  content = content.replace(/(bg|text|border|ring|shadow)-teal-[56789]00(\/[0-9]+)?/g, '$1-accent');
  content = content.replace(/(bg|text|border|ring)-teal-[234]00/g, '$1-accent');
  content = content.replace(/(bg|text|border|ring)-teal-50/g, '$1-accentBg');
  content = content.replace(/(bg|text|border|ring)-teal-100/g, '$1-accentBg');

  content = content.replace(/(bg|text|border|ring|shadow)-emerald-[56789]00(\/[0-9]+)?/g, '$1-success');
  content = content.replace(/(bg|text|border|ring)-emerald-[234]00/g, '$1-success');
  content = content.replace(/(bg|text|border|ring)-emerald-50/g, '$1-successBg');
  content = content.replace(/(bg|text|border|ring)-emerald-100/g, '$1-successBg');

  // Warning (Amber/Yellow -> Warning)
  content = content.replace(/(bg|text|border|ring|shadow)-amber-[56789]00(\/[0-9]+)?/g, '$1-warning');
  content = content.replace(/(bg|text|border|ring)-amber-[234]00/g, '$1-warning');
  content = content.replace(/(bg|text|border|ring)-amber-50/g, '$1-warningBg');
  content = content.replace(/(bg|text|border|ring)-amber-100/g, '$1-warningBg');
  
  content = content.replace(/(bg|text|border|ring|shadow)-yellow-[56789]00(\/[0-9]+)?/g, '$1-warning');

  // Hovers
  content = content.replace(/hover:bg-red-[567]00/g, 'hover:brightness-90');
  content = content.replace(/hover:bg-teal-[567]00/g, 'hover:brightness-90');
  content = content.replace(/hover:bg-emerald-[567]00/g, 'hover:brightness-90');
  content = content.replace(/hover:bg-amber-[567]00/g, 'hover:brightness-90');
  
  // Specific classes that need textPrimary or bgPrimary instead of hardcoded white/black/slate
  // The user said: verify text/background combinations
  // I will replace bg-slate-50 with bg-bgPrimary
  content = content.replace(/bg-slate-50/g, 'bg-bgPrimary');
  
  // And replace text-slate-900 / text-slate-800 with text-textPrimary
  content = content.replace(/text-slate-900/g, 'text-textPrimary');
  content = content.replace(/text-slate-800/g, 'text-textPrimary');
  
  // Avoid text-gray-400 on white. We'll change text-slate-400 to text-slate-500
  content = content.replace(/text-slate-400/g, 'text-slate-500');

  return content;
}

walkSync(srcDir, (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let newContent = replaceColors(content);
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`Updated colors in ${path.basename(filepath)}`);
  }
});

console.log("Color replacement complete.");
