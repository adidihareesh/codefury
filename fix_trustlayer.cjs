const fs = require('fs');
let content = fs.readFileSync('src/pages/TrustLayer.jsx', 'utf8');

// Find 'import React' and delete everything before it
const idx = content.indexOf('import React');
if (idx > -1) {
    content = content.substring(idx);
}

fs.writeFileSync('src/pages/TrustLayer.jsx', content, 'utf8');
