"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { clients } = require("./data/clients");
const { wordObjectsArray } = require("./data/wordBank");
const { masterKey } = require("./masterKey");

// console.log(wordObjectsArray[42]);

const handleUserRequest = (req, res) => {
  console.log("req.body: ", req.body);
  const { userId } = req.body;

  let requestedUser = clients.find((user) => user.id === userId);

  if (requestedUser) {
    res.status(200).send({ status: "success", user: requestedUser });
  } else {
    res.status(400).send({ status: "error", error: "not found" });
  }
};

const PORT = process.env.PORT || 8000;

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
  .post("/getUser", handleUserRequest)

  .get("/hangman/words/", (req, res) => {
    let randomIndex = Math.floor(
      Math.random() * Math.floor(wordObjectsArray.length)
    );
    let word = wordObjectsArray[randomIndex];

    res.status(200).send({ id: word.id, letterCount: word.letterCount });
  })

  .get("/hangman/words/:wordId/:key", (req, res) => {
    let key = req.params.key;
    let wordId = req.params.wordId;

    let word = wordObjectsArray[wordId];
    if (key === masterKey) {
      res.status(200).send({ word });
    } else {
      res.status(400).send({ error: "not authorised" });
    }
  })

  .get("/hangman/guess/:wordID/:letter", (req, res) => {
    let wordId = req.params.wordID;
    let letter = req.params.letter;

    if (letter.length !== 1) {
      res.status(400).send({ status: "error", error: "bad input" });
    }

    let secretWord = wordObjectsArray.find(
      (item) => item.id === Number(wordId)
    );

    let wordArray = secretWord.word.split("");
    let letterPosition = wordArray.map((item) => {
      return item === letter;
    });
    //console.log(letter);
    if (secretWord.word.includes(letter)) {
      res
        .status(200)
        .send({ status: "included", letterPosition: letterPosition });
    } else {
      res
        .status(200)
        .send({ status: "not included", letterPosition: letterPosition });
    }
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
