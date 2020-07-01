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

    //only return the id and length of the word
    let data = {
      id: randomWord.id,
      length: randomWord.length,
    };

    console.log(data);

    //return to the browser the JSON data
    res.status(200).send(data);
  })

  //this endpoint returns a response whether or not the letter is inlcuded
  //in the random word
  .get("/hangman/guess/:wordId/:letter", (req, res) => {
    //store the route inputs
    let wordId = req.params.wordId;
    let letter = req.params.letter;

    //finds the word related to that ID to the rest of the data
    let result = words.find((word) => word.id === wordId);
    //console.log(result);

    //THIS FUNCTION IS TO STORE THE LETTER INDICES OF THE RANDOM WORD
    const returnIndices = (word, letter) => {
      let indices = [];
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          indices.push(i);
        }
      }
      return indices;
    };

    //This is to check if the wordId exists in the database
    if (result != undefined) {
      //if the ID exists, then check if the letter entered by the user
      //is included in the random word
      if (result.word.includes(letter)) {
        //returns a JSON response for a success
        res.status(200).send({
          status: "sucess",
          message: `the letter ${letter} is included`,
          letter: `${letter}`,
          //position: `${result.word.indexOf(letter)}`, //ONLY WORKED FOR UNIQUE LETTERS
          position: returnIndices(result.word, letter),
        });
      } else {
        //returns a JSON response for failure
        res.status(200).send({
          status: "fail",
          message: `the letter ${letter} is NOT included`,
          letter: `${letter}`,
          position: "none",
        });
      }
      //if the ID doesnt exist, send this message
    } else {
      res
        .status(400)
        .send({ message: "id does not match any word in the game" });
    }
  })

  .get("*", (req, res) => {
    res.status(404).send("Error 404: Page not Found");
  })


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));