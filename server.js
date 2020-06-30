'use strict';
const { clients } = require('./data/clients');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { wordBank } = require('./public/hangman/data');
const attempts = {
    numOfAttempts: 0
};

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
    .get('/hangman/words', (req,res) => {
            const ind = Math.floor(Math.random() * wordBank.length);
            const randomWord = {
                //word: wordBank[ind].word,
                id: wordBank[ind].id,
                letterCount: wordBank[ind].letterCount,
            };
            res.json(randomWord);
    })
    .get('/hangman/guess/:wordId/:letter', (req,res) => {
        if ( attempts.numOfAttempts === 5) {
            res.json({
                message: 'Game over'
            })
            return;
        } 
        let answerArray = [];
        let wordId = req.params.wordId;
        let letter = req.params.letter;
        let index = wordId -1
        console.log(wordBank[index]);
        console.log(wordId);
        if (wordId == wordBank[index].id) {
            console.log('good id');
            let chosenWord = wordBank[index].word;
            let wordArr = chosenWord.split('');
            answerArray.concat(wordArr);
            console.log(answerArray);
            if (letter == wordArr.find( letra => letra == letter)) {
                console.log('good letter');
                const trueFalseArray = wordArr.map(answer => {
                   return String(answer) === String(letter)
                });

                res.status(200).json({
                    message: 'Match',
                    answers: trueFalseArray
                })
                
            } else { 
                attempts.numOfAttempts = attempts.numOfAttempts + 1;
                res.status(200).json({
                message: 'No match!',
                
            })}
        } else { console.log('no good')}
        
    })
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));