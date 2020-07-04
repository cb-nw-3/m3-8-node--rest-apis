let game = {};
const guesses = [];
// [false, false, false, false, false]
let answers = [];

// get the word
const getWord = async () => {
  const response = await fetch("http://localhost:8000/hangman/words");
  const data = await response.json();
  game = data;
};

const starGame = async () => {
  await getWord();

  // make the _ appear at first
  answers = game.word.split("").map((letter) => false);
  const answerElement = document.getElementById("answer");
  answerElement.innerText = answers.map((Element) => "_ ").join("");

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
          return "_ ";
        }
      })
      .join("");
  });
};
// [t false false false t]
starGame();
