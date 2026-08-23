const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The unclosed block is at the end of !isAuthenticated
content = content.replace(
  '          </div>\n        </div>\n      </div>\n    );\n  }\n\n  \n  \n\n  return (',
  '          </div>\n        </div>\n      </div>\n    </div>\n    );\n  }\n\n  \n  \n\n  return ('
);

fs.writeFileSync(filePath, content, 'utf8');
