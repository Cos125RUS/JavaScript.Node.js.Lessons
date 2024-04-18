'use strict'

const handlebars = require('handlebars');

const items = [
    { name: 'first item', number: 1 },
    { name: 'second item', number: 2 }
];

const template = handlebars.compile(
    '{{#each items}}<p>{{this.name}} {{this.number}}</p>{{/each}}'
);

console.log(template({items}));