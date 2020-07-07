const words = require('../data/words');

function handleGuess(req, res){
    const { wordId, letter } = req.params;
    if(wordId > 19 || wordId < 0){
        return res.status(400).send('Bad Request.');
    } else if(letter < 65 || (letter > 90 && letter < 97) || letter > 122){
        return res.status(400).send('The guess was not a letter.')
    }
    const wordObj = words.find(word => word.id === wordId);
    const word = wordObj.word;
    const wordArray = word.split('');

    if(word.includes(letter)){
        truthArray = wordArray.map(char => char === letter);
    } else {
        truthArray = wordArray.map(char => false);
    }
    res.status(200).json(truthArray);
}

module.exports = handleGuess;