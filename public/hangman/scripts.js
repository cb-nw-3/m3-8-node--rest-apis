let hangmanGame = {};
let guesses = [];
let answers = [];

const getWord = async () => {
  const response = await fetch("http://localhost:8000/hangman/words");
  const data = await response.json();
  hangmanGame = data;
  console.log(data);
};

const startGame = async () => {
  await getWord();
  // get _ to appear on page
  answers = hangmanGame.word.split("").map((letter) => false);
  const answerElement = document.getElementById("answer");
  answerElement.innerText = answers.map((element) => "_ ").join("");
  document.addEventListener("keydown", async (event) => {
    // display the guesses
    guesses.push(event.key);
    const guessesElement = document.getElementById("guesses");
    guessesElement.innerText = guesses.toString();

    const response = await fetch(
      `http://localhost:8000/hangman/guess/${hangmanGame.id}/${event.key}`
    );
    const data = await response.json();
    console.log(data);
    answers = answers.map((answer, index) => {
      if (answer) {
        return answer;
      }

      if (data[index]) {
        return hangmanGame.word[index];
      }

      return data[index];
    });
    const answerElement = document.getElementById("answer");
    answerElement.innerText = answers
      .map((element) => {
        if (element) {
          return `${element}`;
        } else {
          return "_ ";
        }
      })
      .join("");
  });
};

startGame();
