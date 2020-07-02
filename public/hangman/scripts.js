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
  key.classList.add('selectedKey'); // jquery = key.addClass('playing')
});
