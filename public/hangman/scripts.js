let mainContent = document.getElementById("content");
let messageBox = document.getElementById("box");

//######################## ASYNC AWAIT FUNCTIONS ###########################

//this function will return a random word
async function getWord() {
  try {
    const res = await fetch("/hangman/words");
    //console.log(res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

//this function will fetch a letter from the randomly generated word
//based on that word's id in the db and compare it to the keypress by the user
async function getLetter(id, key) {
  try {
    const res = await fetch(`/hangman/guess/${id}/${key}`);
    //console.log(res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

//########################### EXTRA FUNCTIONS #########################

//this function will update the message box with the latest user input
//and the servers response to that input
const updateMessage = (key, msg) => {
    messageBox.innerHTML = msg;
};

//this function will update the game when the user enters a right input
//requires the user input and the indices of the random word (from be)
//NOTE: position returns as an array of all indices where a letter may be
//since words can have multiple occurences of the same letter
const updateHangman = (key, position) => {
  //THIS IS A CONSOLE LOG CHECK
  //console.log("this word has this many letters:", letters.length);
  //console.log("letter to be added", key);
  //console.log("word position is", position);
  //console.log(position);
  //position.forEach((pos) => console.log(pos));

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

  //the hidden letters are all h2 tags
  let hangmanLtrs = document.querySelectorAll("h2");

  //when a keypress is registered, and if it is correct, then it will be
  //added into the letters array
  hangmanLtrs.forEach((letter) => letters.push(letter.innerHTML));
  //console.log(letters);

  //this checks if the letters array contains anything else but the arbitrary
  //underscore placeholders for empty letters
  let hasWon = letters.every((ltr) => ltr !== "_");

  //function results in a boolean value
  return hasWon;
};

//########################### HANGMAN GAME ############################

//globar var that will hold the current random word's id
let wordId = undefined;

//fires the getWord promise to display all the letters of the random word
getWord().then((data) => {
  //console.log("the word ID is", data.id, "and the word is", data.word);

  //assign the word id to the global var
  wordId = data.id;

  //generate a letter char for every letter in the random word
  for (let i = 0; i < data.length; i++) {
    //console.log(i);

    //create an html elem to hold the value of a letter from the random word
    let letter = document.createElement("h2");

    //for now it will be just underscores, until a user input is registered
    letter.innerHTML = `_`;

    //the id will also correspond to the index of the random word
    letter.id = `ltr-${i}`;
    letter.classList.add("ltr");
    letter.style.fontSize = "80px";
    mainContent.appendChild(letter);
  }
});

//upon loading the page, the document will listen to a user input that is a
//key down
document.body.addEventListener(
  "keydown",
  (listenKeys = (e) => {
    //returns key value
    let key = e.key;

    //console.log("User Entered Letter:", key);
    //console.log("word id is still", wordId);

    getLetter(wordId, key).then((res) => {
      //console.log(res);

      //THIS WAS JUST A CHECK, THE ACTUAL WORD IS NOT FETCHABLE
      //console.log("User entered:", key, "word is", res.letter);

      //the response from the fetch will have a status key that is either
      // success or fail when the keypress is a correct letter
      if (res.status === "success") {
        //console.log("You got the right letter!");

        //updates the message box
        updateMessage(key, `letter "${key}" is CORRECT!`);

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
        updateMessage(key, `letter "${key}" is WRONG!`);
      }
    });
  })
);