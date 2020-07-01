// ... crickets...
let submitWordBtn = document.getElementById("submitWordBtn");
let letterEntered = document.getElementById("letterEntered");
let letterBtn = document.getElementById("letterBtn");
letterBtn.disabled = true;
let imageCounter = 3;
const submitLetter = (event) => {
  event.preventDefault();
  let letter = letterEntered.value;
  fetch(`/hangman/guess/${wordID}/${letter}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((word) => {
      redisplayWord(word.returnedWord);
      letterEntered.value = "";
    })
    .catch((err) => console.log(err));
};

const submitWord = (event) => {
  event.preventDefault();
  letterBtn.disabled = false;
  reDisplayHangman();
  submitWordBtn.disabled = true;
  return fetch("/hangman/words", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((wordFromArray) => {
      wordToDisplay(wordFromArray);
    })
    .catch((err) => console.log(err));
};

function wordToDisplay(wordFromArray) {
  const { word, id } = wordFromArray.wordSelected;
  wordID = id;
  let wordSpread = document.getElementById("wordToComplete");
  wordSpread.innerHTML = "";
  for (i = 0; i < word.split("").length; i++) {
    let letter = document.createElement("span");
    letter.id = "letter" + i;
    letter.classList.add("letter");
    wordSpread.appendChild(letter);
  }
}

function redisplayWord(returnedWord) {
  let wordSpread = document.getElementById("wordToComplete");
  let noLetterFound = true;
  for (i = 0; i < returnedWord.length; i++) {
    if (returnedWord[i] != "") {
      noLetterFound = false;
      let letter = document.getElementById("letter" + i);
      letter.innerHTML = returnedWord[i];
      letter.classList.add("letter");
    }
  }
  if (noLetterFound) {
    reDisplayHangman();
  }
}

function reDisplayHangman() {
  imageCounter += 1;
  console.log("imageCounter: ", imageCounter);
  let hangMan = document.getElementById("hangMan");
  hangMan.innerHTML = "";
  let img = document.createElement("img");
  img.src = `/images/${imageCounter}.jpg`;
  img.setAttribute("width", "300px");
  hangMan.appendChild(img);
  hangCounter(imageCounter);
}
function hangCounter(imageCounter) {
  if (imageCounter == 10) {
    letterBtn.disabled = true;
    let content = document.getElementById("content");
    let gameOverLbl = document.createElement("div");
    gameOverLbl.id = "gameOverLbl";
    gameOverLbl.classList.add("gameOver");
    gameOverLbl.innerHTML = "Game Over";
    content.appendChild(gameOverLbl);
    startBlinking();
  }
}
function startBlinking() {
  setInterval(function () {
    blink();
  }, 1000);
}
function blink() {
  document.getElementById("gameOverLbl").style.display = "none";
  setTimeout(function () {
    document.getElementById("gameOverLbl").style.display = "inline";
  }, 500);
}
