// ok. let's think this through.

// first thing is, it should pull up a random word from the endpoint

// done.

// this word will then be used to create the UI with the appropriate
// number of spaces.

// then, it should listen to user input, and use the input
// to summon data from the other endpoint

// once that data is received, it should update the UI appropriately.
// however, the FE should be maintaining the state.

// essentially, the FE should have an array consisting of all falses
// any non-matching values should a) flip the bit to true
// and display the corresponding letter. All behind the scenes.

let wordHolder;

const getWord = async () => {
    await fetch('/hangman/words')
        .then(response => response.json())
        .then(data => {
            wordHolder = data;
            updateUI(data)
        });
}

function updateUI(word) {
    for (let i = 0; i < Number(word["length"]); i++) {
        let letterbox = document.createElement("div");
        letterbox.classList.add("letterbox");
        letterbox.setAttribute("id", "id-" + i);
        document.querySelector("#gallows").appendChild(letterbox);
    }
}

function updateLetter(letter) {

}

async function checkLetter(e) {
    let letter = e.key;

    await fetch('/hangman/guess/' + wordHolder["id"] + "/" + letter)
        .then(data => {
            if (data.status === 200 || data.status === 304) {
                console.log("200 bitches!!")
            } else if (data.status === 404) {
                console.log("wh...what?");
            }
        });


}

document.addEventListener('keypress', checkLetter)

getWord();