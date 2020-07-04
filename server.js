"use strict";

const clients = require("./data/clients");
const words = require("./data/words");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const getRandomWord = (arr) => {
  const randomId = Math.round(Math.random() * 10);
  let randomWordObj;

  arr.forEach((wordObj) => {
    if (Number(wordObj.id) === randomId) {
      randomWordObj = {
        id: wordObj.id,
        letterCount: wordObj.letterCount,
      };
    }
  });
  return randomWordObj;
};

const getLetterPosition = (id, letter) => {
  // First, find the word
  let randomWord;
  let lettersLeft;
  let result = [];

  words.forEach((word) => {
    if (word.id === id) {
      randomWord = word.word;
      lettersLeft = Number(word.letterCount);
    }
  });

  // Then, check if the letter is in the word and return the array
  if (randomWord.includes(letter)) {
    lettersLeft--;
    let index = randomWord.indexOf(letter);

    for (let i = 0; i < randomWord.length; i++) {
      if (i === index) {
        result.push(true);
      } else {
        result.push(false);
      }
    }
  } else {
    for (let i = 0; i < randomWord.length; i++) {
      result.push(false);
    }
  }
  return result;
};

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/client", (req, res) => {
    const foundClients = [];
    const queryParam = req.query;

    for (let i = 0; i < clients.length; i++) {
      if (
        queryParam.id === clients[i].id ||
        queryParam.isActive === clients[i].isActive ||
        queryParam.age === clients[i].age ||
        queryParam.name === clients[i].name ||
        queryParam.gender === clients[i].gender ||
        queryParam.company === clients[i].company ||
        queryParam.email === clients[i].email ||
        queryParam.phone === clients[i].phone ||
        queryParam.address === clients[i].address
      ) {
        foundClients.push(clients[i]);
      }
    }

    if (foundClients.length > 0) {
      res.json(foundClients);
    } else {
      res.send({ error: "Sorry, I could not find what you are looking for." });
    }
  })

  .get("/hangman/words/:wordId", (req, res) => {
    let specificWord;
    const providedId = req.params.wordId;
    words.forEach((word) => {
      specificWord = word;
      if (word.id === providedId) res.json(specificWord);
    });
  })

  .get("/hangman/words", (req, res) => {
    const wordObj = getRandomWord(words);
    res.status(200).json(wordObj);
  })

  .get("/hangman/guess/:wordId/:letter", (req, res) => {
    const id = req.params.wordId;
    const letter = req.params.letter;

    const letterPosition = getLetterPosition(id, letter);

    res.status(200).json(letterPosition);
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
