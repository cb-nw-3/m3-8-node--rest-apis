'use strict';
const { clients } = require('./data/clients.js');

const handlerClientsData = (req, res) => {
  if (
    (req.params[0] == '' || req.params[0] == '/') &&
    Object.keys(req.query).length === 0
  ) {
    res.status(200).send(clients);
  } else {
    const QUERY = req.params[0].split('/');
    const QUERY_KEY = QUERY[1];
    const KEYS = Object.keys(clients[0]);
    if (KEYS.includes(QUERY_KEY)) {
      if (req.query.key != undefined) {
        const FILTERED_CLIENTS = clients.filter(
          (elem) => elem[QUERY_KEY] === req.query.key
        );
        res.status(200).send(query(QUERY_KEY, FILTERED_CLIENTS));
      } else {
        res.status(200).send(query(QUERY_KEY, clients));
      }
    }
  }
};

function query(key, array) {
  return array.map(function (elem) {
    let ob = {};
    ob.name = elem.name;
    ob[key] = elem[key];
    return ob;
  });
}

//****Hangman****//

//this generates a random list of words instead of using a static file
const RANDOM_WORD = require('random-words');
const ARRAY_OF_WORDS = [];
//List of words
for (let i = 1; i <= 200; i++) {
  let word = RANDOM_WORD();
  while (word.length < 6) {
    word = RANDOM_WORD();
  }
  if (word.length >= 6) {
    ARRAY_OF_WORDS.push({ word: word, id: i + 100, letterCount: word.length });
  }
}

//RESTful API
const handlerWordProvider = (req, res) => {
  const RANDOM_INDEX = Math.floor(Math.random() * 200);
  res.status(200).send({
    id: ARRAY_OF_WORDS[RANDOM_INDEX].id,
    letterCount: ARRAY_OF_WORDS[RANDOM_INDEX].letterCount,
  });
};

const handlerWordGuess = (req, res) => {
  // req.params.wordId, req.params.letter;
  const WORD_OBJ = ARRAY_OF_WORDS.find(
    (word) => word.id === parseInt(req.params.wordId)
  );

  const WORD_SPLIT = WORD_OBJ.word.split('');
  const RESPONSE = WORD_SPLIT.map((letter) =>
    letter === req.params.letter ? true : false
  );

  res.status(200).send(RESPONSE);
};

module.exports = {
  handlerClientsData,
  handlerWordProvider,
  handlerWordGuess,
};
