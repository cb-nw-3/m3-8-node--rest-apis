'use strict';
const { clients } = require('./data/clients');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { wordBank } = require('./public/hangman/data');
/*const attempts = {
    numOfAttempts: 0
};*/

const PORT = process.env.PORT || 8000;
//Get a random word from my word bank in data.js
const randomWord = (req,res) => {
    const ind = Math.floor(Math.random() * wordBank.length);
    const randomWord = {
        //word: wordBank[ind].word,
        wordId: wordBank[ind].id,
        letterCount: wordBank[ind].letterCount,
    };
    res.json(randomWord);
};
//Determine if the letter is right from the chosen word 
//with all the checkpoints (more than 1 letter, goor or bad guess)

const isGoodGuess = (req,res) => {
    /*if ( attempts.numOfAttempts === 5) {
        res.json({
            message: 'Game over'
        })
        return;
    } */
    let { wordId, letter } = req.params;
    let wordObject = wordBank.find((object) => {
        return object.id === wordId;
    });
//create an array for the word, array for answers
    let wordArr = wordObject.word.split('');
    let answerArray = [];
//start with everything as false
    wordArr.map(() => {
        answerArray.push(false);
    });
//First check and response for FE
    if (letter.length > 1) {
        res.json({
            message: 'more than 1 letter'
        });
    }
//second check for only letters
    if (!isNaN(letter)) {
        res.json({ message: 'not a letter'})
    }
//third Check when good guess and  response for FE
    if (wordArr.includes(letter)) {
        wordArr.map((item,index) => {
            if (item === letter) {
                answerArray[index] = true;
            }
        });

        res.json({ 
            message:'Good Guess',
            array: answerArray,
            letter: letter
        });
    } else {
//fourth check when wrong guess and response for FE
        res.json({
            message: 'Wrong Guess',
            letter: letter
        });
    }
};

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

    // endpoints
    .get('/clients', (req,res) => {
        res.json(clients);
    })
    .post('/client', (req,res) => {
        console.log(req.body.name);
        
        const client = clients.find( client => client.name.includes(req.body.name));
        console.log(client);
        res.json(client);
    })
    //Example to use CURL + using POST : 
    //curl -d "{\"name\":\"Dunlap\"}" -H "Content-Type: application/json" http:/localhost:8000/clients/

    //Hangman endpoints
    .get('/hangman/words', randomWord)
    .get('/hangman/guess/:wordId/:letter', isGoodGuess)
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));