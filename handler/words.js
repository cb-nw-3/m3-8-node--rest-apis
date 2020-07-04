const words = require("../data/words");

handleWords = (req, res) => {
    const randomWord = Math.floor(Math.random() * words.length);
    const foundWord = words[randomWord];

    if (!foundWord) {
        return res.status(500).json({ message: "Internal error" });
    }

    res.status(200).json(foundWord);
};

module.exports = handleWords;