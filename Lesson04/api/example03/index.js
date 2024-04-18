'use strict'

const joi = require('joi');
const schema = joi.string().min(5).max(10).required();
const result = schema.validate('Hello, world');
console.log(result.error?.details);