import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

// DOM Elements
const mainMessage = document.querySelector('#main-message');
const secondMessage = document.querySelector('#secondary-message');
const shipContainer = document.querySelector('#add-ships-container');
const shipsDOM = document.querySelectorAll('.ship');
const playerSide = document.querySelector('#player-side');
const aiSide = document.querySelector('#ai-side');
const startBtn = document.querySelector('#start-btn');
const nameModal = document.querySelector('#name-modal');
const closeModal = document.querySelector('#close-modal');
const submitBtn = document.querySelector('#submit-btn');
const nameField = document.querySelector('#name');
const playerTitle = document.querySelector('#player-title');
const endgameModal = document.querySelector('#endgame-modal');
const winnerTitle = document.querySelector('#winner-title');
const restartBtn = document.querySelector('#restart-btn');

// Player Ships
const playerCarrier = new Ship('playerCarrier', 5);
const playerBattleship = new Ship('playerBattleship', 4);
const playerCruiser = new Ship('playerCruiser', 3);
const playerSubmarine = new Ship('playerSubmarine', 3);
const playerDestroyer = new Ship('playerDestroyer', 2);

// AI Ships
const aiCarrier = new Ship('aiCarrier', 5);
const aiBattleship = new Ship('aiBattleship', 4);
const aiCruiser = new Ship('aiCruiser', 3);
const aiSubmarine = new Ship('aiSubmarine', 3);
const aiDestroyer = new Ship('aiDestroyer', 2);
const aiShips = [aiCarrier, aiBattleship, aiCruiser, aiSubmarine, aiDestroyer];

// Initialize player/AI players and gameboards
const playerBoard = new Gameboard(10);
const aiBoard = new Gameboard(10);
const player = new Player('Player', playerBoard);
const ai = new Player('Computer', aiBoard);

startBtn.addEventListener('click', () => {
  nameModal.showModal();
  nameField.focus();
});

closeModal.addEventListener('click', () => {
  nameModal.close();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  player.setName(nameField.value);
  playerTitle.textContent = `${player.getName()}'s Board`;
  nameModal.close();
  startBtn.style.display = 'none';
  shipContainer.style.pointerEvents = 'auto';
  mainMessage.textContent = 'Drag and drop your ships!';
  secondMessage.textContent = 'Click to rotate them!';
});

