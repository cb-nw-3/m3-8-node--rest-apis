const words = require("../data/words");

const handleGuess = (req, res) => {
  const { wordId, letter } = req.params;
  // 1. use the word id from parmaeters to find in words array this word

  //{ word: "groan", id: "1", letterCount: "5" }
  const foundWordObject = words.find((word) => word.id === wordId);

  //"groan"
  const wordString = foundWordObject.word;

  // ["g", "r", "o", "a", "n"]
  const letterArray = wordString.split("");

  // [false, false, false, true, false]
  const answersArray = [];

  letterArray.forEach((letterInWord) => {
    if (letterInWord === letter) {
      answersArray.push(true);
    } else {
      answersArray.push(false);
    }
  });

  res.json(answersArray);
};

module.exports = handleGuess;
