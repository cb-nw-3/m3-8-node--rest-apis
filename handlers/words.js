const words = require("../data/words");

const handleWords = (req, res) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const foundWord = words[randomIndex];

  if (!foundWord) {
    return res.status(200).json({ message: "internal error" });
  }

  res.status(200).json(foundWord);
};

module.exports = handleWords;
