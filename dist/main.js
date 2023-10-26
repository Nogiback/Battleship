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
const playerBoardDOM = document.getElementById('player-board');
const aiBoardDOM = document.getElementById('ai-board');
const message = document.getElementById('game-message');

// Player Ships
const playerCarrier = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerCarrier', 5);
const playerBattleship = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerBattleship', 4);
const playerCruiser = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerCruiser', 3);
const playerSubmarine = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerSubmarine', 3);
const playerDestroyer = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"]('playerDestroyer', 2);
const playerShips = [
  playerCarrier,
  playerBattleship,
  playerCruiser,
  playerSubmarine,
  playerDestroyer,
];

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
          handlePlayerAttack(e.target);
        });
        cell.style.cursor = 'pointer';
      }
      gameboardDOM.appendChild(cell);
    }
  }
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsRUFBRSxhQUFhLEVBQUU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsYUFBYTtBQUN4QyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5KHNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBBcnJheShzaXplKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBBcnJheShzaXplKVxuICAgICAgLmZpbGwoKVxuICAgICAgLm1hcCgoKSA9PiBBcnJheShzaXplKS5maWxsKGZhbHNlKSk7XG4gIH1cblxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICBnZXRTaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcztcbiAgfVxuXG4gIGdldEJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICB9XG5cbiAgZ2V0TWlzc2VkQXR0YWNrcygpIHtcbiAgICByZXR1cm4gdGhpcy5taXNzZWRBdHRhY2tzO1xuICB9XG5cbiAgaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGhvcml6b250YWwpIHtcbiAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLnNpemUgfHwgeSA8IDAgfHwgeSA+PSB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICBpZiAoeCArIHNoaXAubGVuZ3RoID4gdGhpcy5zaXplKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh5ICsgc2hpcC5sZW5ndGggPiB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4XVt5ICsgaV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCB4LCB5LCBob3Jpem9udGFsKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGhvcml6b250YWwpKSB7XG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSBudWxsKSB7XG4gICAgICB0aGlzLm1pc3NlZEF0dGFja3NbeF1beV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0c1t0aGlzLmJvYXJkW3hdW3ldLmhpdHMuaW5kZXhPZihmYWxzZSldID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgdGhpcy51c2VkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkO1xuICB9XG5cbiAgYXR0YWNrKG9wcG9uZW50LCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tUdXJuKCkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG9wcG9uZW50LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgICBvcHBvbmVudC5zdGFydFR1cm4oKTtcbiAgICAgIHJldHVybiB7IHJlc3VsdCwgeCwgeSB9O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZW5lcmF0ZVJhbmRvbUF0dGFjayhvcHBvbmVudCkge1xuICAgIGlmICh0aGlzLmNoZWNrVHVybigpKSB7XG4gICAgICBjb25zdCBzaXplID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnNpemU7XG4gICAgICBsZXQgeDtcbiAgICAgIGxldCB5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2l6ZSk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbiAgICAgIH0gd2hpbGUgKFxuICAgICAgICB0aGlzLnVzZWRDb29yZGluYXRlcy5zb21lKChjb29yZCkgPT4gY29vcmQueCA9PT0geCAmJiBjb29yZC55ID09PSB5KVxuICAgICAgKTtcbiAgICAgIHRoaXMudXNlZENvb3JkaW5hdGVzLnB1c2goeyB4LCB5IH0pO1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrKG9wcG9uZW50LCB4LCB5KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZW5kVHVybigpIHtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXJ0VHVybigpIHtcbiAgICB0aGlzLnR1cm4gPSB0cnVlO1xuICB9XG5cbiAgY2hlY2tUdXJuKCkge1xuICAgIHJldHVybiB0aGlzLnR1cm47XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IEFycmF5KGxlbmd0aCkuZmlsbChmYWxzZSk7XG4gIH1cblxuICBoaXQocG9zaXRpb24pIHtcbiAgICB0aGlzLmhpdHNbcG9zaXRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIGdldEhpdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cy5ldmVyeSgoaGl0KSA9PiBoaXQpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG4vLyBET00gRWxlbWVudHNcbmNvbnN0IHBsYXllckJvYXJkRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpO1xuY29uc3QgYWlCb2FyZERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaS1ib2FyZCcpO1xuY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW1lc3NhZ2UnKTtcblxuLy8gUGxheWVyIFNoaXBzXG5jb25zdCBwbGF5ZXJDYXJyaWVyID0gbmV3IFNoaXAoJ3BsYXllckNhcnJpZXInLCA1KTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBuZXcgU2hpcCgncGxheWVyQmF0dGxlc2hpcCcsIDQpO1xuY29uc3QgcGxheWVyQ3J1aXNlciA9IG5ldyBTaGlwKCdwbGF5ZXJDcnVpc2VyJywgMyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBuZXcgU2hpcCgncGxheWVyU3VibWFyaW5lJywgMyk7XG5jb25zdCBwbGF5ZXJEZXN0cm95ZXIgPSBuZXcgU2hpcCgncGxheWVyRGVzdHJveWVyJywgMik7XG5jb25zdCBwbGF5ZXJTaGlwcyA9IFtcbiAgcGxheWVyQ2FycmllcixcbiAgcGxheWVyQmF0dGxlc2hpcCxcbiAgcGxheWVyQ3J1aXNlcixcbiAgcGxheWVyU3VibWFyaW5lLFxuICBwbGF5ZXJEZXN0cm95ZXIsXG5dO1xuXG4vLyBBSSBTaGlwc1xuY29uc3QgYWlDYXJyaWVyID0gbmV3IFNoaXAoJ2FpQ2FycmllcicsIDUpO1xuY29uc3QgYWlCYXR0bGVzaGlwID0gbmV3IFNoaXAoJ2FpQmF0dGxlc2hpcCcsIDQpO1xuY29uc3QgYWlDcnVpc2VyID0gbmV3IFNoaXAoJ2FpQ3J1aXNlcicsIDMpO1xuY29uc3QgYWlTdWJtYXJpbmUgPSBuZXcgU2hpcCgnYWlTdWJtYXJpbmUnLCAzKTtcbmNvbnN0IGFpRGVzdHJveWVyID0gbmV3IFNoaXAoJ2FpRGVzdHJveWVyJywgMik7XG5jb25zdCBhaVNoaXBzID0gW2FpQ2FycmllciwgYWlCYXR0bGVzaGlwLCBhaUNydWlzZXIsIGFpU3VibWFyaW5lLCBhaURlc3Ryb3llcl07XG5cbi8vIEluaXRpYWxpemUgcGxheWVyL0FJIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG5jb25zdCBhaUJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXInLCBwbGF5ZXJCb2FyZCk7XG5jb25zdCBhaSA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJywgYWlCb2FyZCk7XG5cbnBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJDYXJyaWVyLCAwLCAwLCB0cnVlKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJCYXR0bGVzaGlwLCAxLCA4LCB0cnVlKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJDcnVpc2VyLCA5LCAzLCBmYWxzZSk7XG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAocGxheWVyU3VibWFyaW5lLCA1LCAzLCB0cnVlKTtcbnBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJEZXN0cm95ZXIsIDAsIDIsIGZhbHNlKTtcblxuYWlCb2FyZC5wbGFjZVNoaXAoYWlDYXJyaWVyLCAwLCAwLCB0cnVlKTtcbmFpQm9hcmQucGxhY2VTaGlwKGFpQmF0dGxlc2hpcCwgMSwgOCwgdHJ1ZSk7XG5haUJvYXJkLnBsYWNlU2hpcChhaUNydWlzZXIsIDksIDMsIGZhbHNlKTtcbmFpQm9hcmQucGxhY2VTaGlwKGFpU3VibWFyaW5lLCA1LCAzLCB0cnVlKTtcbmFpQm9hcmQucGxhY2VTaGlwKGFpRGVzdHJveWVyLCAwLCAyLCBmYWxzZSk7XG5cbmNyZWF0ZUdhbWVib2FyZChwbGF5ZXIpO1xuY3JlYXRlR2FtZWJvYXJkKGFpKTtcblxucGxheWVyLnN0YXJ0VHVybigpO1xuXG5mdW5jdGlvbiBjcmVhdGVHYW1lYm9hcmQocGxheWVyTmFtZSkge1xuICBsZXQgZ2FtZWJvYXJkRE9NO1xuICBpZiAocGxheWVyTmFtZS5uYW1lID09PSAnUGxheWVyJykge1xuICAgIGdhbWVib2FyZERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKTtcbiAgfSBlbHNlIHtcbiAgICBnYW1lYm9hcmRET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWktYm9hcmQnKTtcbiAgfVxuXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgcGxheWVyTmFtZS5nYW1lYm9hcmQuc2l6ZTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBwbGF5ZXJOYW1lLmdhbWVib2FyZC5zaXplOyB4KyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgY2VsbC5kYXRhc2V0LnggPSB4O1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSB5O1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IGAke3h9LCR7eX1gO1xuICAgICAgaWYgKHBsYXllck5hbWUubmFtZSA9PT0gJ0NvbXB1dGVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBoYW5kbGVQbGF5ZXJBdHRhY2soZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICB9XG4gICAgICBnYW1lYm9hcmRET00uYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBsYXllckF0dGFjayhjZWxsKSB7XG4gIGNvbnN0IHggPSBwYXJzZUludChjZWxsLmRhdGFzZXQueCk7XG4gIGNvbnN0IHkgPSBwYXJzZUludChjZWxsLmRhdGFzZXQueSk7XG4gIGNvbnN0IGF0dGFja0luZm8gPSBwbGF5ZXIuYXR0YWNrKGFpLCB4LCB5KTtcbiAgY29uc3QgcmVzdWx0ID0gYXR0YWNrSW5mby5yZXN1bHQ7XG4gIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpO1xuICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGlmIChhaS5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKHBsYXllcik7XG4gIH1cbiAgaGFuZGxlQUlBdHRhY2soKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQUlBdHRhY2soKSB7XG4gIGNvbnN0IGF0dGFja0luZm8gPSBhaS5nZW5lcmF0ZVJhbmRvbUF0dGFjayhwbGF5ZXIpO1xuICBjb25zdCB4ID0gYXR0YWNrSW5mby54O1xuICBjb25zdCB5ID0gYXR0YWNrSW5mby55O1xuICBjb25zdCByZXN1bHQgPSBhdHRhY2tJbmZvLnJlc3VsdDtcbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYCNwbGF5ZXItYm9hcmQgW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWAsXG4gICk7XG4gIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpO1xuICBpZiAocGxheWVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoYWkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdhbWVib2FyZChyZXN1bHQsIGNlbGwpIHtcbiAgaWYgKHJlc3VsdCkge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5kR2FtZSh3aW5uZXIpIHtcbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3dpbm5lci5uYW1lfSBoYXMgd29uIWA7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=