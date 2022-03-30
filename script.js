// START PAGE

// Audio Button - music
// window.onload = function() {
//   document.getElementById("audio_tag").play();
// }

function audio_button() {
    let audio_button_change = document.getElementById('audio');
    let audio_control = document.getElementById('audio_tag')

    if (audio_button_change.className == 'bi bi-volume-mute-fill fa-2x') {
        audio_button_change.setAttribute('class', 'bi bi-volume-up-fill fa-2x');
        audio_control.play();
    }
    else {
        audio_button_change.setAttribute('class', 'bi bi-volume-mute-fill fa-2x');
        audio_control.pause();
    }
}

//Game Configuration

//We will use numerical representation for all elements in pacman

//We use numbers to represent walls , ghosts, coins, empty space, and pacman

let gameData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // Row 1
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1], // Row 2
  [1,2,1,1,1,1,2,1,2,1,1,1,1,2,1], // Row 3
  [1,2,1,2,2,2,2,2,2,2,2,2,1,2,1], // Row 4
  [1,2,1,2,1,1,1,1,1,1,1,2,1,2,1], // Row 5
  [1,2,1,2,2,2,2,2,2,2,2,2,1,2,1], // Row 6
  [1,2,2,2,1,4,6,1,7,8,1,2,2,2,1], // Row 7
  [1,2,1,2,1,1,1,1,1,1,1,2,1,2,1], // Row 8
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1], // Row 9
  [1,2,1,2,1,1,1,1,1,1,1,2,1,2,1], // Row 10
  [1,2,1,2,1,1,1,1,1,1,1,2,1,2,1], // Row 11
  [1,2,1,2,2,2,2,5,2,2,2,2,1,2,1], // Row 12
  [1,2,1,1,1,1,2,1,2,1,1,1,1,2,1], // Row 13
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1], // Row 14
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // Row 15
];

//the wall will be represented by 1, Coin to be represented by 2, empty space to be represented by 3
// ghosts to be represented by 4, pacman to be represented by 5

const Wall = 1;
const Coin = 2;
const Emptyspace = 3;
const Blinky = 4;
const Pacman = 5;
const Pinky = 6;
const Inky = 7;
const Clyde = 8;


//lets start with the smallest components, stating with the layouts.
//This function converts gameData arrays into DOM elements.


function createTiles(gameData) {

  // We'll keep the DOM elements in an array.
  let tilesArray = [];

  // Let's take one row at a time...
  for (let row of gameData) {
    // console.log(row);

    // Then look at each el_em in that row.
    for (let el_em of row) {
      // console.log(el_em);

      // We create a game tile as a div element.
      let tile = document.createElement('div');

      // We assign every tile the class name tile.
      tile.classList.add('tile');

      // Now, depending on the numerical value,
      // we need to add a more specific class.
      if (el_em === Wall) {
        tile.classList.add('wall');

      } else if (el_em === Coin) {
        tile.classList.add('coin');

      } else if (el_em === Emptyspace) {
        tile.classList.add('emptyspace');

      } else if(el_em === Blinky) {
          tile.classList.add('blinky');
      }
      else if (el_em === Pinky) {
        tile.classList.add('pinky');
      }
      else if (el_em === Inky) {
        tile.classList.add('inky');
      } 
      else if (el_em === Clyde) {
        tile.classList.add('clyde')
      }
      else if (el_em === Pacman) {
        tile.classList.add('pacman');
      }

      // Our individual tiles are assign a class and its their appearance are described in CSS,
      // we add DOM values of the individual tiles to the tilesArray.
      tilesArray.push(tile);
    }

    // Once we reach the end of a row array we create a break by creating a br element,
    // which tells the browser to create a line break at the end of the array.
    let brTile = document.createElement('br');

    // We then add that br element to the tilesArray.
    tilesArray.push(brTile);
  }

  // At the end of our function, we return the array to call the array tiles in them
  return tilesArray;
}


// Make all titles stay in line so it does not move out of order
let map = null;

// Draw map
function drawMap() {
  let map = document.createElement('div');

  let tiles = createTiles(gameData);

  for (let tile of tiles) {
    map.appendChild(tile);
  }

  let elem = document.getElementById('map_01');  

  elem.innerText = '';

  elem.append(map)
}

drawMap();

// variable to set actions for the different arrows that we are pressing
let pacman_pos = {
  x: 7,
  y: 11,
};

function verifyPacmanPosition() {
  let value = gameData[pacman_pos.y][pacman_pos.x];
  console.log(value === 5);
}
verifyPacmanPosition();




// General function for pacman movement
function modifyDirection(x, y) {
  // console.log(gameData[pacman_pos.y + y][pacman_pos.x + x]);

  if (gameData[pacman_pos.y + y][pacman_pos.x + x] !== Wall) {
    gameData[pacman_pos.y][pacman_pos.x] = Emptyspace;
    gameData[pacman_pos.y + y][pacman_pos.x + x] = Pacman;    
    pacman_pos.x += x;
    pacman_pos.y += y;
  }

  drawMap();
}


// The function that will move pacman with its arguments.
function movePacman(key) {
  // left
  if (key === 'ArrowLeft') {
    console.log('left');
    modifyDirection(-1, 0);
  }

  // up
  else if (key === 'ArrowUp') {
    console.log('up');
    modifyDirection(0, -1);
  }

  // right
  else if (key === 'ArrowRight') {
    console.log('right');
    modifyDirection(1, 0);
  }

  // down
  else if (key === 'ArrowDown') {
    console.log('down');
    modifyDirection(0, 1);
  }
}

function setArrowControls() {
  document.addEventListener('keydown', function(e) {
    movePacman(e.key);
  });
}

setArrowControls();

