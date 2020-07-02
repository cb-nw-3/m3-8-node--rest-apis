let mainContent = document.getElementById("content");
let messageBox = document.getElementById("box");

//##promises and async await

//this function will return a random word
async function getWord() {
  try {
    const res = await fetch("/hangman/words");
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

//this function will fetch a letter from the randomly generated word based on that word's id in the database and compare it to the keypress by the user
async function getLetter(id, key) {
  try {
    const res = await fetch(`/hangman/guess/${id}/${key}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

//this function will update the message box with the latest user input and the servers response to that input
const updateMessage = (key, msg) => {
  messageBox.innerHTML = msg;
};

//this function will update the game when the user enters a right input
//requires the user input and the indices of the random word (from back-end)
//NOTE: position returns as an array of all indices where a letter may be since words can have multiple occurences of the same letter
const updateHangman = (key, position) => {
  //update the letter based on its index, same as the html element
  position.forEach((pos) => {
    let updateLetter = document.getElementById(`ltr-${pos}`);
    updateLetter.innerHTML = key;
  });
};

//this function will check if the player has solved the hangman game
const checkWin = () => {
  //this array will store all correct letters and incorrect ones
  let letters = [];

  //we had created h2 elements on line 78 for letter
  let hangmanLtrs = document.querySelectorAll("h2");

  //push the correct letter to html and replace the "_"
  hangmanLtrs.forEach((letter) => letters.push(letter.innerHTML));

  //when all the "_" are replaced by letter, the full word is visible and the user won the game
  let hasWon = letters.every((ltr) => ltr !== "_");

  //function results in a boolean value, line 119
  return hasWon;
};


//##HANGMAN GAME

//globar var that will hold the current random word's id
let wordId = undefined;

//calls getWord promise to display all the letters of the random word
getWord().then((data) => {
  //console.log("the word ID is", data.id, "and the word is", data.word);

  //assign the word id to the global var
  wordId = data.id;

  //generate a letter char for every letter in the random word
  for (let i = 0; i < data.length; i++) {
       //create an html element to hold the value of a letter from the random word
    let letter = document.createElement("h2");

    //starting with underscore and will be updated when correct letter is hit
    letter.innerHTML = `_`;

    //the id will also correspond to the index of the random word
    letter.id = `ltr-${i}`;
    letter.classList.add("ltr");
    letter.style.fontSize = "80px";
    mainContent.appendChild(letter);
  }
});

//keydown event
document.body.addEventListener(
  "keydown",
  (listenKeys = (e) => {
    let key = e.key;

    getLetter(wordId, key).then((res) => {
       //the response from the fetch will have a status key that is either
      // success or fail when the keypress is a correct letter
      if (res.status === "success") {
        updateMessage(key, `There's the letter "${key}"!`);

        //updates the hangman game with the latest correct input
        updateHangman(key, res.position);

        //check if the win condition has been met
        if (checkWin()) {
          updateMessage(key, "You Won the Game!");

          //removes the keypress event listener once the game is over
          document.body.removeEventListener("keydown", listenKeys);
        }
      } else {
        //console.log("You got the wrong letter");
        updateMessage(key, `NO LETTER "${key}" :(`);
      }
    });
  })
);