"use strict";
//standard imports
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// route imports
const handleWords = require("./handlers");
const handleGuess = require("./guess");
// constants

const PORT = process.env.PORT || 8000;
// establish requirements
let { clients } = require("./data/clients.js");

let app = express()
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

  //added this
  .set("view engine", "ejs")

  // endpoints
  .get("/client/:id", (req, res) => {
    const clientSearch = req.params.id;
    // client search will be equal to request by id thus params.id as by url
    const clientFound = clients.find((client) => {
      return client.id === clientSearch;
      //take one (client) and then executing function on it. Will return whatever returns true)
    });
    if (clientFound != undefined) {
      let response = { clientFound: clientFound };
      res.send(response);
    }
  });

app.get("*", (req, res) => res.send("Dang. 404."));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
// Create RESTful endpoint (only one) that expects a search query and responds with the requested data, and/or the appropirate HTTP code.
