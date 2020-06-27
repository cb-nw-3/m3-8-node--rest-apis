// ... crickets...

let lettersDiv = document.querySelector(".letters");

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
  return wordId;
};
getWordAndLetterCount();

const submitLetter = async (event) => {
  event.preventDefault();
  let wordId = await getWordAndLetterCount();
  console.log("wordId", wordId);
};
