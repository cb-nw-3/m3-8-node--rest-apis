let game = {}; // Store word from BE
const guesses = [];
// This starts with f f f f f. From the function "startGame"
let answers = [];

// If we are fetching value from the BE, remember we need to use the "async" feature.
const getWord = async () => {
  const response = await fetch('http://localhost:8000/hangman/words');
  const data = await response.json();
  game = data; // No return, it just modifies the variable word. This returns a promise.
};

// First step is to get a word
const startGame = async () => {
  // Awaiting promised word
  await getWord();
  //   console.log(game);
  // This will separate the "foundWord" into separate letter and the "map" method will replaced them with "false"
  answers = game.foundWord.word.split('').map((letter) => false);
  // console.log(answers);
  // This selects the DOM element and replaces the element by _ _ _ _ _,
  // The "h2" was initially empty. We used the "answer" variable, because it contained an array of 5 false elements.
  const answerElement = document.getElementById('answer');
  answerElement.innerText = answers.map((element) => '_ ').join('');

  // Adds an event listener to the webpage, this will recognize any keyboard input/
  // Verify with by console logging
  document.addEventListener('keydown', async (event) => {
    // console.log(event.keyCode);
    // This adds in the guess array the input key
    if (event.keyCode <= 90 && event.keyCode >= 60) {
      // console.log(event.keyCode);
      guesses.push(event.key);
    }
    const guessesElement = document.getElementById('guesses');
    guessesElement.innerText = guesses.toString();
    // This fetches from the BE the boolean array from the respective endpoint.
    const response = await fetch(
      `http://localhost:8000/hangman/guess/${game.foundWord.id}/${event.key}`
    );
    const data = await response.json();
    console.log(data);
    answers = answers.map((answer, index) => {
      // console.log(answer);
      if (answer) {
        return answer;
      }
      // console.log(data[index]);
      if (data[index]) {
        return game.foundWord.word[index];
      }
      // console.log(data[index]);
      return data[index];
    });
    // console.log(answers);
    // This will return the array to the HTML tag.
    const answerElement = document.getElementById('answer');
    answerElement.innerText = answers
      .map((element) => {
        if (element) {
          return `${element}`;
        } else {
          return '_';
        }
      })
      .join(' ');
    // console.log(combinedWord.join(' '));
  });
};

startGame();
