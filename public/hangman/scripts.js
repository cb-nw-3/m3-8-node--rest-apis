// variables and constants word guesses and stuff
let word = {};
let guesses = [];
let display = [];
let tic = 0;
//functions dont forget async await
// getWord 40:20

//Fetches a word object from the URL "..../hangman/words"
const getWord = async () => {
    const res = await fetch('http://localhost:8000/hangman/words');
    const data = await res.json();
    word = data;
    console.log(data);
}
const runGame = async () =>{
    await getWord();
    display = word.word.split("").map(char => {
        return '_';
    });
    document.getElementById('wordDisplay').innerText = display.join(' ');
    document.getElementById('guesses').innerText += guesses; 

    document.addEventListener("keydown", async (event) => {
        if(event.key >= 'a' && event.key < 'z'){ //Making sure we are only getting letters and not other characters
            tic++;
            guesses.push(event.key);
            document.getElementById('guesses').innerText = guesses;

            //This is the part did not get on my own. It's simple once you see it!
            const response = await fetch(`http://localhost:8000/hangman/guess/${word.id}/${event.key}`);
            const data = await response.json();
        
            for(let i = 0; i <= word.word.length - 1; i++){
                if (data[i] === true){
                    display[i] = word.word[i];
                }
            }
            document.getElementById('wordDisplay').innerText = display.join(' ');

            if(!display.includes('_')){
                window.alert("Bravo!")
            }else if(tic === 10){
                window.alert("Game Over!")
            }
        }
        });

};
runGame();
// 42:50