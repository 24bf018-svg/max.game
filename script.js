const game = document.querySelector('.game');

let arrFactory = [];
let arrTree = [];
let newFactory;
let interval = 800;

function createGame() {
  game.innerHTML = '';

  for (let i = 0; i < 30; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.setAttribute('data-value', i);
    game.appendChild(box);
  }
}

function startGame() {
  const init = document.querySelector('.init');

  init.style.animation = 'start .5s ease-in';
  init.style.top = '100%';

  clearInterval(newFactory);
  newFactory = setInterval(randomFactory, interval);
}

function resetGame() {
  arrFactory = [];
  arrTree = [];

  const boxes = document.querySelectorAll('.box');

  boxes.forEach(function(box) {
    box.classList.remove('green');
    box.classList.remove('tree');
    box.classList.remove('red');
    box.classList.remove('factory');
  });

  document.querySelector('.hidden').classList.add('levelUp');

  const won = document.querySelector('.won');
  won.style.animation = 'start .6s ease-in-out';
  won.style.top = '100%';

  clearInterval(newFactory);
  newFactory = setInterval(randomFactory, 600);
}

function addTree(e) {
  const clickedBox = e.target;
  const value = clickedBox.dataset.value;

  if (!value) return;

  if (arrTree.indexOf(value) === -1) {
    arrTree.push(value);
  }

  if (arrFactory.indexOf(value) !== -1) {
    arrFactory.splice(arrFactory.indexOf(value), 1);
  }

  clickedBox.classList.remove('red');
  clickedBox.classList.remove('factory');
  clickedBox.classList.add('green');
  clickedBox.classList.add('tree');

  if (arrTree.length === 30) {
    winGame();
  }
}

function randomFactory() {
  const boxes = document.querySelectorAll('.box');

  const randomNumber = Math.floor(Math.random() * 30);
  const selectedBox = boxes[randomNumber];
  const value = selectedBox.dataset.value;

  if (arrFactory.indexOf(value) === -1) {
    arrFactory.push(value);
  }

  if (arrTree.indexOf(value) !== -1) {
    arrTree.splice(arrTree.indexOf(value), 1);
  }

  selectedBox.classList.add('red');
  selectedBox.classList.add('factory');
  selectedBox.classList.remove('green');
  selectedBox.classList.remove('tree');

  if (arrFactory.length === 30) {
    clearInterval(newFactory);
    alert('GAME OVER! The factories took over!');
  }
}

function winGame() {
  clearInterval(newFactory);

  document.querySelector('.hidden').classList.remove('levelUp');

  const won = document.querySelector('.won');
  won.style.animation = 'won .6s ease-in-out';
  won.style.top = '30%';
}

function fire(e) {
  const itemDim = e.target.getBoundingClientRect();

  const itemSize = {
    x: itemDim.right - itemDim.left,
    y: itemDim.bottom - itemDim.top
  };

  if (typeof mojs !== 'undefined') {
    const burst = new mojs.Burst({
      left: itemDim.left + itemSize.x / 2,
      top: itemDim.top + itemSize.y / 1.7,
      count: 9,
      radius: { 50: 90 }
    });

    burst.play();
  }
}

createGame();

const boxes = document.querySelectorAll('.box');
const startButton = document.querySelector('.start-button');
const replayButton = document.querySelector('.replay');

startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', resetGame);

boxes.forEach(function(box) {
  box.addEventListener('click', addTree);
  box.addEventListener('click', fire);
});
