const fs = require('fs');
const path = require('path');

const trustPath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let trustContent = fs.readFileSync(trustPath, 'utf8');

trustContent = trustContent.replace(
  "'text-amber-400' : 'text-teal-300'",
  "'text-amber-600' : 'text-teal-600'"
);

trustContent = trustContent.replace(
  "'text-teal-400'",
  "'text-teal-700'"
);

trustContent = trustContent.replace(
  "'text-red-400'",
  "'text-red-600'"
);

trustContent = trustContent.replace(
  "'text-emerald-400'",
  "'text-emerald-600'"
);

fs.writeFileSync(trustPath, trustContent, 'utf8');
console.log("Fixed TrustLayer Live Inspector text again");
