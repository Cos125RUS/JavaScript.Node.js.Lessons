'use strict'

const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const articles = [
    { title: 'Articles 1', description: 'First Article' },
    { title: 'Articles 2', description: 'Second Article' },
    { title: 'Articles 3', description: 'Third Article' }
];

app.get('/', (req, res) => {
    res.render('home', { layout: 'index', title: 'Home', articles });
});

app.listen(8080);