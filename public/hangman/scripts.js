// ... crickets...
let game = {};
const guesses = [];
let answers = [];
document.addEventListener('keydown', logKey);

function logKey(e) {
    console.log(e.key);
    makeGuess(e.key);
 // log.textContent += ` ${e.code}`;

}

const makeGuess = async (letterGuessed) =>
{
    const response = await fetch("http://localhost:8000/hangman/guess/"+game.id+"/"+letterGuessed);
    const data = await response.json();
    const guess_array = data.guess_array;
    console.log(guess_array);
    if (guess_array.includes(true))
    {
        guess_array.forEach((element, i) => {
            if (element === true)
             { 
               console.log(i);
       
               answers[i] = letterGuessed;
             }  
           });
       
    }
    else
    {
        guesses.push(letterGuessed);
    }

    

    renderAnswer();
    renderGuesses();
   
}

function renderAnswer()
{
    const answerDiv = document.getElementById("answer");
    answerDiv.innerText = answers.map(element => {if (element === false) { return "_"} else { return element}}).join(" ");
    
}

function renderGuesses()
{
    const guessesDiv = document.getElementById("guesses");
    guessesDiv.innerText = guesses.join(" ");
    
}


const getWord = async () => 
{
    const response = await fetch("http://localhost:8000/hangman/words");
    const data = await response.json();
    game = data
} 

const startGame = async () => {

    

    await getWord();
    console.log(game);
//    answers = game.word.split("");
//    answers = answers.map(element => false);

   // load up answers array
   for (i = 0; i < game.lettercount; i++) {
    answers.push(false);
   }


   renderAnswer();

}

startGame()