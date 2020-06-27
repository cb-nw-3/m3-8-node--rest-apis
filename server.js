"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { clients } = require("./data/clients");

const handleUserRequest = (req, res) => {
  console.log("req.body: ", req.body);
  const { userId } = req.body;

  let requestedUser = clients.find((user) => user.id === userId);

  if (requestedUser) {
    res.status(200).send({ status: "success", user: requestedUser });
  } else {
    res.status(400).send({ status: "error", error: "not found" });
  }
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

  // endpoints
  .post("/getUser", handleUserRequest)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
