// ok. let's think this through.

// first thing is, it should pull up a random word from the endpoint

// done.

// this word will then be used to create the UI with the appropriate
// number of spaces.

// done.

// then, it should listen to user input, and use the input
// to summon data from the other endpoint

// done.

// once that data is received, it should update the UI appropriately.
// however, the FE should be maintaining the state.

// essentially, the FE should have an array consisting of all falses
// any non-matching values should a) flip the bit to true
// and display the corresponding letter. All behind the scenes.

let wordHolder;
let numLives = 5; // future expansion, if I had unlimited time and energy

const getWord = async () => {
    await fetch('/hangman/words')
        .then(response => response.json())
        .then(data => {
            wordHolder = data;
            buildUI(data)
        });
}

function buildUI(word) {
    for (let i = 0; i < Number(word["length"]); i++) {
        let letterbox = document.createElement("div");
        letterbox.classList.add("letterbox");
        letterbox.classList.toggle("letterboxBorder");
        letterbox.setAttribute("id", "id-" + i);
        document.querySelector("#gallows").appendChild(letterbox);
    }
}

function updateUI(letter, responseArray) {

    // replace id-# with the contents of the letter variable
    // since the id index starts at 0, we can harmonize with the array
    // using a simple loop

    for (let i = 0; i < responseArray.length; i++) {
        if (responseArray[i] === true) {
            let letterHold = document.querySelector("#id-" + i);
            letterHold.classList.remove("letterboxBorder");
            letterHold.innerHTML = letter;
        }
    }
}

async function checkLetter(e) {
    let letter = e.key;
    let responseStatus;

    let responseArray = await fetch('/hangman/guess/' + wordHolder["id"] + "/" + letter)

        // ahah. Interesting. So, if you don't use curly brackets
        // the arrow function has an implicit return of whatever data is generated
        // by your single statement

        // however, if you have curly brackets, you *have* to have a return

        .then(response => {
            responseStatus = response.status;
            return response.json();
        });

    if (responseStatus === 200 || responseStatus === 304) {
        // this should call a function to update the UI
        updateUI(letter, responseArray)
    } else {
        // this should decrement the number of lives
        numLives--;
    }

}

document.addEventListener('keypress', checkLetter)

getWord();