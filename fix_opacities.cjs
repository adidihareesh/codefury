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

walkSync(srcDir, (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Fix bg-accent text-accent -> bg-accentBg text-accent
  // We can do this with regex replacing classes in the same element. 
  // It's easier to just find the exact combinations that are problematic.
  content = content.replace(/bg-accent border border-accent text-accent/g, 'bg-accentBg border border-accent text-accent');
  content = content.replace(/bg-accent text-slate-950/g, 'bg-accent text-textInverse');
  content = content.replace(/bg-accent text-accent hover:bg-accent/g, 'bg-accent text-textInverse hover:brightness-90');
  
  // Fix DummyBank
  content = content.replace(/bg-danger text-danger/g, 'bg-dangerBg text-danger');
  content = content.replace(/bg-success text-success/g, 'bg-successBg text-success');
  
  // Fix TrustLayer
  content = content.replace(/bg-accent text-accent/g, 'bg-accentBg text-accent');
  content = content.replace(/bg-danger text-danger/g, 'bg-dangerBg text-danger');

  fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Fixed transparent bg combinations");
