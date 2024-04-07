const http = require('http');
const server = http.createServer((req, res) => console.log('New request'));
const port = 3000;
server.listen(port, () => console.log(`Server start and listen port: ${port}`));