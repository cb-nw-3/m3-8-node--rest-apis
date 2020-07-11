const words = require('../data/words');

function handleHangman(req, res){
    res.status(200).render('../public/hangman/index');
}

module.exports = handleHangman;
