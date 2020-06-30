'use strict';

// server config

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

// other config

const { wordData } = require('./data/data.js');

// handlers

// this handler is supposed to return an object containing
// the id of a random word found in the wordData array, as
// well as its length.

const wordPicker = (req, res) => {
    let rando = Math.floor(Math.random() * wordData.length + 1);
    let returnObj = {
        "id": wordData[rando]["id"],
        "length": wordData[rando]["letterCount"]
    }
    res.send(returnObj);
}

// ok. this needs to return a couple of things. First, a status code.
// One presumes that if the word does not contain the letter, it should be a 404.
// but if it is in the word, we need to return an array of booleans
// corresponding to the letter provided. That's gonna be interesting.

const wordGuesser = (req, res) => {
    let wordId = Number(req.params.wordId);
    let letter = req.params.letter;

    let relevantWord = (wordData.find(item => item.id === wordId)).word;

    let boolArray = [];

    // there's got to be a more elegant way to write this.

    relevantWord.split('').forEach(item => {
        if (item === letter) {
            boolArray.push(true);
        } else {
            boolArray.push(false);
        }
    });

    console.log(boolArray);

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

    .get('/hangman/words', wordPicker)
    .get('/hangman/guess/:wordId/:letter', wordGuesser)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));