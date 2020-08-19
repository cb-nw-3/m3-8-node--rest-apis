"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { words } = require("./data/words");
const { clients } = require("./data/clients");
const { tables, stock } = require("./data/restaurant");
const e = require("express");
let wordSelected = "";

const activeCustomers = (req, res) => {
  let activeClients = clients.filter((customer) => {
    return customer.isActive;
  });
  console.log("active Customers: ", activeClients);
};
const foodRemaining = (req, res) => {
  console.log("food: ", stock.food);
};

const customerID = (req, res) => {
  const found = clients.find((customer) => customer.id == req.params.id);
  if (found) {
    res.status(200).send({ found });
  } else {
    res.status(404).send({ error: "ID not found" });
  }
};
const tablesAvailable = (req, res) => {
  let remainingTables = tables.filter((table) => {
    return table.isAvailable;
  });
  console.log("tables remaining: ", remainingTables);
};

const selectWord = (req, res) => {
  let numSelected = Math.floor(Math.random() * words.length);
  wordSelected = words[numSelected];
  res.send({ wordSelected });
};

const selectLetter = (req, res) => {
  let element = req.params.wordID - 1;
  const { word } = words[element];
  let letter = req.params.letter;
  let wordEvaluated = word.split("");
  let returnedWord = wordEvaluated.map((x) => {
    return x == letter ? letter : "";
  });
  res.send({ returnedWord });
};

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
  .get("/hangman/words", selectWord)
  .get("/hangman/guess/:wordID/:letter", selectLetter)
  .get("/restaurant/activeCustomers", activeCustomers)
  .get("/restaurant/customerProfile/:id", customerID)
  .get("/restaurant/tables", tablesAvailable)
  .get("/restaurant/stock/foodRemaining", foodRemaining)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
