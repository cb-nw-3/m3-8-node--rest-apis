"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { words } = require("/Users/rareb/m3-8-node--rest-apis/public/data");
const PORT = process.env.PORT || 8000;

const word = (req, res) => {
    let randomNumber = Math.round(Math.random() * (words.length - 1));
    let randomArrayItem = words[randomNumber];
    res.json({
        id: randomArrayItem.id,
        letter: randomArrayItem.letterCount,
        word: randomArrayItem.word,
    });
};

const contained = (req, res) => {
    let { id, letter } = req.params;
    let foundWord = words.find((object) => {
        return object.id === id;
    });
    let arrayOfLetters = foundWord.word.split("");
    let booleans = [];
    arrayOfLetters.forEach((letter) => {
        booleans.push(false);
    });
    if (req.params.letter.length > 1) {
        console.log(req.params.letter.length);
        res.json({ status: "pick only one letter" });
    }
    if (arrayOfLetters.includes(letter)) {
        arrayOfLetters.forEach((item, index) => {
            if (item === letter) {
                booleans[index] = true;
            }
        });
        res.json({
            status: "ding ding ding!",
            params: req.params,
            array: booleans,
            letter: letter,
        });
    } else {
        res.json({ status: "nope", letter: letter });
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

    .get("/hangman/words", word)
    .get("/hangman/guess/:id/:letter", contained)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
