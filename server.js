"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const handleWords = require("./handlers/words");
const handleGuess = require("./handlers/guess");

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
  .get("/hangman/words", handleWords)
  .get("/hangman/guess/:wordId/:letter", handleGuess)

  // endpoints

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
