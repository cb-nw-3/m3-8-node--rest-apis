"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// route imports
const handleClients = require("./handlers/clients");
const handleClientsByEmail = require("./handlers/clientsByEmail");
const handleWords = require("./handlers/words");
const handleGuess = require("./handlers/guess");
// constants
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
  .get("/clients", handleClients)
  .get("/client/:email", handleClientsByEmail)
  .get("/hangman/words", handleWords)
  .get("/hangman/guess/:wordId/:letter", handleGuess)

  // endpoints

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
