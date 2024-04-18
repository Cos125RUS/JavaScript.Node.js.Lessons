'use strict'

const express = require('express');
const Joi = require('joi');

const app = express();

let id = 0;
const articles = [];

const articleScheme = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(10).required()
});

const idScheme = Joi.object({
    id: Joi.number().required()
});

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date(Date.now())}`);
    next();
});

app.get('/articles', (req, res) => {
    res.send({ articles });
})

app.get('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

    const article = articles.find(article => article.id === Number(req.params.id));
    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

app.post('/articles', (req, res) => {
    const articleValidationResult = articleScheme.validate(req.body);
    if (articleValidationResult.error) {
        return res.status(400).send(articleValidationResult.error.details);
    }

    id++;
    const article = { id: id, ...req.body };
    console.log(article);
    articles.push(article);
    res.status(201);
    res.send(article);
});

app.put('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

    const articleValidationResult = articleScheme.validate(req.body);
    if (articleValidationResult.error) {
        return res.status(400).send(articleValidationResult.error.details);
    }

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

app.delete('/articles/:id', (req, res) => {
    const idValidationResult = idScheme.validate(req.params);
    if (idValidationResult.error) {
        return res.status(400).send(idValidationResult.error.details);
    }

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
