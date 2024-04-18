'use strict'

const express = require('express');
const { checkParams, checkBody } = require('./validation/validator');
const { articleScheme, idScheme } = require('./validation/scheme');

const app = express();

let id = 0;
const articles = [];

app.use(express.json());

/**
 * Логирование запросов
 */
app.use((req, res, next) => {
    const date = new Date(Date.now()).toISOString().replace('T', ' ').split('.')[0];
    console.log(`(${date}) ${req.method} ${req.url}`);
    next();
});

/**
 * Получить все статьи
 */
app.get('/articles', (req, res) => {
    res.send({ articles });
})

/**
 * Получить статью по id
 */
app.get('/articles/:id', checkParams(idScheme), (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

/**
 * Создать новую статью
 */
app.post('/articles', checkBody(articleScheme), (req, res) => {
    id++;
    const article = { id: id, ...req.body };
    console.log(article);
    articles.push(article);
    res.status(201);
    res.send(article);
});

/**
 * Обновить статью
 */
app.put('/articles/:id', checkParams(idScheme), checkBody(articleScheme), (req, res) => {
    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;
        console.log(article);
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

/**
 * Удалить статью
 */
app.delete('/articles/:id', checkParams(idScheme), (req, res) => {
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

/**
 * Обработка несуществующих роутов
 */
app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});

app.listen(8080, () => console.log("Started"));
