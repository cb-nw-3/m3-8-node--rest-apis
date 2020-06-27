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

  //this returns a random word to start guessing
  .get("/hangman/words", (req, res) => {
    //get an random object from the data array
    let randomWord = words[Math.floor(Math.random() * words.length)];

    //only return the id and length of the word
    let data = { id: randomWord.id, length: randomWord.length };
    //console.log(data);

    //return to client
    res.status(200).send(data);
  })

  .get("/hangman/guess/:wordId/:letter", (req, res) => {
    let wordId = req.params.wordId;
    let letter = req.params.letter;

    let result = words.find((word) => word.id === wordId);
    //console.log(result);

    if (result != undefined) {
      if (result.word.includes(letter)) {
        res.status(200).send({
          status: "sucess",
          message: `the letter ${letter} is included`,
          letter: `${letter}`,
          position: `${result.word.indexOf(letter)}`,
        });
      } else {
        res.status(200).send({
          status: "fail",
          message: `the letter ${letter} is NOT included`,
          letter: `${letter}`,
          position: "none",
        });
      }
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
