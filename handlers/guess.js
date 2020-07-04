const words = require('../data/data')

const handleGuess = (req, res) => {
    const { wordId, letter } = req.params;

    if (!wordId || !letter) {
        res.status(400).send('Bad request')
    }

    const randomWord = words.find(word => word.id === wordId);

    if (!randomWord) {
        res.status(404).send('Word not found')
    }

    const wordArray = [
        randomWord.word.split('').map(letter => letter),
        randomWord.word.split('').map(letterInWord => {
            if (letterInWord === letter) {
                return true
            } else {
                return false
            }
        })
    ]

    res.json(wordArray)
}

module.exports = handleGuess;