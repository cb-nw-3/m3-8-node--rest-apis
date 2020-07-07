const words = require('./data/words');

function handleWords(req, res){
    //choosing random word
    const gameWord = words[Math.floor(Math.random() * 20)];
    //Responding the word object in json format
    res.status(200).json(gameWord);
}

function handleGuess(req, res){
    const { wordId, letter } = req.params;
    const wordObj = words.find(word => word.id === wordId);
    const word = wordObj.word;

    if(word.includes(letter)){
        wordArray = word.split('');
        truthArray = wordArray.map(char => char === letter);
    }
    res.status(200).json(truthArray);
}

module.exports = handleWords;
module.exports = handleGuess;