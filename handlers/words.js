const words = require('../data/data')

const handleWords = (req, res) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    if (!randomWord) {
        res.status(500).send('Internal Error')
    }
    
    res.status(200).send(randomWord)
}

module.exports = handleWords;