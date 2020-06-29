const playerInputElement = document.querySelector(".playerInput");
const partialWordElement = document.querySelector(".partialWord");
const playerGuessesElement = document.querySelector(".playerGuesses");

//get a word id
let wordId = "";
let wordLength = 0;
let playerInput = "";
let partialWord = [];
let playerGuesses = [];

fetch("/hangman/words", {
  method: "GET",
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    wordId = res.id;
    wordLength = res.letterCount;
    for (let i = 0; i < wordLength; i++) {
      partialWord.push("_");
      partialWordElement.innerText = partialWord.join(" ");
    }
  });

function handleSubmit(event) {
  event.preventDefault();
  playerInput = playerInputElement.value;
  playerInputElement.value = "";

  fetch(`/hangman/guess/${wordId}/${playerInput}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error) {
        console.log("error", res.error);
        return;
      }
      let letterPositionArray = res.letterPosition;

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
    });
}
