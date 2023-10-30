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
const mainMessage = document.querySelector('#main-message');
const secondMessage = document.querySelector('#secondary-message');
const shipContainer = document.querySelector('#add-ships-container');
const shipsDOM = document.querySelectorAll('.ship');
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

  // Placing ship onto gameboard and DOM gameboard depending on ship type
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
          mainMessage.textContent = 'Sink all the enemy ships!';
          secondMessage.textContent = 'Click the enemy board to attack!';
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
          mainMessage.textContent = 'Sink all the enemy ships!';
          secondMessage.textContent = 'Click the enemy board to attack!';
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
          mainMessage.textContent = 'Sink all the enemy ships!';
          secondMessage.textContent = 'Click the enemy board to attack!';
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
          mainMessage.textContent = 'Sink all the enemy ships!';
          secondMessage.textContent = 'Click the enemy board to attack!';
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
          mainMessage.textContent = 'Sink all the enemy ships!';
          secondMessage.textContent = 'Click the enemy board to attack!';
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

// Applying hit or miss attributes to the cell depending on the result of the attacks
function updateGameboard(result, cell) {
  if (result) {
    cell.classList.add('hit');
  } else {
    cell.classList.add('miss');
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLDZDQUFJO0FBQzlCO0FBQ0Esb0NBQW9DLEVBQUUsYUFBYSxFQUFFO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixFQUFFLGFBQWEsRUFBRTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkoc2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IEFycmF5KHNpemUpLmZpbGwobnVsbCkpO1xuICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IEFycmF5KHNpemUpXG4gICAgICAuZmlsbCgpXG4gICAgICAubWFwKCgpID0+IEFycmF5KHNpemUpLmZpbGwoZmFsc2UpKTtcbiAgfVxuXG4gIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIGdldFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQ7XG4gIH1cblxuICBnZXRNaXNzZWRBdHRhY2tzKCkge1xuICAgIHJldHVybiB0aGlzLm1pc3NlZEF0dGFja3M7XG4gIH1cblxuICBpc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgaG9yaXpvbnRhbCkge1xuICAgIGlmICh4IDwgMCB8fCB4ID49IHRoaXMuc2l6ZSB8fCB5IDwgMCB8fCB5ID49IHRoaXMuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgIGlmICh4ICsgc2hpcC5sZW5ndGggPiB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4ICsgaV1beV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IHRoaXMuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3kgKyBpXSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIHgsIHksIGhvcml6b250YWwpIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IG51bGwpIHtcbiAgICAgIHRoaXMubWlzc2VkQXR0YWNrc1t4XVt5XSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXRzW3RoaXMuYm9hcmRbeF1beV0uaGl0cy5pbmRleE9mKGZhbHNlKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZ2FtZWJvYXJkKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB0aGlzLnVzZWRDb29yZGluYXRlcyA9IFtdO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldEdhbWVib2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQ7XG4gIH1cblxuICBhdHRhY2sob3Bwb25lbnQsIHgsIHkpIHtcbiAgICBpZiAodGhpcy5jaGVja1R1cm4oKSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICAgIG9wcG9uZW50LnN0YXJ0VHVybigpO1xuICAgICAgcmV0dXJuIHsgcmVzdWx0LCB4LCB5IH07XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdlbmVyYXRlUmFuZG9tQXR0YWNrKG9wcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tUdXJuKCkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBvcHBvbmVudC5nYW1lYm9hcmQuc2l6ZTtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNpemUpO1xuICAgICAgfSB3aGlsZSAoXG4gICAgICAgIHRoaXMudXNlZENvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZC54ID09PSB4ICYmIGNvb3JkLnkgPT09IHkpXG4gICAgICApO1xuICAgICAgdGhpcy51c2VkQ29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2sob3Bwb25lbnQsIHgsIHkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlbmRUdXJuKCkge1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc3RhcnRUdXJuKCkge1xuICAgIHRoaXMudHVybiA9IHRydWU7XG4gIH1cblxuICBjaGVja1R1cm4oKSB7XG4gICAgcmV0dXJuIHRoaXMudHVybjtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gQXJyYXkobGVuZ3RoKS5maWxsKGZhbHNlKTtcbiAgfVxuXG4gIGhpdChwb3NpdGlvbikge1xuICAgIHRoaXMuaGl0c1twb3NpdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgZ2V0SGl0cygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzLmV2ZXJ5KChoaXQpID0+IGhpdCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbi8vIERPTSBFbGVtZW50c1xuY29uc3QgbWFpbk1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1tZXNzYWdlJyk7XG5jb25zdCBzZWNvbmRNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1tZXNzYWdlJyk7XG5jb25zdCBzaGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1zaGlwcy1jb250YWluZXInKTtcbmNvbnN0IHNoaXBzRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcbmNvbnN0IGFpU2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhaS1zaWRlJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1idG4nKTtcbmNvbnN0IG5hbWVNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lLW1vZGFsJyk7XG5jb25zdCBjbG9zZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vZGFsJyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LWJ0bicpO1xuY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcbmNvbnN0IHBsYXllclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci10aXRsZScpO1xuY29uc3QgZW5kZ2FtZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZGdhbWUtbW9kYWwnKTtcbmNvbnN0IHdpbm5lclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbm5lci10aXRsZScpO1xuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN0YXJ0LWJ0bicpO1xuXG4vLyBQbGF5ZXIgU2hpcHNcbmNvbnN0IHBsYXllckNhcnJpZXIgPSBuZXcgU2hpcCgncGxheWVyQ2FycmllcicsIDUpO1xuY29uc3QgcGxheWVyQmF0dGxlc2hpcCA9IG5ldyBTaGlwKCdwbGF5ZXJCYXR0bGVzaGlwJywgNCk7XG5jb25zdCBwbGF5ZXJDcnVpc2VyID0gbmV3IFNoaXAoJ3BsYXllckNydWlzZXInLCAzKTtcbmNvbnN0IHBsYXllclN1Ym1hcmluZSA9IG5ldyBTaGlwKCdwbGF5ZXJTdWJtYXJpbmUnLCAzKTtcbmNvbnN0IHBsYXllckRlc3Ryb3llciA9IG5ldyBTaGlwKCdwbGF5ZXJEZXN0cm95ZXInLCAyKTtcblxuLy8gQUkgU2hpcHNcbmNvbnN0IGFpQ2FycmllciA9IG5ldyBTaGlwKCdhaUNhcnJpZXInLCA1KTtcbmNvbnN0IGFpQmF0dGxlc2hpcCA9IG5ldyBTaGlwKCdhaUJhdHRsZXNoaXAnLCA0KTtcbmNvbnN0IGFpQ3J1aXNlciA9IG5ldyBTaGlwKCdhaUNydWlzZXInLCAzKTtcbmNvbnN0IGFpU3VibWFyaW5lID0gbmV3IFNoaXAoJ2FpU3VibWFyaW5lJywgMyk7XG5jb25zdCBhaURlc3Ryb3llciA9IG5ldyBTaGlwKCdhaURlc3Ryb3llcicsIDIpO1xuY29uc3QgYWlTaGlwcyA9IFthaUNhcnJpZXIsIGFpQmF0dGxlc2hpcCwgYWlDcnVpc2VyLCBhaVN1Ym1hcmluZSwgYWlEZXN0cm95ZXJdO1xuXG4vLyBJbml0aWFsaXplIHBsYXllci9BSSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoMTApO1xuY29uc3QgYWlCb2FyZCA9IG5ldyBHYW1lYm9hcmQoMTApO1xuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcignUGxheWVyJywgcGxheWVyQm9hcmQpO1xuY29uc3QgYWkgPSBuZXcgUGxheWVyKCdDb21wdXRlcicsIGFpQm9hcmQpO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbmFtZU1vZGFsLnNob3dNb2RhbCgpO1xuICBuYW1lRmllbGQuZm9jdXMoKTtcbn0pO1xuXG5jbG9zZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBuYW1lTW9kYWwuY2xvc2UoKTtcbn0pO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHBsYXllci5zZXROYW1lKG5hbWVGaWVsZC52YWx1ZSk7XG4gIHBsYXllclRpdGxlLnRleHRDb250ZW50ID0gYCR7cGxheWVyLmdldE5hbWUoKX0ncyBCb2FyZGA7XG4gIG5hbWVNb2RhbC5jbG9zZSgpO1xuICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBzaGlwQ29udGFpbmVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gIG1haW5NZXNzYWdlLnRleHRDb250ZW50ID0gJ0RyYWcgYW5kIGRyb3AgeW91ciBzaGlwcyEnO1xuICBzZWNvbmRNZXNzYWdlLnRleHRDb250ZW50ID0gJ0NsaWNrIHRvIHJvdGF0ZSB0aGVtISc7XG59KTtcblxuLy8gQWxsb3cgc2hpcCBwbGFjZW1lbnQgYW5kIGdlbmVyYXRlIGdhbWVib2FyZHNcbnNoaXBzRE9NLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVNoaXBEaXJlY3Rpb24pO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGUudGFyZ2V0LmlkKTtcbiAgfSk7XG59KTtcblxucGxhY2VBSVNoaXBzKCk7XG5cbmNyZWF0ZUdhbWVib2FyZChwbGF5ZXIpO1xuY3JlYXRlR2FtZWJvYXJkKGFpKTtcblxuLy8gU3RhcnQgZ2FtZSB3aXRoIHBsYXllclxucGxheWVyLnN0YXJ0VHVybigpO1xuXG4vLyBSYW5kb21seSBwbGFjZSBBSSBzaGlwcyBvbnRvIGl0cyByZXNwZWN0aXZlIGdhbWVib2FyZFxuZnVuY3Rpb24gcGxhY2VBSVNoaXBzKCkge1xuICBhaVNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgeCwgeSwgaG9yaXpvbnRhbDtcbiAgICBkbyB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWlCb2FyZC5zaXplKTtcbiAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhaUJvYXJkLnNpemUpO1xuICAgICAgaG9yaXpvbnRhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gICAgfSB3aGlsZSAoIWFpQm9hcmQuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGhvcml6b250YWwpKTtcbiAgICBhaUJvYXJkLnBsYWNlU2hpcChzaGlwLCB4LCB5LCBob3Jpem9udGFsKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNoaXBEaXJlY3Rpb24oKSB7XG4gIGlmIChzaGlwQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPT09ICdjb2x1bW4nKSB7XG4gICAgc2hpcHNET00uZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHNoaXAuZGF0YXNldC5ob3Jpem9udGFsID0gJ2ZhbHNlJztcbiAgICB9KTtcbiAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAncm93JztcbiAgfSBlbHNlIHtcbiAgICBzaGlwc0RPTS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICBzaGlwLmRhdGFzZXQuaG9yaXpvbnRhbCA9ICd0cnVlJztcbiAgICB9KTtcbiAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJztcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lYm9hcmQocGxheWVyTmFtZSkge1xuICBsZXQgZ2FtZWJvYXJkRE9NO1xuICBpZiAocGxheWVyTmFtZS5uYW1lID09PSAnQ29tcHV0ZXInKSB7XG4gICAgZ2FtZWJvYXJkRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FpLWJvYXJkJyk7XG4gIH0gZWxzZSB7XG4gICAgZ2FtZWJvYXJkRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuICB9XG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBwbGF5ZXJOYW1lLmdhbWVib2FyZC5zaXplOyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHBsYXllck5hbWUuZ2FtZWJvYXJkLnNpemU7IHgrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICBjZWxsLmRhdGFzZXQueCA9IHg7XG4gICAgICBjZWxsLmRhdGFzZXQueSA9IHk7XG4gICAgICAvL2NlbGwudGV4dENvbnRlbnQgPSBgJHt4fSwke3l9YDtcblxuICAgICAgLy8gQXBwbHlpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBjZWxscyBmb3IgYXR0YWNraW5nIGFuZCBzaGlwIHBsYWNlbWVudFxuICAgICAgaWYgKHBsYXllck5hbWUubmFtZSA9PT0gJ0NvbXB1dGVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBoYW5kbGVQbGF5ZXJBdHRhY2soZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBkcm9wUGxheWVyU2hpcChlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBnYW1lYm9hcmRET00uYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRyb3BQbGF5ZXJTaGlwKGUpIHtcbiAgY29uc3Qgc2hpcE5hbWUgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XG4gIGNvbnN0IHggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpKTtcbiAgY29uc3QgeSA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS15JykpO1xuICBjb25zdCBjYXJyaWVyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnJpZXInKTtcbiAgY29uc3QgYmF0dGxlc2hpcERPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXR0bGVzaGlwJyk7XG4gIGNvbnN0IGNydWlzZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3J1aXNlcicpO1xuICBjb25zdCBzdWJtYXJpbmVET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWFyaW5lJyk7XG4gIGNvbnN0IGRlc3Ryb3llckRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXN0cm95ZXInKTtcbiAgbGV0IGhvcml6b250YWw7XG5cbiAgLy8gUGxhY2luZyBzaGlwIG9udG8gZ2FtZWJvYXJkIGFuZCBET00gZ2FtZWJvYXJkIGRlcGVuZGluZyBvbiBzaGlwIHR5cGVcbiAgc3dpdGNoIChzaGlwTmFtZSkge1xuICAgIGNhc2UgJ2NhcnJpZXInOlxuICAgICAgaWYgKGNhcnJpZXJET00uZ2V0QXR0cmlidXRlKCdkYXRhLWhvcml6b250YWwnKSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICBob3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmlzVmFsaWRQb3NpdGlvbihwbGF5ZXJDYXJyaWVyLCB4LCB5LCBob3Jpem9udGFsKSkge1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXJDYXJyaWVyLCB4LCB5LCBob3Jpem9udGFsKTtcbiAgICAgICAgcmVuZGVyU2hpcHMocGxheWVyKTtcbiAgICAgICAgc2hpcENvbnRhaW5lci5yZW1vdmVDaGlsZChjYXJyaWVyRE9NKTtcbiAgICAgICAgaWYgKHNoaXBDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPD0gNikge1xuICAgICAgICAgIHNoaXBDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBhaVNpZGUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgICBtYWluTWVzc2FnZS50ZXh0Q29udGVudCA9ICdTaW5rIGFsbCB0aGUgZW5lbXkgc2hpcHMhJztcbiAgICAgICAgICBzZWNvbmRNZXNzYWdlLnRleHRDb250ZW50ID0gJ0NsaWNrIHRoZSBlbmVteSBib2FyZCB0byBhdHRhY2shJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmF0dGxlc2hpcCc6XG4gICAgICBpZiAoYmF0dGxlc2hpcERPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9yaXpvbnRhbCcpID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLmlzVmFsaWRQb3NpdGlvbihwbGF5ZXJCYXR0bGVzaGlwLCB4LCB5LCBob3Jpem9udGFsKVxuICAgICAgKSB7XG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHBsYXllckJhdHRsZXNoaXAsIHgsIHksIGhvcml6b250YWwpO1xuICAgICAgICByZW5kZXJTaGlwcyhwbGF5ZXIpO1xuICAgICAgICBzaGlwQ29udGFpbmVyLnJlbW92ZUNoaWxkKGJhdHRsZXNoaXBET00pO1xuICAgICAgICBpZiAoc2hpcENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA8PSA2KSB7XG4gICAgICAgICAgc2hpcENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGFpU2lkZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgIG1haW5NZXNzYWdlLnRleHRDb250ZW50ID0gJ1NpbmsgYWxsIHRoZSBlbmVteSBzaGlwcyEnO1xuICAgICAgICAgIHNlY29uZE1lc3NhZ2UudGV4dENvbnRlbnQgPSAnQ2xpY2sgdGhlIGVuZW15IGJvYXJkIHRvIGF0dGFjayEnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdjcnVpc2VyJzpcbiAgICAgIGlmIChjcnVpc2VyRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyQ3J1aXNlciwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyQ3J1aXNlciwgeCwgeSwgaG9yaXpvbnRhbCk7XG4gICAgICAgIHJlbmRlclNoaXBzKHBsYXllcik7XG4gICAgICAgIHNoaXBDb250YWluZXIucmVtb3ZlQ2hpbGQoY3J1aXNlckRPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgbWFpbk1lc3NhZ2UudGV4dENvbnRlbnQgPSAnU2luayBhbGwgdGhlIGVuZW15IHNoaXBzISc7XG4gICAgICAgICAgc2Vjb25kTWVzc2FnZS50ZXh0Q29udGVudCA9ICdDbGljayB0aGUgZW5lbXkgYm9hcmQgdG8gYXR0YWNrISc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N1Ym1hcmluZSc6XG4gICAgICBpZiAoc3VibWFyaW5lRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyU3VibWFyaW5lLCB4LCB5LCBob3Jpem9udGFsKSkge1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXJTdWJtYXJpbmUsIHgsIHksIGhvcml6b250YWwpO1xuICAgICAgICByZW5kZXJTaGlwcyhwbGF5ZXIpO1xuICAgICAgICBzaGlwQ29udGFpbmVyLnJlbW92ZUNoaWxkKHN1Ym1hcmluZURPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgbWFpbk1lc3NhZ2UudGV4dENvbnRlbnQgPSAnU2luayBhbGwgdGhlIGVuZW15IHNoaXBzISc7XG4gICAgICAgICAgc2Vjb25kTWVzc2FnZS50ZXh0Q29udGVudCA9ICdDbGljayB0aGUgZW5lbXkgYm9hcmQgdG8gYXR0YWNrISc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Rlc3Ryb3llcic6XG4gICAgICBpZiAoZGVzdHJveWVyRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyRGVzdHJveWVyLCB4LCB5LCBob3Jpem9udGFsKSkge1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXJEZXN0cm95ZXIsIHgsIHksIGhvcml6b250YWwpO1xuICAgICAgICByZW5kZXJTaGlwcyhwbGF5ZXIpO1xuICAgICAgICBzaGlwQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRlc3Ryb3llckRPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgbWFpbk1lc3NhZ2UudGV4dENvbnRlbnQgPSAnU2luayBhbGwgdGhlIGVuZW15IHNoaXBzISc7XG4gICAgICAgICAgc2Vjb25kTWVzc2FnZS50ZXh0Q29udGVudCA9ICdDbGljayB0aGUgZW5lbXkgYm9hcmQgdG8gYXR0YWNrISc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNoaXBzKHBsYXllcikge1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkO1xuXG4gIHBsYXllckdhbWVib2FyZC5mb3JFYWNoKChyb3csIHgpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgeSkgPT4ge1xuICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAjcGxheWVyLWJvYXJkIFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gLFxuICAgICAgICApO1xuICAgICAgICBzZWxlY3RlZENlbGwuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYXllckF0dGFjayhjZWxsKSB7XG4gIGNvbnN0IHggPSBwYXJzZUludChjZWxsLmRhdGFzZXQueCk7XG4gIGNvbnN0IHkgPSBwYXJzZUludChjZWxsLmRhdGFzZXQueSk7XG4gIGNvbnN0IGF0dGFja0luZm8gPSBwbGF5ZXIuYXR0YWNrKGFpLCB4LCB5KTtcbiAgY29uc3QgcmVzdWx0ID0gYXR0YWNrSW5mby5yZXN1bHQ7XG4gIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpO1xuICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGlmIChhaS5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKHBsYXllcik7XG4gIH1cbiAgaGFuZGxlQUlBdHRhY2soKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQUlBdHRhY2soKSB7XG4gIGNvbnN0IGF0dGFja0luZm8gPSBhaS5nZW5lcmF0ZVJhbmRvbUF0dGFjayhwbGF5ZXIpO1xuICBjb25zdCB4ID0gYXR0YWNrSW5mby54O1xuICBjb25zdCB5ID0gYXR0YWNrSW5mby55O1xuICBjb25zdCByZXN1bHQgPSBhdHRhY2tJbmZvLnJlc3VsdDtcbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwbGF5ZXItYm9hcmQgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWAsXG4gICk7XG4gIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpO1xuICBpZiAocGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoYWkpO1xuICB9XG59XG5cbi8vIEFwcGx5aW5nIGhpdCBvciBtaXNzIGF0dHJpYnV0ZXMgdG8gdGhlIGNlbGwgZGVwZW5kaW5nIG9uIHRoZSByZXN1bHQgb2YgdGhlIGF0dGFja3NcbmZ1bmN0aW9uIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpIHtcbiAgaWYgKHJlc3VsdCkge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSh3aW5uZXIpIHtcbiAgbWFpbk1lc3NhZ2UudGV4dENvbnRlbnQgPSBgR0FNRSBPVkVSYDtcbiAgc2Vjb25kTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5nZXROYW1lKCl9IFdpbnMhYDtcbiAgYWlTaWRlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGVuZGdhbWVNb2RhbC5zaG93KCk7XG4gIHdpbm5lclRpdGxlLnRleHRDb250ZW50ID0gYCR7d2lubmVyLmdldE5hbWUoKX0gV2lucyFgO1xuICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZW5kZ2FtZU1vZGFsLmNsb3NlKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==