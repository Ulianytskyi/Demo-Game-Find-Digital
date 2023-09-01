const board = document.getElementById('board');
const log = document.getElementById('log');

let arrayMain = [];

function generateArray() {
    for (let i = 0; i < 9; i++) {
        let tempArray = [];
        for (let j = 0; j < 9; j++) {

            let tile = document.createElement("div");
            let tempNumber = getRandomNumber();
            tile.id ='';
            tile.dataset.coords = i.toString()+'_'+j.toString();
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

let tilesArray = [];
let count = 0;

function handleMouseDown() {
    currTile = this;

    tilesArray.push(currTile);
  
    console.log(tilesArray.map(item => item.textContent));

    if (tilesArray.length > 0) {
        tilesArray[count].classList.add('checked');
    }

    if (tilesArray.length > 1) {

        let summm = parseInt(tilesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 1));
        
        if (parseInt(tilesArray[0].textContent) <= parseInt(tilesArray[1].textContent)) {

            console.log('LOSE');
            tilesArray[0].classList.remove('checked');
            tilesArray[1].classList.remove('checked');
            tilesArray = [];
            count = 0;

        } else if (parseInt(tilesArray[0].textContent) === summm) {
            
            console.log('win');

            tilesArray.forEach(element => {
                element.classList.remove('checked');
            });
                       
            tilesArray = [];
            count = 0;
    
        }
    }
    count++;
}


function checkCheck(currTile) {
    let tileCoords = currTile.dataset.coords.split('_');
    let row1 = parseInt(tileCoords[0]);
    let col1 = parseInt(tileCoords[1]); 
}
