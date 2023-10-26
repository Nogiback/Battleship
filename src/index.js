import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

// DOM Elements
const playerBoardDOM = document.getElementById('player-board');
const aiBoardDOM = document.getElementById('ai-board');
const message = document.getElementById('game-message');

// Player Ships
const playerCarrier = new Ship('playerCarrier', 5);
const playerBattleship = new Ship('playerBattleship', 4);
const playerCruiser = new Ship('playerCruiser', 3);
const playerSubmarine = new Ship('playerSubmarine', 3);
const playerDestroyer = new Ship('playerDestroyer', 2);
const playerShips = [
  playerCarrier,
  playerBattleship,
  playerCruiser,
  playerSubmarine,
  playerDestroyer,
];

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

playerBoard.placeShip(playerCarrier, 0, 0, true);
playerBoard.placeShip(playerBattleship, 1, 8, true);
playerBoard.placeShip(playerCruiser, 9, 3, false);
playerBoard.placeShip(playerSubmarine, 5, 3, true);
playerBoard.placeShip(playerDestroyer, 0, 2, false);

aiBoard.placeShip(aiCarrier, 0, 0, true);
aiBoard.placeShip(aiBattleship, 1, 8, true);
aiBoard.placeShip(aiCruiser, 9, 3, false);
aiBoard.placeShip(aiSubmarine, 5, 3, true);
aiBoard.placeShip(aiDestroyer, 0, 2, false);

createGameboard(player);
createGameboard(ai);

player.startTurn();

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
          handleAttackEvent(e.target);
        });
        cell.style.cursor = 'pointer';
      }
      gameboardDOM.appendChild(cell);
    }
  }
}

function handleAttackEvent(cell) {
  const x = parseInt(cell.dataset.x);
  const y = parseInt(cell.dataset.y);
  const resultPlayer = player.attack(ai, x, y);
  updateGameboard(resultPlayer);
  cell.style.pointerEvents = 'none';
  if (ai.gameboard.allShipsSunk()) {
    endGame(player);
  }
  const resultAI = ai.generateRandomAttack(player);
  updateGameboard(resultAI);
  if (player.gameboard.allShipsSunk()) {
    endGame(ai);
  }
}

function updateGameboard(playerName) {
  console.log(playerName.gameboard.getMissedAttacks());
}

function endGame(winner) {
  message.textContent = `${winner.name} has won!`;
}
