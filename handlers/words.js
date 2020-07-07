const words = require('../data/data')

const handleWords = (req, res) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    if (!randomWord) {
        res.status(500).send('Internal Error')
    }
    let hiddenWord = {
        wordId: randomWord.id,
        letterCount: randomWord.letterCount
    }
    res.status(200).json(hiddenWord)
}

module.exports = handleWords;