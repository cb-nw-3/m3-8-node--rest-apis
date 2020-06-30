'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

//EXERCISE 2
//Search a client by ID
const { clients } = require('./data/clients');
const handleClient = (req, res) => {
    let clientID = req.params.id;

    let clientSelected = clients.find((client) => client.id === clientID);

    if (clientSelected) {
        res.status(200).send(clientSelected);
    } else {
        res.status(400).send({ status: 'error', error: 'not found' });
    }
}
//END EXERCISE 2

//EXERCISE 3
const { words } = require('./data/words');
const handleWord = (req, res) => {
    let randomValue = words[Math.floor(Math.random() * words.length)];

    let selectedWord = { id: randomValue.id, length: randomValue.letterCount };

    if (selectedWord) {
        res.status(200).send(selectedWord);
    } else {
        res.status(400).send({ status: 'error', error: 'not found' });
    }
}

const handleHangman = (req, res) => {
    let wordId = req.params.wordId;
    let letter = req.params.letter;

    //Find the word related to the ID
    let wordSelected = words.find((word) => word.id === wordId);

    //Letters position
    const lettersPosition = (word, letter) => {
        let lettersPosition = [];
        word.foreach((item) => {
            if (word[item] === letter) {
                lettersPosition.push(item);
            }
        })
        console.log(lettersPosition);
        return lettersPosition;
    };

    if (wordSelected != undefined) {
        if (wordSelected.word.includes(letter)) {
            res.status(200).send({
                status: 'sucess',
                message: `the letter ${letter} is included`,
                position: lettersPosition(wordSelected.word, letter),
            });
        } else {
            //Letter is not included in the selected word
            res.status(200).send({
                status: 'fail',
                message: `the letter ${letter} is NOT included`,
                position: 'none',
            });
        }
    } else {
        res.status(400).send({ status: 'error', error: 'ID was not found' });
    }
}

const handleAnswer = (req, res) => {
    console.log("getting here")
    let answer = words.find(word => word.id === req.params.id);

    if (answer) {
        res.status(200).send(answer);
    } else {
        res.status(400).send({ status: 'error', error: 'not found' });
    }
}

//END EXERCISE 3

express()
    .use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))

    // endpoints
    //EXERCISE 2
    .get('/client/:id', handleClient)

    //EXERCISE 3
    .get('/hangman/words', handleWord)

    .get('/hangman/guess/:wordId/:letter', handleHangman)
    .get('/hangman/answer/word/:id', handleAnswer)

    .get('*', (req, res) => {
        res.status(404).send('Error 404: Page not Found');
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));