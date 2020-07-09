const words = require("./data/words");

// was put in words. js that is isn handlers.js by Guillaume?
//this is returning a random word
handleWords = (req, res) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const foundWord = words[randomIndex];

  // in case there is an error....
  if (!foundWord) {
    return res.status(500).json({ message: "Internal error" });
  }

  res.status(200).json(foundWord);
};

module.exports = handleWords;
