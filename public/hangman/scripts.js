// ... crickets...

let lettersDiv = document.querySelector(".letters");
let letterInput = document.querySelector("#letterInput");
let messageDiv = document.querySelector(".message");
let badLetterDiv = document.querySelector(".badLetter");

const getWordAndLetterCount = async () => {
  let response = await fetch("/hangman/words", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let parsedResponse = await response.json();
  for (i = 1; i <= parsedResponse.letterCount; i++) {
    let newDiv = document.createElement("div");
    newDiv.id = `letter-${i}`;
    newDiv.setAttribute(
      "style",
      "width:20px;height:20px;border-bottom:1px solid black; margin:10px;"
    );
    lettersDiv.appendChild(newDiv);
  }
  let wordId = parsedResponse.wordId;
  console.log("first", wordId);
  return wordId;
};
let getInfo = getWordAndLetterCount();
let rejectedLetter = "";

const submitLetter = async (event) => {
  event.preventDefault();
  let wordId = await getInfo;
  let letter = letterInput.value;
  let response = await fetch(`/hangman/guess/${wordId}/${letter}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let parsedResponse = await response.json();
  if (parsedResponse.status === "too-long") {
    messageDiv.innerText =
      "ERROR: your input was too long. You can only submit one letter at a time";
  }
  if (parsedResponse.status === "not-in-word") {
    messageDiv.innerText =
      "Nice try, but that letter isn't in the word, try again !";
    rejectedLetter = rejectedLetter + ` ${letter}`;
    badLetterDiv.innerText = rejectedLetter;
  }
  if (parsedResponse.status === "good-guess") {
    parsedResponse.array.forEach((item, index) => {
      if (item === true) {
        let div = document.querySelector(`#letter-${index + 1}`);
        div.innerText = `${parsedResponse.letter}`;
      }
    });
  }
  console.log(parsedResponse);
  console.log("wordId", wordId);
};
