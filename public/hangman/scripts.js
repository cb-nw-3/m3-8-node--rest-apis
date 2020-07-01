let lettersDiv = document.getElementById("letters");
let letterInput = document.getElementById("letterInput");
let messageDiv = document.getElementById("message");
let wrongLetterDiv = document.getElementById("badLetter");
let attempts = 0;
let finalArr = []; //Good answer counter by adding true booleans

//will get the random word from the server and its letter count and create the html necessary to start playing on the FE
const wordAndLetterCount = async () => {
  let res = await fetch("/hangman/words", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let parsedRes = await res.json();
  for (i = 1; i <= parsedRes.letterCount; i++) {
    let newDiv = document.createElement("div");
    newDiv.id = `letter-${i}`;
    newDiv.setAttribute(
      "style",
      "width:20px;height:20px;border-bottom:1px solid black; margin:10px; text-align: center;"
    );
    lettersDiv.appendChild(newDiv);
  }
  let wordId = parsedRes.wordId;
  console.log("Hint:WordId is ", wordId);
  return wordId;
};

let getInfo = wordAndLetterCount();
let rejectedLetter = "";

//Submit events through the letterInput and requesting info from the server to show the appropriate response
//Note the back and forth communication between server and client in order to render data
const submitLetter = async (event) => {
  event.preventDefault();
  let wordId = await getInfo;
  let letter = letterInput.value;
  let res = await fetch(`/hangman/guess/${wordId}/${letter}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  let parsedRes = await res.json();

//In the event of using numbers
  
if (parsedRes.message === 'not a letter') {
      messageDiv.innerText = 
      "You can't use numbers! Only letters, just for being sneaky that's a lost attempt MUHAHAHAHAHA";
      attempts += 1;
    }

//In the event of using more than one letter
  
if (parsedRes.message === "more than 1 letter") {
    messageDiv.innerText =
      "Come on! You know in hangman it's one letter at a time! Greedy!";
  }

//In the event of guessing wrong
  
if (parsedRes.message === "Wrong Guess") {
    messageDiv.innerText =
      "Not really part of the word (even if the right letter is Caps), give it another shot >:)";
    rejectedLetter = rejectedLetter + ` ${letter}`;
    wrongLetterDiv.innerText = rejectedLetter;
    attempts += 1;
    
    //If guessed 5 wrong times
    
    if( attempts === 5) {
        messageDiv.innerText = 'GAME OVER! Restarting in 2 seconds :)';
        setTimeout( () => {
            window.location.reload();
        }, 2000);
        return;
    }
  }

//In the event of a good guess
  
if (parsedRes.message === "Good Guess") {
    parsedRes.array.forEach((item, index) => {
      if (item === true) {
        let div = document.querySelector(`#letter-${index + 1}`);
        div.innerText = `${parsedRes.letter}`;
        finalArr.push(true);
      }
    });
    console.log(finalArr);

    //In the event that all was guessed right
      
    if (finalArr.length === parsedRes.array.length) {
        console.log('Game is up!')
        messageDiv.innerText = 
        "You did it! Good job! The game will restart in 3 seconds";
        setTimeout(() => {
          window.location.reload();
        }, 3000)
    }
  }

  
   console.log(attempts);
   console.log(parsedRes);
   console.log("wordId", wordId);
};