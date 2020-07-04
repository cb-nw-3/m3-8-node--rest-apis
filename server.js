"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { wordObjectsArray } = require("./data/wordBank");
const { masterKey } = require("./masterKey");
const {
  handleUserRequest,
  handleRandomWordRequest,
  handleAdminWord,
  handlePlayerGuess,
} = require("./serverHandlers");

//console.log(wordObjectsArray[42]);

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

  .get("/hangman/words/", handleRandomWordRequest)

  .get("/hangman/words/:wordId/:key", handleAdminWord)

  .get("/hangman/guess/:wordId/:letter", handlePlayerGuess)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
