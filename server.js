'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Routes imports
const handleWords = require('./handlers/words');
const handleGuess = require('./handlers/guess');

// Constants
const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .get('/hangman/words', handleWords) // Added endpoint for the hangman
  .get('/hangman/guess/:wordId/:letter', handleGuess) //Twp variables were added in the URL that can be used in express/
  // endpoints

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
