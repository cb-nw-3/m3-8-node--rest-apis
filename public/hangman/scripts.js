
let maxWrong = 5;
let mistakes = 0;
let letterselected = [];
let wordId = undefined;

//return a random word
async function getWord() {
    try {
        const res = await fetch("/hangman/words");
        // console.log(res.json());
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function getAnswer() {
    try {
        const res = await fetch(`/hangman/answer/word/${wordId}`);
        // console.log(res.json());
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

//Display each letter
getWord()
    .then((response) => {
        //console.log(response)
        wordId = response.id;

        document.getElementById('word').innerHTML = "_ ".repeat(response.length);
    })

async function getLetter(id, letter) {
    try {
        const res = await fetch(`/hangman/guess/${id}/${letter}`);
        return res.json();
    } catch (err) {
        console.log(err);
    }
}

//Display max mistakes number
document.getElementById('maxWrong').innerHTML = maxWrong;

//Add buttons
function buttons() {
    let displayButtons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letters =>
        `
        <button
            id='` + letters + `'
            onClick="handleGuess('` + letters + `')"
        > 
            ` + letters + `

        </button>
        `
    ).join('');
    document.getElementById('letters').innerHTML = displayButtons;
}

function handleGuess(chosenLetter) {
    letterselected.indexOf(chosenLetter) === -1 ? letterselected.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disable', true);

    if (wordId.indexOf(chosenLetter) >= 0) {
        checkIfWon();
    } else if (wordId.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfLost();
    }
}

async function checkIfWon() {
    const rightWord = await getAnswer()
    if (wordStatus === rightWord.word) {
        document.getElementById('letters').innerHTML = 'You Won!!!'
    }
}
async function checkIfLost() {
    if (mistakes === maxWrong) {
        // getAnswer()
        // .then(asnwer => )
        const data = await getAnswer()
        document.getElementById('word').innerHTML = data.word
        document.getElementById('letters').innerHTML = 'You Lost!!!'
    }
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    letterselected = [];
    getWord();

    buttons();
}

buttons();
reset();