// Allow ship placement and generate gameboards
shipsDOM.forEach((ship) => {
  ship.addEventListener('click', toggleShipDirection);
  ship.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

placeAIShips();

createGameboard(player);
createGameboard(ai);

// Start game with player
player.startTurn();

// Randomly place AI ships onto its respective gameboard
function placeAIShips() {
  aiShips.forEach((ship) => {
    let x, y, horizontal;
    do {
      x = Math.floor(Math.random() * aiBoard.size);
      y = Math.floor(Math.random() * aiBoard.size);
      horizontal = Math.random() < 0.5;
    } while (!aiBoard.isValidPosition(ship, x, y, horizontal));
    aiBoard.placeShip(ship, x, y, horizontal);
  });
}

function toggleShipDirection() {
  if (shipContainer.style.flexDirection === 'column') {
    shipsDOM.forEach((ship) => {
      ship.style.display = 'block';
      ship.dataset.horizontal = 'false';
    });
    shipContainer.style.flexDirection = 'row';
  } else {
    shipsDOM.forEach((ship) => {
      ship.style.display = 'flex';
      ship.dataset.horizontal = 'true';
    });
    shipContainer.style.flexDirection = 'column';
  }
}

function createGameboard(playerName) {
  let gameboardDOM;
  if (playerName.name === 'Computer') {
    gameboardDOM = document.querySelector('#ai-board');
  } else {
    gameboardDOM = document.querySelector('#player-board');
  }

  for (let y = 0; y < playerName.gameboard.size; y++) {
    for (let x = 0; x < playerName.gameboard.size; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      //cell.textContent = `${x},${y}`;

      // Applying event listeners to the cells for attacking and ship placement
      if (playerName.name === 'Computer') {
        cell.addEventListener('click', (e) => {
          handlePlayerAttack(e.target);
        });
        cell.style.cursor = 'pointer';
      } else {
        cell.addEventListener('dragover', (e) => {
          e.preventDefault();
        });
        cell.addEventListener('drop', (e) => {
          e.preventDefault();
          dropShipHandler(e);
        });
      }
      gameboardDOM.appendChild(cell);
    }
  }
}

function dropShipHandler(e) {
  const shipName = e.dataTransfer.getData('text');
  const x = parseInt(e.target.getAttribute('data-x'));
  const y = parseInt(e.target.getAttribute('data-y'));
  const carrierDOM = document.querySelector('#carrier');
  const battleshipDOM = document.querySelector('#battleship');
  const cruiserDOM = document.querySelector('#cruiser');
  const submarineDOM = document.querySelector('#submarine');
  const destroyerDOM = document.querySelector('#destroyer');

  // Placing ship onto gameboard and DOM gameboard depending on ship type
  switch (shipName) {
    case 'carrier':
      placePlayerShip(carrierDOM, playerCarrier, x, y);
      break;
    case 'battleship':
      placePlayerShip(battleshipDOM, playerBattleship, x, y);
      break;
    case 'cruiser':
      placePlayerShip(cruiserDOM, playerCruiser, x, y);
      break;
    case 'submarine':
      placePlayerShip(submarineDOM, playerSubmarine, x, y);
      break;
    case 'destroyer':
      placePlayerShip(destroyerDOM, playerDestroyer, x, y);
      break;
  }
}

function placePlayerShip(shipDOM, playerShip, x, y) {
  const horizontal = shipDOM.getAttribute('data-horizontal') === 'true';

  if (player.gameboard.isValidPosition(playerShip, x, y, horizontal)) {
    player.gameboard.placeShip(playerShip, x, y, horizontal);
    renderShips(player);
    shipContainer.removeChild(shipDOM);
    if (shipContainer.childNodes.length <= 6) {
      shipContainer.style.display = 'none';
      aiSide.style.display = 'flex';
      mainMessage.textContent = 'Sink all the enemy ships!';
      secondMessage.textContent = 'Click the enemy board to attack!';
      playerSide.style.pointerEvents = 'none';
    }
  }
}

function renderShips(player) {
  const playerGameboard = player.gameboard.board;

  playerGameboard.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell instanceof Ship) {
        let selectedCell = document.querySelector(
          `#player-board [data-x="${x}"][data-y="${y}"]`,
        );
        selectedCell.classList.add('occupied');
      }
    });
  });
}

function handlePlayerAttack(cell) {
  const x = parseInt(cell.dataset.x);
  const y = parseInt(cell.dataset.y);
  const attackInfo = player.attack(ai, x, y);
  const result = attackInfo.result;
  updateGameboard(result, cell);
  cell.style.pointerEvents = 'none';
  if (ai.gameboard.allShipsSunk()) {
    endGame(player);
  }
  handleAIAttack();
}

function handleAIAttack() {
  const attackInfo = ai.generateRandomAttack(player);
  const x = attackInfo.x;
  const y = attackInfo.y;
  const result = attackInfo.result;
  const cell = document.querySelector(
    `#player-board [data-x="${x}"][data-y="${y}"]`,
  );
  updateGameboard(result, cell);
  if (player.gameboard.allShipsSunk()) {
    endGame(ai);
  }
}

// Applying hit or miss attributes to the cell depending on the result of the attacks
function updateGameboard(result, cell) {
  if (result) {
    cell.classList.add('hit', 'fa-solid', 'fa-skull');
  } else {
    cell.classList.add('miss', 'fa-solid', 'fa-x');
  }
}

function endGame(winner) {
  mainMessage.textContent = `GAME OVER`;
  secondMessage.textContent = `${winner.getName()} Wins!`;
  aiSide.style.pointerEvents = 'none';
  endgameModal.show();
  winnerTitle.textContent = `${winner.getName()} Wins!`;
  restartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    endgameModal.close();
    window.location.reload();
  });
}
