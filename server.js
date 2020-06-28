"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const { clients } = require("./data/clients");
const { words } = require("./data/hang");

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

  //#################### EXERCISE 2 #################################

  //Search through database of clients based on their IDs
  .get("/clients/:id", (req, res) => {
    //let query = req.params.q;
    //route points to user id
    let clientID = req.params.id;
    //console.log(clientID);

    //find the appropriate data from that client
    let page = clients.find((client) => client.id === clientID);
    //console.log(page);

    //send that info back
    res.status(200).send(page);

    //test with
    //http://localhost:8000/clients/59761c23b30d971669fb42ff
  })

  //######################## EXERCISE 3 ##########################

  //this endpoint returns a random word to start guessing
  .get("/hangman/words", (req, res) => {
    //get an random object from the data array
    let randomWord = words[Math.floor(Math.random() * words.length)];

    //only return the id and length of the word
    let data = {
      id: randomWord.id,
      //word: randomWord.word, //THIS WAS FOR TESTING
      length: randomWord.length,
    };

    //console.log(data);

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

  //FOR TESTING ONLY returns the word by ID
  .get("/hangman/words/:id", (req, res) => {
    let id = req.params.id;
    let data = words.find((word) => word.id === id);
    res.status(200).send(data);
  })

  .get("*", (req, res) => {
    res.status(404).send("Error 404: Page not Found");
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
