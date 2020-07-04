const wordBox = document.querySelector("#word");
const guessBox = document.querySelector("#guess");

let wordId;
let letterCount;
let hiddenWord = [];
let playerGuesses = [];

fetch("/hangman/words", {
  method: "GET",
}).then(async (res) => {
  const response = await res.json();
  console.log(response);
  wordId = response.id;
  letterCount = response.letterCount;

  for (let i = 0; i < letterCount; i++) {
    hiddenWord.push("_");
  }

  wordBox.innerText = hiddenWord.join(" ");
});

const handleGuess = (event) => {
  playerGuesses.push(event.key);

  guessBox.innerText = playerGuesses.join(", ");

  fetch(`/hangman/guess/${wordId}/${event.key}`).then(async (res) => {
    const response = await res.json();

    response.map((element, index) => {
      if (element) {
        hiddenWord[index] = event.key;
        wordBox.innerText = hiddenWord.join(" ");
      }
    });
  });
};

document.addEventListener("keydown", handleGuess);
