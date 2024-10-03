const http = require ('http');
const fs = require('fs');
const DATA = 'items.json';
const data = fs.readFileSync(DATA, 'utf-8');
const items = JSON.parse(data);
 
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello, Node.js!\n');
 
    if (req.method === 'GET' && req.url === '/items') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));
       
   
    } else {
        res.statusCode = 404 ;
        res.end(JSON.stringify({message: 'Page not found'}))
    }
 
});

if (req.method === 'POST' && req.url === '/items') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      items.push(newItem);
      fs.writeFileSync('items.json', JSON.stringify(items));
      res.writeHead(201);
      res.end(JSON.stringify(newItem));
    });
  }

  else {
    res.statusCode = 404 ;
    res.end(JSON.stringify({message: 'Page not found'}))
}
  
 
 
server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000');
});

