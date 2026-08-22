const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

const script = `
    <script>
      window.addEventListener('error', function(e) {
        fetch('http://localhost:5174/__error', {
          method: 'POST',
          body: e.error ? e.error.stack : e.message
        });
      });
    </script>
`;
if (!content.includes('__error')) {
  content = content.replace('</head>', script + '\n</head>');
  fs.writeFileSync(htmlPath, content, 'utf8');
}
