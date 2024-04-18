'use strict'

const express = require('express');

const app = express();
app.use(express.json());

let id = 2;
const articles = [
    { id: 1, title: 'New Article', content: 'Some long text' },
    { id: 2, title: 'New Article', content: 'Some long text' }
];

app.use((req, res, next) => {
    console.log(`${new Date(Date.now())} ${req.method} ${req.url}`);
    next();
});

app.get('/articles', (req, res) => {
    res.send({ articles });
});

app.post('/articles', (req, res) => {
    id++;
    const article = { id: id, ...req.body };
    console.log(article);
    articles.push(article);
    res.status(201);
    res.send(article);
});

app.get('/articles/:id', (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.put('/articles/:id', (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.delete('/articles/:id', (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        articles.splice(articles.indexOf(article), 1);
        res.status(204);
        res.send();
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.listen(8080, () => console.log("Started"));