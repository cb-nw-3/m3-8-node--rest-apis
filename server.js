'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

//import data from .data/hang.js
const { words } = require("./data/hang");

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

  //request a random word from the created array in .data/hang.js
  .get("/hangman/words", (req, res) => {
      //generate random number between 0 and 10 (total of 10 words in my array) to be the index in order to choose a random word
    let randomWord = words[Math.floor(Math.random() * 10)];
//return object that contains id and letterCount as hint. not the actual word to prevent cheating
    let data = {
      id: randomWord.id,
      length: randomWord.length,
    };
    res.status(200).send(data);
  })

  //this endpoint returns a status code and letter's position
  .get("/hangman/guess/:wordId/:letter", (req, res) => {
    //store the route inputs
    let wordId = req.params.wordId;
    let letter = req.params.letter;

    //finds the word related to that ID to the rest of the data
    let result = words.find((word) => word.id === wordId);
    //console.log(result);

    //if letter is included in the word, store the letter index position in 'returnIndices'
    const returnIndices = (word, letter) => {
      let indices = [];
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          indices.push(i);
        }
      }
      console.log(indices);
      return indices;
    };

    //This is to check if the wordId exists in the database
    if (result != undefined) {
      //if the ID exists, then check if the letter entered by the user
      //is included in the random word
      if (result.word.includes(letter)) {
        res.status(200).send({
          status: "success",
          //position: `${result.word.indexOf(letter)}`, //ONLY WORKED FOR UNIQUE LETTERS
          position: returnIndices(result.word, letter),
        });
      } else {
        res.status(200).send({
          status: "fail",
        });
      }
      //404 code for ID not matching
    } else {
      res
        .status(400)
        .send({ message: "id not found" });
    }
  })

  .get("*", (req, res) => {
    res.status(404).send("Error 404: Page not Found");
  })


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));