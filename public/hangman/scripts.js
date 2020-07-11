let game = {};
let guesses = [];
let answers = [];

const getWord = async () => {
  const response = await fetch("http://localhost:8000/hangman/words");
  const data = await response.json();
  game = data;
  console.log(game);
};

const startGame = async () => {
  await getWord();

  // set elements in answers array based on letterCount as false
  for (let i = 0; i < game.letterCount; i++) {
    answers[i] = false;
  }

  // find the answer element on the HTML page
  const answerElement = document.getElementById("answer");

  // set "_" based on the number of elements in answers array
  answerElement.innerText = answers.map((element) => " _").join("");

  document.addEventListener("keydown", async (event) => {
    // display the guesses
    guesses.push(event.key);
    const guessesElement = document.getElementById("guesses");
    guessesElement.innerText = guesses.toString();

    const response = await fetch(
      `http://localhost:8000/hangman/guess/${game.id}/${event.key}`
    );

    const data = await response.json();

    answers = answers.map((answer, index) => {
      if (answer) {
        return answer;
      }
      if (data[index]) {
        return game.word[index];
      }
      return data[index];
    });
    const answerElement = document.getElementById("answer");
    answerElement.innerText = answers
      .map((element) => {
        if (element) {
          return `${element} `;
        } else {
          return " _";
        }
      })
      .join("");
  });
};

startGame();
