'use strict'

const fs = require('fs');
const path = require('path');
const express = require('express');
const handlebars = require('handlebars');

const app = express();

const articles = [
    { title: 'Articles 1', description: 'First Article'},
    { title: 'Articles 2', description: 'Second Article'},
    { title: 'Articles 3', description: 'Third Article'}
];

app.get('/', (req, res) => {
    const pathToTemplate = path.join(__dirname, '/templates/home.handlebars');
    fs.readFile(pathToTemplate, 'utf8', (err,data) => {
        if (err) {
            res.status(500);
            res.send(err.message);
        } else {
            const template = handlebars.compile(data);
            res.send(template({articles}));
        }
    });
});

app.listen(8080);