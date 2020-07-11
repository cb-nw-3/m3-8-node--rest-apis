'use strict';

//Imports
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const handleWords = require('./handlers/handleWords');
const handleGuess = require('./handlers/handleGuess');
const handleHangman = require('./handlers/handleHangman');

const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .set('view engine', 'ejs')

    // endpoints
    .get('/hangman', handleHangman)
    .get('/hangman/words', handleWords)
    .get('/hangman/guess/:wordId/:letter', handleGuess)
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));