const http = require('http');
http.createServer((req, res) => {
  if (req.url === '/__error' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      console.log('--- ERROR CAUGHT FROM BROWSER ---');
      console.log(body);
      console.log('---------------------------------');
      res.end('ok');
    });
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end();
  }
}).listen(5175, () => console.log('Error server listening on 5175'));
