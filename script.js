const info = document.querySelector('.info');
const container = document.querySelector('.container');
const screenCover = document.querySelector('.screen-cover');

const board = document.getElementById('board');
const scoreLog = document.getElementById('score-log');
const timer = document.getElementById('timer');
const button = document.getElementById('btn');
const scoreFinal = document.getElementById('score-final');

let arrayMain = [];

// array generator ----------------------------------

function generateArray() {
  for (let i = 0; i < 9; i++) {
    let tempArray = [];
    for (let j = 0; j < 9; j++) {
      let tile = document.createElement('div');
      let tempNumber = getRandomNumber();
      tile.id = "";
      tile.dataset.coords = i.toString() + '_' + j.toString();
      tile.dataset.row = i;
      tile.dataset.col = j;
      tile.classList.add(`tile`);
      tile.textContent = tempNumber;
      tile.addEventListener("mousedown", handleMouseDown);
      board.append(tile);
      tempArray.push(tile);
    }
    arrayMain.push(tempArray);
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

generateArray();

// events ----------------------------------------------------------------------

let currTile;
let tilesArray = [];
let count = 0;
let row1, col1;
let score = 0;

function handleMouseDown() {
  currTile = this;
  
  currTile.removeEventListener('mousedown', handleMouseDown);
  
  if (currTile.id != 'found') {
    console.log('=>', currTile.dataset.row, currTile.dataset.col);
    tilesArray.push(currTile);
    currTile.classList.add('checked');
     
    // console.log(tilesArray.map((item) => item.textContent));
    removeListeners();

    if (tilesArray.length > 1) {
      count++;
      
      tilesArray[count].removeEventListener('mousedown', handleMouseDown);
        
      let sumArray = 0;
      for (let k = 1; k < tilesArray.length; k++) {
          sumArray += parseInt(tilesArray[k].textContent);
      }

      if (tilesArray[0].textContent <= tilesArray[1].textContent ||
        tilesArray[0].textContent < sumArray) {
        score -= parseInt(tilesArray[0].textContent);
        addListeners();
        checkWinLose (0);
      } else if (tilesArray[0].textContent == sumArray) {
        score += parseInt(tilesArray[0].textContent);
        addListeners();
        checkWinLose (1);
      }
    }
  }
}

function checkWinLose(index) {
  tilesArray.forEach((element) => {
    element.classList.remove('checked');
    if (index == 0) {
      
      element.classList.add('red');
      element.classList.add('cursor');

    } else if (index == 1) {
      
      element.classList.add('blue');
      element.classList.add('cursor');

    }
    // element.id = 'found';
    element.textContent = '0';

    setTimeout(() => {
      moveDown();
    }, 500);
    
    setTimeout(() => {
      moveDown();
    }, 500);

    setTimeout(() => {
      moveDown();
    }, 500);

    setTimeout(() => {
      fillNewDigitals();
    }, 500);
   
  });
  scoreLog.innerHTML = `Score: ${score}`;
  tilesArray = [];
  count = 0;
}

function addListeners() {
  arrayMain.forEach(element => {
    for (let i = 0; i < element.length; i++) {
      if (element[i].textContent != '0') {
        element[i].addEventListener('mousedown', handleMouseDown);
      }
    }
  });
}

function removeListeners() {
  arrayMain.forEach(element => {
    for (let i = 0; i < element.length; i++) {
      if (element[i].textContent != '0') {
        element[i].removeEventListener('mousedown', handleMouseDown);
      }
    }
  });
  checkMove();
}

function checkMove() {
  let row = parseInt(tilesArray[0].dataset.row);
  let col = parseInt(tilesArray[0].dataset.col);
  
  if (arrayMain[row] && arrayMain[row][col+1]) {
    arrayMain[row][col+1].addEventListener('mousedown', handleMouseDown);
  }
  if (arrayMain[row] && arrayMain[row][col-1]) {
    arrayMain[row][col-1].addEventListener('mousedown', handleMouseDown);
  }
  if (arrayMain[row+1] && arrayMain[row+1][col]) {
    arrayMain[row+1][col].addEventListener('mousedown', handleMouseDown);
  }
  if (arrayMain[row-1] && arrayMain[row-1][col]) {
    arrayMain[row-1][col].addEventListener('mousedown', handleMouseDown);
  }
}

// move down -------------------------------------

function moveDown() {
  let emptyCellsFound = true;
  while (emptyCellsFound) {
    for (let col = 0; col < arrayMain[0].length; col++) {
      for (let row = arrayMain.length - 1; row > 0; row--) {        
        if (arrayMain[row][col].textContent == '0') {
          arrayMain[row][col].textContent = arrayMain[row - 1][col].textContent;
          arrayMain[row][col].classList.remove('cursor');
          arrayMain[row - 1][col].textContent = '0';
        }
        emptyCellsFound = false; 
      }
    }
  }
}

function fillNewDigitals(){
  const redStyle = 'red';
   const blueStyle = 'blue';
   arrayMain.forEach(element => {
       for (let i = 0; i < element.length; i++) {
           const tile = element[i];
           if (tile.textContent === '0') {
               tile.textContent = getRandomNumber();
               tile.classList.remove('cursor');
               
           }
           if (tile.classList.contains(redStyle)) {
            tile.classList.remove(redStyle);
        } else if (tile.classList.contains(blueStyle)) {
            tile.classList.remove(blueStyle);
        }
       }
   });
}

// timer ------------------------------

let sec = 99;
let timeTick = 1000;
let myTimer = setInterval (() => {
  timer.innerHTML = `Time: ${sec--}`;
  if (sec < 0) {
    clearInterval(myTimer);
    timer.innerHTML = `Time out`;

    info.classList.add('hide');
    container.classList.add('hide');
    button.classList.remove('hide');
    button.textContent = 'Restart';
    screenCover.classList.remove('hide');
    scoreFinal.classList.remove('hide');
    scoreFinal.innerHTML = `Final Score: ${score}`;

    arrayMain.forEach(element => {
      for (let i = 0; i < element.length; i++) {
          element[i].removeEventListener('mousedown', handleMouseDown);
          element[i].classList.add('cursor');
      }
    });
  }
}, timeTick);

// buttons and info -----------------

button.addEventListener('click', () => {

  if (button.textContent == 'Restart') {
    location.reload();
  } else {
    info.classList.remove('hide');
    container.classList.remove('hide');
    button.classList.add('hide');
    screenCover.classList.add('hide');
    sec = 99;
    timeTick = 1000;
  }

});
