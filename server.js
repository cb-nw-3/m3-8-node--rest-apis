"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { clients } = require("./data/clients");
const { words } = require("./data/words");

const PORT = process.env.PORT || 8000;

// const findSearchTerm = (req,res) =>{
//   let searchTerm = req.params
//   if(isPresentInClients(searchTerm)){
//     let item = findInBase(searchTerm)
//     res.status(200).json(item)
//   }else{
//     res.status(404)
//   }
// }

const sendRandomWord = (req, res) => {
  let randomNum = Math.round(Math.random() * (words.length - 1));
  console.log(randomNum);
  let randomArrayItem = words[randomNum];
  res.json({
    wordId: randomArrayItem.id,
    letterCount: randomArrayItem.letterCount,
  });
};

const isLetterInWord = (req, res) => {
  let { wordId, letter } = req.params;
  let foundWordObject = words.find((object) => {
    return object.id === wordId;
  });
  let wordArray = foundWordObject.word.split("");
  let booleanArray = [];
  wordArray.forEach((letter) => {
    booleanArray.push(false);
  });
  if (letter.length > 1) {
    res.json({ status: "too-long" });
  }
  if (wordArray.includes(letter)) {
    wordArray.forEach((item, index) => {
      if (item === letter) {
        booleanArray[index] = true;
      }
    });
    res.json({ status: "good-guess", array: booleanArray, letter: letter });
  } else {
    res.json({ status: "not-in-word", letter: letter });
  }
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
  //for exercise2
  // .get("/clients/:searchTerm", findSearchTerm)

  //for exercise3
  .get("/hangman/words", sendRandomWord)
  .get("/hangman/guess/:wordId/:letter", isLetterInWord)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
