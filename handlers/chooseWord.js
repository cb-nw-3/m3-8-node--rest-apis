const words = require("../data/data.js");

const handleChooseWord = (req, res) => {
  // find a random index number depending on the length of words array
  const wordIndex = Math.floor(Math.random() * words.length);

  // find the word in the array based on index
  const chosenWord = words[wordIndex];

  // return status code 500 if no word is found
  if (!chosenWord) {
    return res.status(500).send("500: Internal Error");
  }

  // return a JSON object with id and letterCount
  return res.status(200).json({
    wordId: wordIndex,
    letterCount: chosenWord.letterCount,
  });
};

module.exports = handleChooseWord;
