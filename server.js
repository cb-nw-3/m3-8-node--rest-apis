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
const handleWords = require("./handler/words");
const handleGuess = require("./handler/guess");

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
    .get("/hangman/words", handleWords)
    .get("/hangman/guess/:wordId/:letter", handleGuess)

    .get('*', (req, res) => {
        res.status(404).send('Error 404: Page not Found');
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));