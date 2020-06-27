"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const { clients } = require("./data/clients");

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

  .get("*", (req, res) => {
    res.status(404).send("Error 404: Page not Found");
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
