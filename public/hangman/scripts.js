// ... crickets...
const KEYS = document.querySelectorAll('.key');
KEYS.forEach((key) => key.addEventListener('transitionend', removeTransition));
KEYS.forEach((key) =>
  key.addEventListener('click', (e) => {
    key.classList.remove('selectedKey');
  })
);

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; //because transform is the longest
  //console.log(this);
  this.classList.remove('selectedKey');
}

window.addEventListener('keydown', (e) => {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  key.classList.add('selectedKey');
  checkLetter(e.key);
});

let lifes = 10;
let letters = [];
let currentWord = 0;

const SCREEN1 = document.querySelector('.wordStatus');

function loadGame() {
  fetch('/hangman/words')
    .then((data) => data.json())
    .then((word) => {
      const P = document.createElement('p');
      for (let i = 1; i <= word.letterCount; i++) {
        P.innerText = P.innerText + '_ ';
      }
      SCREEN1.appendChild(P);
      currentWord = word.id;
    });
  const SCREEN2 = document.querySelector('.gameInfo');
  const P1 = document.createElement('p');
  P1.innerText = `Lifes: ${lifes}`;
  P1.id = 'lifes';
  const P2 = document.createElement('p');
  P2.innerText = `Letters: ${letters}`;
  P2.id = 'letters';
  SCREEN2.appendChild(P1);
  SCREEN2.appendChild(P2);
}

function checkLetter(letter) {
  fetch(`/hangman/guess/${currentWord}/${letter}`)
    .then((data) => data.json())
    .then((wordLetters) => {
      const P = SCREEN1.querySelector('p');
      const ANSWER_SCREEN = P.innerText.split(' ');
      wordLetters.forEach((hint, index) =>
        hint === true ? (ANSWER_SCREEN[index] = letter.toUpperCase()) : ''
      );
      P.innerText = ANSWER_SCREEN.join(' ');
      wordLetters.every((space) => space === false)
        ? lifes--
        : letters.push(letter.toUpperCase());
      if (ANSWER_SCREEN.every((space) => space != '_')) {
        setTimeout(() => window.alert('You have won!!!'), 200);
      }
      console.log(lifes);
      if (lifes <= 0) {
        window.alert('You Lost =(!!!');
        window.location.reload();
      }
      const LIFES_SCREEN = document.querySelector('#lifes');
      LIFES_SCREEN.innerText = `Lifes: ${lifes}`;
      const LETTERS_SCREEN = document.querySelector('#letters');
      LETTERS_SCREEN.innerText = `Letters: ${letters}`;
    });
}

loadGame();
