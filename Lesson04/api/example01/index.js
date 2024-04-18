const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>');
});

app.post('/', (req, res) => {
    console.log(req.body.text);
    res.send(req.body);
});

app.put('/:id', (req, res) => {
    console.log(Number(req.path.replace('/', '')));
    console.log(req.body.text);
    res.send(req.body);
});

app.delete('/:id', (req, res) => {
    console.log(Number(req.path.replace('/', '')));
    res.send('<p>Deleted</p>');
});

app.listen(8080, () => console.log('Started'));