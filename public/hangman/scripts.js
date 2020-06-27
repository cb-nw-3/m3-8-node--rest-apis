let playerInputElement = document.querySelector(".playerInput");
let partialWordElement = document.querySelector(".partialWord");

//get a word id
let wordId = "";
let wordLength = 0;
let playerInput = "";
let partialWord = [];

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

      letterPositionArray.forEach((item, index) => {
        if (item) {
          partialWord.splice(index, 1, playerInput);
        }
      });
      partialWordElement.innerText = partialWord.join(" ");
    });
}
