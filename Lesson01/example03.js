const http = require('http');
const server = http.createServer((req, res) => {
    console.log(`New request: ${req.url}`);
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Welcome!</h1>');
    } else if(req.url ==='/about'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>About</h1>');
    }
});
const port = 3000;
server.listen(port, () => console.log(`Server start and listen port: ${port}`));