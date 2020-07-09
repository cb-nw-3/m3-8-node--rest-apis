let answers = [];

const getWord = async () => {
  const response = await fetch("/hangman/words");
  const data = await response.json();

  return data;
};

// [false, false, false, a, false] _ _ _ a _
const printAnswers = (answerArray) => {
  let answerString = answerArray.map((element) => {
    if (element) {
      return `${element} `;
    } else {
      return "_ ";
    }
  });

  const answerElement = document.getElementById("answer");
  answerElement.innerText = answerString;
};

const startGame = async () => {
  const word = await getWord();
  console.log(word);
  answers = new Array(word.word.length).fill(false);
  printAnswers(answers);

  document.addEventListener("keydown", async (event) => {
    const response = await fetch(`/hangman/guess/${word.id}/${event.key}`);
    const serverAnswers = await response.json();
    answers = answers.map((answer, index) => {
      if (answer) {
        return answer;
      }

      if (serverAnswers[index]) {
        return event.key;
      }

      return false;
    });
    printAnswers(answers);
  });
};

startGame();
