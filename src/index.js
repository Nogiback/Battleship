import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

// DOM Elements
const message = document.getElementById('game-message');
const shipContainer = document.getElementById('add-ships-container');
const shipsDOM = document.querySelectorAll('.ship');
const playerSide = document.querySelector('#player-side');
const aiSide = document.querySelector('#ai-side');

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

shipsDOM.forEach((ship) => {
  ship.addEventListener('click', toggleShipDirection);
  ship.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

placeAIShips();

createGameboard(player);
createGameboard(ai);

player.startTurn();

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
  if (playerName.name === 'Player') {
    gameboardDOM = document.getElementById('player-board');
  } else {
    gameboardDOM = document.getElementById('ai-board');
  }

  for (let y = 0; y < playerName.gameboard.size; y++) {
    for (let x = 0; x < playerName.gameboard.size; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.textContent = `${x},${y}`;
      if (playerName.name === 'Computer') {
        cell.addEventListener('click', (e) => {
          handlePlayerAttack(e.target);
        });
        cell.style.cursor = 'pointer';
      } else if (playerName.name === 'Player') {
        cell.addEventListener('dragover', (e) => {
          e.preventDefault();
        });
        cell.addEventListener('drop', (e) => {
          e.preventDefault();
          dropPlayerShip(e);
        });
      }
      gameboardDOM.appendChild(cell);
    }
  }
}

function dropPlayerShip(e) {
  const shipName = e.dataTransfer.getData('text');
  const x = parseInt(e.target.getAttribute('data-x'));
  const y = parseInt(e.target.getAttribute('data-y'));
  const carrierDOM = document.querySelector('#carrier');
  const battleshipDOM = document.querySelector('#battleship');
  const cruiserDOM = document.querySelector('#cruiser');
  const submarineDOM = document.querySelector('#submarine');
  const destroyerDOM = document.querySelector('#destroyer');
  let horizontal;

  switch (shipName) {
    case 'carrier':
      if (carrierDOM.getAttribute('data-horizontal') === 'false') {
        horizontal = false;
      } else {
        horizontal = true;
      }
      if (player.gameboard.isValidPosition(playerCarrier, x, y, horizontal)) {
        player.gameboard.placeShip(playerCarrier, x, y, horizontal);
        renderShips(player);
        shipContainer.removeChild(carrierDOM);
        if (shipContainer.childNodes.length <= 6) {
          shipContainer.style.display = 'none';
          aiSide.style.display = 'flex';
        }
      }
      break;
    case 'battleship':
      if (battleshipDOM.getAttribute('data-horizontal') === 'false') {
        horizontal = false;
      } else {
        horizontal = true;
      }
      if (
        player.gameboard.isValidPosition(playerBattleship, x, y, horizontal)
      ) {
        player.gameboard.placeShip(playerBattleship, x, y, horizontal);
        renderShips(player);
        shipContainer.removeChild(battleshipDOM);
        if (shipContainer.childNodes.length <= 6) {
          shipContainer.style.display = 'none';
          aiSide.style.display = 'flex';
        }
      }
      break;
    case 'cruiser':
      if (cruiserDOM.getAttribute('data-horizontal') === 'false') {
        horizontal = false;
      } else {
        horizontal = true;
      }
      if (player.gameboard.isValidPosition(playerCruiser, x, y, horizontal)) {
        player.gameboard.placeShip(playerCruiser, x, y, horizontal);
        renderShips(player);
        shipContainer.removeChild(cruiserDOM);
        if (shipContainer.childNodes.length <= 6) {
          shipContainer.style.display = 'none';
          aiSide.style.display = 'flex';
        }
      }
      break;
    case 'submarine':
      if (submarineDOM.getAttribute('data-horizontal') === 'false') {
        horizontal = false;
      } else {
        horizontal = true;
      }
      if (player.gameboard.isValidPosition(playerSubmarine, x, y, horizontal)) {
        player.gameboard.placeShip(playerSubmarine, x, y, horizontal);
        renderShips(player);
        shipContainer.removeChild(submarineDOM);
        if (shipContainer.childNodes.length <= 6) {
          shipContainer.style.display = 'none';
          aiSide.style.display = 'flex';
        }
      }
      break;
    case 'destroyer':
      if (destroyerDOM.getAttribute('data-horizontal') === 'false') {
        horizontal = false;
      } else {
        horizontal = true;
      }
      if (player.gameboard.isValidPosition(playerDestroyer, x, y, horizontal)) {
        player.gameboard.placeShip(playerDestroyer, x, y, horizontal);
        renderShips(player);
        shipContainer.removeChild(destroyerDOM);
        if (shipContainer.childNodes.length <= 6) {
          shipContainer.style.display = 'none';
          aiSide.style.display = 'flex';
        }
      }
      break;
  }
}

function renderShips(player) {
  const playerGameboard = player.gameboard.board;
  console.log(playerGameboard);

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

function updateGameboard(result, cell) {
  if (result) {
    cell.classList.add('hit');
  } else {
    cell.classList.add('miss');
  }
}

function endGame(winner) {
  message.textContent = `${winner.name} has won!`;
}
