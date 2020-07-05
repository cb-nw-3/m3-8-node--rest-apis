let iLetter = document.querySelector("#letter");
let badLetterDiv = document.querySelector(".badLetter");
let goodLetterDiv = document.querySelector(".myWord");

let goodLetter = [];

const getRandomWord = async () => {
    let response = await fetch("/hangman/words", {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    });
    let parsed = await response.json();
    let id = parsed.id;
    goodLetter = new Array(Number(parsed.letter)).fill(false);
    return { count: parsed.letterCount, id: id };
};

let randomWord = getRandomWord();
let badLetter = "";

const guessLetter = async (event) => {
    event.preventDefault();
    let { id } = await randomWord;
    let letter = iLetter.value;
    let response = await fetch(`/hangman/guess/${id}/${letter}`, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    });
    let parsed = await response.json();
    if (parsed.status === "pick only one letter") {
        alert(parsed.status);
    }
    if (parsed.status === "nope") {
        alert(parsed.status);
        badLetter = badLetter + ` ${letter}`;
        badLetterDiv.innerText = badLetter;
    }
    if (parsed.status === "ding ding ding!") {
        alert(parsed.status);
        if (goodLetter !== parsed.array) {
            goodLetter = goodLetter.map((letter, index) => {
                if (letter) {
                    return letter;
                }
                if (letter !== parsed.array[index]) {
                    return parsed.letter;
                }
                return false;
            });
            goodLetterDiv.innerText = goodLetter
                .map((letter) => {
                    if (letter) {
                        return `${letter}`;
                    }
                    return "_ ";
                })
                .join("");
        }
    }
};
