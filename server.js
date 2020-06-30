"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

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
  //added this
  .set("view engine", "ejs");
// endpoints
app.get("/client/:id", (req, res) => {
  const clientSearch = req.params.id;
  // client search will be equal to request by id
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

//     There is a `clients.js` file inside of the data folder.
// HTTP GET http://www.appdomain.com/users
// Create RESTful endpoint (only one) that expects a search query and responds with the requested data, and/or the appropirate HTTP code.
