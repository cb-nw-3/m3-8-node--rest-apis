const words = require("../data/data.js");

const handleGuessWord = (req, res) => {
  //destructure request parameters
  const { wordId, letter } = req.params;

  //Error status if wordId is not valid
  if (!wordId || !letter) {
    res.status(400).send("400! Bad request!");
  }

  //Find word with respect to wordId from words array
  const foundWord = words.find((word) => word.id === wordId);

  //If no word is found based on wordId, return 404 status
  if (!foundWord) {
    res.status(404).send("404! Word not found!");
  }

  //Create the Boolean array to hold the position of each letter as boolean
  const booleanArray = foundWord.word
    .split("")
    .map((letterInWord) => letterInWord === letter);
};

module.exports = handleGuessWord;
