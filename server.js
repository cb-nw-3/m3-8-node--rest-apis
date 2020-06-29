'use strict';

// server config

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

// other config

const { wordData } = require('./data/data.js');

// handlers

const someHandler = () => {
    console.log("what");
}

const otherHandler = () => {
    console.log("bruh");
}

express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))

    // endpoints

    .get('/hangman/words', someHandler)
    .get('/hangman/guess/:wordId/:letter', otherHandler)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));