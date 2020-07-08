const words = require('../data/words');

const handleWords = (req, res) => {
  //   console.log('The word array contains ' + words.length);
  const randomIndex = Math.floor(Math.random() * words.length);
  //   console.log('The location of the randomly chosen word is ' + randomIndex);
  // Selects a random number betweem 0 and one and multiplies by the array length to select an arbitrary number.
  const foundWord = words[randomIndex]; // This is the found word.
  if (!foundWord) {
    return res.status(500).json({ message: 'Internal error' });
  }
  // This is a check in case the word is selected, 500 is an erreur from the BE.
  res.status(200).json({ foundWord });
};

module.exports = handleWords;
