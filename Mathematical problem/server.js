const bodyParser = require('body-parser');
const express = require('express')
const chunk = require('lodash.chunk');
const functions = require('./functions');

const app = express();

app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    const { body: { input, splitter } } = req;
    const matrix = chunk(input, splitter);
    const result = functions.findMaxSum(matrix);
    return res.json(result);
})

app.listen(8888, () => console.log('Math Server listening on 8888'));
