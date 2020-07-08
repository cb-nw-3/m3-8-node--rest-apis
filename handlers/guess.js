const words = require('../data/words'); // Imports words from words array.

const handleGuess = (req, res) => {
  // Destructure params
  console.log(req.params);
  const { wordId, letter } = req.params;
  // Test to detect error message.
  if (!wordId || !letter) {
    return res.status(400).send('wrong request');
  }

  // Find word in words array
  const foundWord = words.find((word) => word.id === wordId);

  // Handle word if not found.
  if (!foundWord) {
    return res.status(404).send('word not found');
  }

  // Send back an array of boulean by splitting the word in seperate element.
  // w h e e l
  // f f t t f
  const booleanArray = foundWord.word
    .split('')
    .map((letterInWord) => letterInWord === letter);

  // Transform the result in JSON format.
  res.json(booleanArray);
};

module.exports = handleGuess;
