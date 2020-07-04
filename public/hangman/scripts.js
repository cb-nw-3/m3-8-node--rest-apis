const playerInputElement = document.querySelector(".playerInput");
const partialWordElement = document.querySelector(".partialWord");
const playerGuessesElement = document.querySelector(".playerGuesses");
const errorBoxElement = document.querySelector(".error-message");

//get a word id
let wordId = "";
let wordLength = 0;
let playerInput = "";
let partialWord = [];
let playerGuesses = [];

const requestWord = async () => {
  const response = await fetch("http://localhost:8000/hangman/words");
  const data = await response.json();

  wordId = data.id;
  wordLength = data.letterCount;

  for (let i = 0; i < wordLength; i++) {
    partialWord.push("_");
    partialWordElement.innerText = partialWord.join(" ");
  }
};

requestWord();

const handleSubmit = async (event) => {
  event.preventDefault();
  playerInput = playerInputElement.value.toLowerCase();

  errorBoxElement.innerText = "";
  playerInputElement.value = "";

  //make sure only one letter is guessed
  if (playerInput.length !== 1) {
    errorBoxElement.innerText = "Please submit a single letter as a guess.";
    return;
  }

  //dont poke the server if the letter has already been guessed
  if (playerGuesses.includes(playerInput)) {
    errorBoxElement.innerText =
      "You have already guessed this letter. Try Another one.";
    return;
  }

  const response = await fetch(`/hangman/guess/${wordId}/${playerInput}`);
  const data = await response.json();

  if (data.error) {
    console.log("error", data.error);
    return;
  }
  let letterPositionArray = data.letterPosition;

  playerGuesses.push(playerInput);
  playerGuessesElement.innerText = `Letters guessed: [${playerGuesses.join(
    " "
  )}]`;

  letterPositionArray.forEach((bool, index) => {
    if (bool) {
      partialWord.splice(index, 1, playerInput);
    }
  });
  partialWordElement.innerText = partialWord.join(" ");
};
