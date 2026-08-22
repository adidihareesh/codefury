const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/TrustLayer.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add import
if (!content.includes('import ErrorBoundary')) {
    content = content.replace("import SaathiChatAssistant from '../components/SaathiChatAssistant';", "import SaathiChatAssistant from '../components/SaathiChatAssistant';\nimport ErrorBoundary from '../components/ErrorBoundary';");
}

// Wrap SaathiChatAssistant
const saathiUsageRegex = /<SaathiChatAssistant[\s\S]*?onResetSession=\{resetSession\}\n\s*\/>/g;
content = content.replace(saathiUsageRegex, (match) => {
    return `<ErrorBoundary>\n            ${match}\n          </ErrorBoundary>`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log("Wrapped Saathi with ErrorBoundary");
