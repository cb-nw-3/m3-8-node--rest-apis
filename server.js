'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const clientsData = require('./data/clients.js');

const words = require('./data/words.js');

const PORT = process.env.PORT || 8000;
let words_array  = words.words;


const returnClientInfo = (req, res) => 
{
    // res.send(201)
    let clientName = req.params.name;
    let client = clientsData.clients.find(element => element.name == clientName);
    console.log(client);
    res.send(200, client);
}

const returnRandomWord = (req, res) => 
{
    // res.send(201)
    //console.log("test");
   // console.log(words_array);

    let word = words_array[Math.floor(Math.random() * words_array.length)];
    //console.log(word);

    res.send(200, {id:word.id, lettercount: word.letterCount});
}

const returnGuessResult = (req, res) => 
{
    // res.send(201)
    let wordID = Number(req.params.wordID);
    let letter = req.params.letter;

    console.log(wordID);
   // console.log(words_array);

    let word_from_array = words_array.find(element => element.id == wordID);

    console.log(word_from_array);


    if (word_from_array.word.includes(letter))
    {
        console.log("you guessed a letter in the word");
    }
    let single_word_array = word_from_array.word.split();

    console.log(single_word_array);
    let word_guesses = single_word_array.map(element => 
        {
            if (element === letter)
            {
                return true
            }
            else
            {
                return false
            }
        });




    res.send(200, {guess_array:word_guesses});
}



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
    .get('/clients/:name', returnClientInfo)
    .get('/hangman/words/', returnRandomWord)
    .get('/hangman/guess/:wordID/:letter', returnGuessResult)

    // endpoints

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));