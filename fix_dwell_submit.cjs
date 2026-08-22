const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/DwellButton.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\/\/ Trigger action\n\s*if \(onClick\) onClick\(e\);/;
const replacement = `// Trigger action
        if (onClick) {
          onClick(e);
        } else if (type === 'submit') {
          // Find the closest form and trigger a native submit
          const form = e.target.closest('form');
          if (form) {
            form.requestSubmit();
          }
        }`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Patched DwellButton for native form submission");
