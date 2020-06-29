"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { words } = require("./words");

const PORT = process.env.PORT || 7000;

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

  .get("/", (req, res) => {
    res.send("hello!!");
  })
  .get("/hangman/words", (req, res) => {
    let random = Math.floor(Math.random() * words.length);
    res.send(`${words[random].id}`);
  })
  .get("/hangman/guess/:wordId/:letter", (req, res) => {
    let letter = req.params.letter;
    let id = req.params.wordId;
    let word = words[id].word.split("");
    let array = word.map((character) => {
      if (character === letter) {
        return true;
      } else {
        return false;
      }
    });
    res.send(`${array}`);
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
