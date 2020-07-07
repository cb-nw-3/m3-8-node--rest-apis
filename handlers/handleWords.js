const words = require('../data/words');

function handleWords(req, res){
    //choosing random word
    const gameWord = words[Math.floor(Math.random() * 20)];
    if(typeof(gameWord) !== 'object'){
        return res.status(500).send('Something went wrong...')
    }
    //Responding the word object in json format
    res.status(200).json(gameWord);
}

module.exports = handleWords;
