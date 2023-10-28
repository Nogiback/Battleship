/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


class Gameboard {
  constructor(size) {
    this.size = size;
    this.ships = [];
    this.board = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    this.missedAttacks = Array(size)
      .fill()
      .map(() => Array(size).fill(false));
  }

  getSize() {
    return this.size;
  }

  getShips() {
    return this.ships;
  }

  getBoard() {
    return this.board;
  }

  getMissedAttacks() {
    return this.missedAttacks;
  }

  isValidPosition(ship, x, y, horizontal) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) return false;

    if (horizontal) {
      if (x + ship.length > this.size) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y] !== null) return false;
      }
    } else {
      if (y + ship.length > this.size) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i] !== null) return false;
      }
    }

    return true;
  }

  placeShip(ship, x, y, horizontal) {
    if (this.isValidPosition(ship, x, y, horizontal)) {
      if (horizontal) {
        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.board[x][y + i] = ship;
        }
      }
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === null) {
      this.missedAttacks[x][y] = true;
      return false;
    }
    if (this.board[x][y] instanceof _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.board[x][y].hits[this.board[x][y].hits.indexOf(false)] = true;
      return true;
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
    this.turn = false;
    this.usedCoordinates = [];
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getGameboard() {
    return this.gameboard;
  }

  attack(opponent, x, y) {
    if (this.checkTurn()) {
      const result = opponent.gameboard.receiveAttack(x, y);
      this.turn = false;
      opponent.startTurn();
      return { result, x, y };
    }
    return false;
  }

  generateRandomAttack(opponent) {
    if (this.checkTurn()) {
      const size = opponent.gameboard.size;
      let x;
      let y;
      do {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
      } while (
        this.usedCoordinates.some((coord) => coord.x === x && coord.y === y)
      );
      this.usedCoordinates.push({ x, y });
      return this.attack(opponent, x, y);
    }
    return false;
  }

  endTurn() {
    this.turn = false;
  }

  startTurn() {
    this.turn = true;
  }

  checkTurn() {
    return this.turn;
  }
}


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = Array(length).fill(false);
  }

  hit(position) {
    this.hits[position] = true;
  }

  getHits() {
    return this.hits;
  }

  getLength() {
    return this.length;
  }

  isSunk() {
    return this.hits.every((hit) => hit);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");




// DOM Elements
const message = document.getElementById('game-message');
const shipContainer = document.getElementById('add-ships-container');
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
const playerCarrier = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerCarrier', 5);
const playerBattleship = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerBattleship', 4);
const playerCruiser = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerCruiser', 3);
const playerSubmarine = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerSubmarine', 3);
const playerDestroyer = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerDestroyer', 2);

// AI Ships
const aiCarrier = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('aiCarrier', 5);
const aiBattleship = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('aiBattleship', 4);
const aiCruiser = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('aiCruiser', 3);
const aiSubmarine = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('aiSubmarine', 3);
const aiDestroyer = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('aiDestroyer', 2);
const aiShips = [aiCarrier, aiBattleship, aiCruiser, aiSubmarine, aiDestroyer];

// Initialize player/AI players and gameboards
const playerBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"](10);
const aiBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"](10);
const player = new _Player__WEBPACK_IMPORTED_MODULE_0__["default"]('Player', playerBoard);
const ai = new _Player__WEBPACK_IMPORTED_MODULE_0__["default"]('Computer', aiBoard);

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
  message.textContent = 'Place your ships! Click to rotate them!';
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
      cell.textContent = `${x},${y}`;
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
          message.textContent = 'Attack! Sink all the enemy ships!';
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
          message.textContent = 'Attack! Sink all the enemy ships!';
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
          message.textContent = 'Attack! Sink all the enemy ships!';
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
          message.textContent = 'Attack! Sink all the enemy ships!';
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
          message.textContent = 'Attack! Sink all the enemy ships!';
        }
      }
      break;
  }
}

