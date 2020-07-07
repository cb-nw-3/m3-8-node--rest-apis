let game = {};
let answer = [];


const guessElement = document.querySelector('#guesses');
const gameTitle = document.querySelector('#game-title');
const answerElement = document.querySelector('#answer');

let fetchData = async () => {
    let response = await fetch('http://localhost:8000/hangman/words')
    let data = await response.json()
    game = data
    // initialize empty slots
    let i = 0;
    while (i < game.letterCount) {
        answer.push('_ ');
        i++;
    }
    answerElement.innerText = answer.join('');
}

fetchData();

startGame = () => {
    document.addEventListener('keydown', event => {
        let updateAnswer = async () => {
            // grab word data
            let response = await fetch(`http://localhost:8000/hangman/guess/${game.wordId}/${event.key}`)
            let data = await response.json();
            // update newAnswer to show user good guesses
            let newAnswer = answer.map((boolean, index) => {
                if (data[1][index]) {
                    return event.key;
                } else {
                    return boolean
                }
            })
            answer = newAnswer
            console.log(newAnswer)
            answerElement.innerText = newAnswer.join('')
            // end game
            if (!answer.includes('_ ')) {
                gameTitle.innerText = 'Good job!'
            }
        }
        updateAnswer();
        
        let guessElementArray = guessElement.innerText.split(', ')
        // add all guesses of user on page
        if (guessElement.innerText.length === 0 && event.keyCode > 64 && event.keyCode < 91) {
            guessElement.innerText = `${event.key}`;
        } else if (event.keyCode > 64 && event.keyCode < 91 && !guessElementArray.includes(event.key)) {
            guessElement.innerText += `, ${event.key}`;
        }
    })
}

startGame()