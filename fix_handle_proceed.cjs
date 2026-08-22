const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const handleAuthSubmit = \(e\) => \{/;
const replacement = `const handleProceed = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleAuthSubmit = (e) => {`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Added handleProceed");