function renderShips(player) {
  const playerGameboard = player.gameboard.board;

  playerGameboard.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell instanceof _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]) {
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
  aiSide.style.pointerEvents = 'none';
  endgameModal.show();
  winnerTitle.textContent = `${winner.getName()} Wins!`;
  restartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    endgameModal.close();
    window.location.reload();
  });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qiw2Q0FBSTtBQUM5QjtBQUNBLG9DQUFvQyxFQUFFLGFBQWEsRUFBRTtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsRUFBRSxhQUFhLEVBQUU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsYUFBYTtBQUN4QztBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5KHNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBBcnJheShzaXplKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBBcnJheShzaXplKVxuICAgICAgLmZpbGwoKVxuICAgICAgLm1hcCgoKSA9PiBBcnJheShzaXplKS5maWxsKGZhbHNlKSk7XG4gIH1cblxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICBnZXRTaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcztcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG5cbiAgZ2V0TWlzc2VkQXR0YWNrcygpIHtcbiAgICByZXR1cm4gdGhpcy5taXNzZWRBdHRhY2tzO1xuICB9XG5cbiAgaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGhvcml6b250YWwpIHtcbiAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLnNpemUgfHwgeSA8IDAgfHwgeSA+PSB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICBpZiAoeCArIHNoaXAubGVuZ3RoID4gdGhpcy5zaXplKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh5ICsgc2hpcC5sZW5ndGggPiB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5ICsgaV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCB4LCB5LCBob3Jpem9udGFsKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGhvcml6b250YWwpKSB7XG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1pc3NlZEF0dGFja3NbeF1beV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0c1t0aGlzLmJvYXJkW3hdW3ldLmhpdHMuaW5kZXhPZihmYWxzZSldID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgdGhpcy51c2VkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkO1xuICB9XG5cbiAgYXR0YWNrKG9wcG9uZW50LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tUdXJuKCkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgICBvcHBvbmVudC5zdGFydFR1cm4oKTtcbiAgICAgIHJldHVybiB7IHJlc3VsdCwgeCwgeSB9O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZW5lcmF0ZVJhbmRvbUF0dGFjayhvcHBvbmVudCkge1xuICAgIGlmICh0aGlzLmNoZWNrVHVybigpKSB7XG4gICAgICBjb25zdCBzaXplID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnNpemU7XG4gICAgICBsZXQgeDtcbiAgICAgIGxldCB5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2l6ZSk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbiAgICAgIH0gd2hpbGUgKFxuICAgICAgICB0aGlzLnVzZWRDb29yZGluYXRlcy5zb21lKChjb29yZCkgPT4gY29vcmQueCA9PT0geCAmJiBjb29yZC55ID09PSB5KVxuICAgICAgKTtcbiAgICAgIHRoaXMudXNlZENvb3JkaW5hdGVzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrKG9wcG9uZW50LCB4LCB5KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZW5kVHVybigpIHtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXJ0VHVybigpIHtcbiAgICB0aGlzLnR1cm4gPSB0cnVlO1xuICB9XG5cbiAgY2hlY2tUdXJuKCkge1xuICAgIHJldHVybiB0aGlzLnR1cm47XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IEFycmF5KGxlbmd0aCkuZmlsbChmYWxzZSk7XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICB0aGlzLmhpdHNbcG9zaXRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIGdldEhpdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cy5ldmVyeSgoaGl0KSA9PiBoaXQpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG4vLyBET00gRWxlbWVudHNcbmNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1tZXNzYWdlJyk7XG5jb25zdCBzaGlwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1zaGlwcy1jb250YWluZXInKTtcbmNvbnN0IHNoaXBzRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcbmNvbnN0IHBsYXllclNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLXNpZGUnKTtcbmNvbnN0IGFpU2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhaS1zaWRlJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcbmNvbnN0IG5hbWVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lLW1vZGFsJyk7XG5jb25zdCBjbG9zZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vZGFsJyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LWJ0bicpO1xuY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcbmNvbnN0IHBsYXllclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci10aXRsZScpO1xuY29uc3QgZW5kZ2FtZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZGdhbWUtbW9kYWwnKTtcbmNvbnN0IHdpbm5lclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbm5lci10aXRsZScpO1xuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0LWJ0bicpO1xuXG4vLyBQbGF5ZXIgU2hpcHNcbmNvbnN0IHBsYXllckNhcnJpZXIgPSBuZXcgU2hpcCgncGxheWVyQ2FycmllcicsIDUpO1xuY29uc3QgcGxheWVyQmF0dGxlc2hpcCA9IG5ldyBTaGlwKCdwbGF5ZXJCYXR0bGVzaGlwJywgNCk7XG5jb25zdCBwbGF5ZXJDcnVpc2VyID0gbmV3IFNoaXAoJ3BsYXllckNydWlzZXInLCAzKTtcbmNvbnN0IHBsYXllclN1Ym1hcmluZSA9IG5ldyBTaGlwKCdwbGF5ZXJTdWJtYXJpbmUnLCAzKTtcbmNvbnN0IHBsYXllckRlc3Ryb3llciA9IG5ldyBTaGlwKCdwbGF5ZXJEZXN0cm95ZXInLCAyKTtcblxuLy8gQUkgU2hpcHNcbmNvbnN0IGFpQ2FycmllciA9IG5ldyBTaGlwKCdhaUNhcnJpZXInLCA1KTtcbmNvbnN0IGFpQmF0dGxlc2hpcCA9IG5ldyBTaGlwKCdhaUJhdHRsZXNoaXAnLCA0KTtcbmNvbnN0IGFpQ3J1aXNlciA9IG5ldyBTaGlwKCdhaUNydWlzZXInLCAzKTtcbmNvbnN0IGFpU3VibWFyaW5lID0gbmV3IFNoaXAoJ2FpU3VibWFyaW5lJywgMyk7XG5jb25zdCBhaURlc3Ryb3llciA9IG5ldyBTaGlwKCdhaURlc3Ryb3llcicsIDIpO1xuY29uc3QgYWlTaGlwcyA9IFthaUNhcnJpZXIsIGFpQmF0dGxlc2hpcCwgYWlDcnVpc2VyLCBhaVN1Ym1hcmluZSwgYWlEZXN0cm95ZXJdO1xuXG4vLyBJbml0aWFsaXplIHBsYXllci9BSSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoMTApO1xuY29uc3QgYWlCb2FyZCA9IG5ldyBHYW1lYm9hcmQoMTApO1xuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcignUGxheWVyJywgcGxheWVyQm9hcmQpO1xuY29uc3QgYWkgPSBuZXcgUGxheWVyKCdDb21wdXRlcicsIGFpQm9hcmQpO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbmFtZU1vZGFsLnNob3dNb2RhbCgpO1xuICBuYW1lRmllbGQuZm9jdXMoKTtcbn0pO1xuXG5jbG9zZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBuYW1lTW9kYWwuY2xvc2UoKTtcbn0pO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHBsYXllci5zZXROYW1lKG5hbWVGaWVsZC52YWx1ZSk7XG4gIHBsYXllclRpdGxlLnRleHRDb250ZW50ID0gYCR7cGxheWVyLmdldE5hbWUoKX0ncyBCb2FyZGA7XG4gIG5hbWVNb2RhbC5jbG9zZSgpO1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBzaGlwQ29udGFpbmVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gIG1lc3NhZ2UudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyEgQ2xpY2sgdG8gcm90YXRlIHRoZW0hJztcbn0pO1xuXG4vLyBBbGxvdyBzaGlwIHBsYWNlbWVudCBhbmQgZ2VuZXJhdGUgZ2FtZWJvYXJkc1xuc2hpcHNET00uZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2hpcERpcmVjdGlvbik7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgZS50YXJnZXQuaWQpO1xuICB9KTtcbn0pO1xuXG5wbGFjZUFJU2hpcHMoKTtcblxuY3JlYXRlR2FtZWJvYXJkKHBsYXllcik7XG5jcmVhdGVHYW1lYm9hcmQoYWkpO1xuXG4vLyBTdGFydCBnYW1lIHdpdGggcGxheWVyXG5wbGF5ZXIuc3RhcnRUdXJuKCk7XG5cbi8vIFJhbmRvbWx5IHBsYWNlIEFJIHNoaXBzIG9udG8gaXRzIHJlc3BlY3RpdmUgZ2FtZWJvYXJkXG5mdW5jdGlvbiBwbGFjZUFJU2hpcHMoKSB7XG4gIGFpU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCB4LCB5LCBob3Jpem9udGFsO1xuICAgIGRvIHtcbiAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhaUJvYXJkLnNpemUpO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFpQm9hcmQuc2l6ZSk7XG4gICAgICBob3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcbiAgICB9IHdoaWxlICghYWlCb2FyZC5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgaG9yaXpvbnRhbCkpO1xuICAgIGFpQm9hcmQucGxhY2VTaGlwKHNoaXAsIHgsIHksIGhvcml6b250YWwpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlU2hpcERpcmVjdGlvbigpIHtcbiAgaWYgKHNoaXBDb250YWluZXIuc3R5bGUuZmxleERpcmVjdGlvbiA9PT0gJ2NvbHVtbicpIHtcbiAgICBzaGlwc0RPTS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgc2hpcC5kYXRhc2V0Lmhvcml6b250YWwgPSAnZmFsc2UnO1xuICAgIH0pO1xuICAgIHNoaXBDb250YWluZXIuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdyb3cnO1xuICB9IGVsc2Uge1xuICAgIHNoaXBzRE9NLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIHNoaXAuZGF0YXNldC5ob3Jpem9udGFsID0gJ3RydWUnO1xuICAgIH0pO1xuICAgIHNoaXBDb250YWluZXIuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVib2FyZChwbGF5ZXJOYW1lKSB7XG4gIGxldCBnYW1lYm9hcmRET007XG4gIGlmIChwbGF5ZXJOYW1lLm5hbWUgPT09ICdDb21wdXRlcicpIHtcbiAgICBnYW1lYm9hcmRET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWktYm9hcmQnKTtcbiAgfSBlbHNlIHtcbiAgICBnYW1lYm9hcmRET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJyk7XG4gIH1cblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IHBsYXllck5hbWUuZ2FtZWJvYXJkLnNpemU7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgcGxheWVyTmFtZS5nYW1lYm9hcmQuc2l6ZTsgeCsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgIGNlbGwuZGF0YXNldC54ID0geDtcbiAgICAgIGNlbGwuZGF0YXNldC55ID0geTtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBgJHt4fSwke3l9YDtcbiAgICAgIGlmIChwbGF5ZXJOYW1lLm5hbWUgPT09ICdDb21wdXRlcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaGFuZGxlUGxheWVyQXR0YWNrKGUudGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGwuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZHJvcFBsYXllclNoaXAoZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkRE9NLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkcm9wUGxheWVyU2hpcChlKSB7XG4gIGNvbnN0IHNoaXBOYW1lID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xuICBjb25zdCB4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSk7XG4gIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKTtcbiAgY29uc3QgY2FycmllckRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJyaWVyJyk7XG4gIGNvbnN0IGJhdHRsZXNoaXBET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlc2hpcCcpO1xuICBjb25zdCBjcnVpc2VyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NydWlzZXInKTtcbiAgY29uc3Qgc3VibWFyaW5lRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1hcmluZScpO1xuICBjb25zdCBkZXN0cm95ZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzdHJveWVyJyk7XG4gIGxldCBob3Jpem9udGFsO1xuXG4gIHN3aXRjaCAoc2hpcE5hbWUpIHtcbiAgICBjYXNlICdjYXJyaWVyJzpcbiAgICAgIGlmIChjYXJyaWVyRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyQ2FycmllciwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyQ2FycmllciwgeCwgeSwgaG9yaXpvbnRhbCk7XG4gICAgICAgIHJlbmRlclNoaXBzKHBsYXllcik7XG4gICAgICAgIHNoaXBDb250YWluZXIucmVtb3ZlQ2hpbGQoY2FycmllckRPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgbWVzc2FnZS50ZXh0Q29udGVudCA9ICdBdHRhY2shIFNpbmsgYWxsIHRoZSBlbmVteSBzaGlwcyEnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXR0bGVzaGlwJzpcbiAgICAgIGlmIChiYXR0bGVzaGlwRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc2l0aW9uKHBsYXllckJhdHRsZXNoaXAsIHgsIHksIGhvcml6b250YWwpXG4gICAgICApIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyQmF0dGxlc2hpcCwgeCwgeSwgaG9yaXpvbnRhbCk7XG4gICAgICAgIHJlbmRlclNoaXBzKHBsYXllcik7XG4gICAgICAgIHNoaXBDb250YWluZXIucmVtb3ZlQ2hpbGQoYmF0dGxlc2hpcERPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgbWVzc2FnZS50ZXh0Q29udGVudCA9ICdBdHRhY2shIFNpbmsgYWxsIHRoZSBlbmVteSBzaGlwcyEnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcnVpc2VyJzpcbiAgICAgIGlmIChjcnVpc2VyRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyQ3J1aXNlciwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyQ3J1aXNlciwgeCwgeSwgaG9yaXpvbnRhbCk7XG4gICAgICAgIHJlbmRlclNoaXBzKHBsYXllcik7XG4gICAgICAgIHNoaXBDb250YWluZXIucmVtb3ZlQ2hpbGQoY3J1aXNlckRPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgbWVzc2FnZS50ZXh0Q29udGVudCA9ICdBdHRhY2shIFNpbmsgYWxsIHRoZSBlbmVteSBzaGlwcyEnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdWJtYXJpbmUnOlxuICAgICAgaWYgKHN1Ym1hcmluZURPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9yaXpvbnRhbCcpID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc2l0aW9uKHBsYXllclN1Ym1hcmluZSwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyU3VibWFyaW5lLCB4LCB5LCBob3Jpem9udGFsKTtcbiAgICAgICAgcmVuZGVyU2hpcHMocGxheWVyKTtcbiAgICAgICAgc2hpcENvbnRhaW5lci5yZW1vdmVDaGlsZChzdWJtYXJpbmVET00pO1xuICAgICAgICBpZiAoc2hpcENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA8PSA2KSB7XG4gICAgICAgICAgc2hpcENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGFpU2lkZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSAnQXR0YWNrISBTaW5rIGFsbCB0aGUgZW5lbXkgc2hpcHMhJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGVzdHJveWVyJzpcbiAgICAgIGlmIChkZXN0cm95ZXJET00uZ2V0QXR0cmlidXRlKCdkYXRhLWhvcml6b250YWwnKSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICBob3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmlzVmFsaWRQb3NpdGlvbihwbGF5ZXJEZXN0cm95ZXIsIHgsIHksIGhvcml6b250YWwpKSB7XG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHBsYXllckRlc3Ryb3llciwgeCwgeSwgaG9yaXpvbnRhbCk7XG4gICAgICAgIHJlbmRlclNoaXBzKHBsYXllcik7XG4gICAgICAgIHNoaXBDb250YWluZXIucmVtb3ZlQ2hpbGQoZGVzdHJveWVyRE9NKTtcbiAgICAgICAgaWYgKHNoaXBDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPD0gNikge1xuICAgICAgICAgIHNoaXBDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBhaVNpZGUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gJ0F0dGFjayEgU2luayBhbGwgdGhlIGVuZW15IHNoaXBzISc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKHBsYXllcikge1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkO1xuXG4gIHBsYXllckdhbWVib2FyZC5mb3JFYWNoKChyb3csIHgpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgeSkgPT4ge1xuICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAjcGxheWVyLWJvYXJkIFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gLFxuICAgICAgICApO1xuICAgICAgICBzZWxlY3RlZENlbGwuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYXllckF0dGFjayhjZWxsKSB7XG4gIGNvbnN0IHggPSBwYXJzZUludChjZWxsLmRhdGFzZXQueCk7XG4gIGNvbnN0IHkgPSBwYXJzZUludChjZWxsLmRhdGFzZXQueSk7XG4gIGNvbnN0IGF0dGFja0luZm8gPSBwbGF5ZXIuYXR0YWNrKGFpLCB4LCB5KTtcbiAgY29uc3QgcmVzdWx0ID0gYXR0YWNrSW5mby5yZXN1bHQ7XG4gIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpO1xuICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGlmIChhaS5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKHBsYXllcik7XG4gIH1cbiAgaGFuZGxlQUlBdHRhY2soKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQUlBdHRhY2soKSB7XG4gIGNvbnN0IGF0dGFja0luZm8gPSBhaS5nZW5lcmF0ZVJhbmRvbUF0dGFjayhwbGF5ZXIpO1xuICBjb25zdCB4ID0gYXR0YWNrSW5mby54O1xuICBjb25zdCB5ID0gYXR0YWNrSW5mby55O1xuICBjb25zdCByZXN1bHQgPSBhdHRhY2tJbmZvLnJlc3VsdDtcbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwbGF5ZXItYm9hcmQgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWAsXG4gICk7XG4gIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpO1xuICBpZiAocGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoYWkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpIHtcbiAgaWYgKHJlc3VsdCkge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSh3aW5uZXIpIHtcbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5uYW1lfSBoYXMgd29uIWA7XG4gIGFpU2lkZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICBlbmRnYW1lTW9kYWwuc2hvdygpO1xuICB3aW5uZXJUaXRsZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5nZXROYW1lKCl9IFdpbnMhYDtcbiAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGVuZGdhbWVNb2RhbC5jbG9zZSgpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=