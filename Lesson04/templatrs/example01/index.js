const express = require('express');
const app = express();

const articles = [
    { title: 'Articles 1', description: 'First Article'},
    { title: 'Articles 2', description: 'Second Article'},
    { title: 'Articles 3', description: 'Third Article'}
];

app.get('/', (req, res) => {
    let html = '<h1>Article list</h1>';

    for (const articleData of articles) {
        html += '<h2>' + articleData.title + '</h2>';
        html += '<p>' + articleData.description + '</p>';
    }

    res.send(html);
});

app.listen(8080);