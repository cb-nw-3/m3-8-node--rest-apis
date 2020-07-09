const words = require("./data/words");

const handleGuess = (req, res) => {
  // destructure params
  const { wordId, letter } = req.params;

  // handle error if params undefined
  if (!wordId || !letter) {
    return res.status(400).send(" bad request");
  }

  // find word in words arrays
  const foundWord = words.find((word) => word.id === wordId);

  // handle word not found
  if (!foundWord) {
    return res.status(404).send("word not found");
  }

  // send back array of boolean  cat, guess is letter: a
  const booleanArray = foundWord.word // {word: cat, id: '0392742390, length: '3'}
    .split("") //['c', 'a', 't']
    .map((letterInTheWord) => letterInTheWord === letter); // [false, true, false]

  res.json(booleanArray);
};

module.exports = handleGuess;
