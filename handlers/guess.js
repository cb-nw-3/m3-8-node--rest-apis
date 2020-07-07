const words = require("../data/words");

const handleGuess = (req, res) => {
  const { wordId, letter } = req.params;
  if (!wordId || !letter) {
    // error if params are undefined
    return res.status(400).send("ERROR 400 - BAD REQUEST");
  }
  // find word in words array
  const foundWord = words.find((word) => word.id === wordId);

  // error if word not found
  if (!foundWord) {
    return res.status(404).send("ERROR 404 - NOT FOUND");
  }
  // send back array of boolean
  const booleanArray = foundWord.word
    .split("")
    .map((letterInTheWord) => letterInTheWord === letter);

  res.send(booleanArray);
};

module.exports = handleGuess;
