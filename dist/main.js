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

// playerBoard.placeShip(playerCarrier, 0, 0, true);
// playerBoard.placeShip(playerBattleship, 1, 8, true);
// playerBoard.placeShip(playerCruiser, 9, 3, false);
// playerBoard.placeShip(playerSubmarine, 5, 3, true);
// playerBoard.placeShip(playerDestroyer, 0, 2, false);

shipsDOM.forEach((ship) => {
  ship.addEventListener('click', toggleShipDirection);
  ship.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

aiBoard.placeShip(aiCarrier, 0, 0, true);
aiBoard.placeShip(aiBattleship, 1, 8, true);
aiBoard.placeShip(aiCruiser, 9, 3, false);
aiBoard.placeShip(aiSubmarine, 5, 3, true);
aiBoard.placeShip(aiDestroyer, 0, 2, false);

createGameboard(player);
createGameboard(ai);

player.startTurn();

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
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDhCQUE4QixFQUFFLGFBQWEsRUFBRTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixhQUFhO0FBQ3hDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkoc2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IEFycmF5KHNpemUpLmZpbGwobnVsbCkpO1xuICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IEFycmF5KHNpemUpXG4gICAgICAuZmlsbCgpXG4gICAgICAubWFwKCgpID0+IEFycmF5KHNpemUpLmZpbGwoZmFsc2UpKTtcbiAgfVxuXG4gIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIGdldFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQ7XG4gIH1cblxuICBnZXRNaXNzZWRBdHRhY2tzKCkge1xuICAgIHJldHVybiB0aGlzLm1pc3NlZEF0dGFja3M7XG4gIH1cblxuICBpc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgaG9yaXpvbnRhbCkge1xuICAgIGlmICh4IDwgMCB8fCB4ID49IHRoaXMuc2l6ZSB8fCB5IDwgMCB8fCB5ID49IHRoaXMuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgIGlmICh4ICsgc2hpcC5sZW5ndGggPiB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt4ICsgaV1beV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IHRoaXMuc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3hdW3kgKyBpXSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIHgsIHksIGhvcml6b250YWwpIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5ICsgaV0gPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IG51bGwpIHtcbiAgICAgIHRoaXMubWlzc2VkQXR0YWNrc1t4XVt5XSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXRzW3RoaXMuYm9hcmRbeF1beV0uaGl0cy5pbmRleE9mKGZhbHNlKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZ2FtZWJvYXJkKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB0aGlzLnVzZWRDb29yZGluYXRlcyA9IFtdO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldEdhbWVib2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQ7XG4gIH1cblxuICBhdHRhY2sob3Bwb25lbnQsIHgsIHkpIHtcbiAgICBpZiAodGhpcy5jaGVja1R1cm4oKSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICAgIG9wcG9uZW50LnN0YXJ0VHVybigpO1xuICAgICAgcmV0dXJuIHsgcmVzdWx0LCB4LCB5IH07XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdlbmVyYXRlUmFuZG9tQXR0YWNrKG9wcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tUdXJuKCkpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBvcHBvbmVudC5nYW1lYm9hcmQuc2l6ZTtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNpemUpO1xuICAgICAgfSB3aGlsZSAoXG4gICAgICAgIHRoaXMudXNlZENvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZC54ID09PSB4ICYmIGNvb3JkLnkgPT09IHkpXG4gICAgICApO1xuICAgICAgdGhpcy51c2VkQ29vcmRpbmF0ZXMucHVzaCh7IHgsIHkgfSk7XG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2sob3Bwb25lbnQsIHgsIHkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlbmRUdXJuKCkge1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICB9XG5cbiAgc3RhcnRUdXJuKCkge1xuICAgIHRoaXMudHVybiA9IHRydWU7XG4gIH1cblxuICBjaGVja1R1cm4oKSB7XG4gICAgcmV0dXJuIHRoaXMudHVybjtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gQXJyYXkobGVuZ3RoKS5maWxsKGZhbHNlKTtcbiAgfVxuXG4gIGhpdChwb3NpdGlvbikge1xuICAgIHRoaXMuaGl0c1twb3NpdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgZ2V0SGl0cygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzLmV2ZXJ5KChoaXQpID0+IGhpdCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbi8vIERPTSBFbGVtZW50c1xuY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW1lc3NhZ2UnKTtcbmNvbnN0IHNoaXBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXNoaXBzLWNvbnRhaW5lcicpO1xuY29uc3Qgc2hpcHNET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpO1xuY29uc3QgcGxheWVyU2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItc2lkZScpO1xuY29uc3QgYWlTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FpLXNpZGUnKTtcblxuLy8gUGxheWVyIFNoaXBzXG5jb25zdCBwbGF5ZXJDYXJyaWVyID0gbmV3IFNoaXAoJ3BsYXllckNhcnJpZXInLCA1KTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBuZXcgU2hpcCgncGxheWVyQmF0dGxlc2hpcCcsIDQpO1xuY29uc3QgcGxheWVyQ3J1aXNlciA9IG5ldyBTaGlwKCdwbGF5ZXJDcnVpc2VyJywgMyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBuZXcgU2hpcCgncGxheWVyU3VibWFyaW5lJywgMyk7XG5jb25zdCBwbGF5ZXJEZXN0cm95ZXIgPSBuZXcgU2hpcCgncGxheWVyRGVzdHJveWVyJywgMik7XG5jb25zdCBwbGF5ZXJTaGlwcyA9IFtcbiAgcGxheWVyQ2FycmllcixcbiAgcGxheWVyQmF0dGxlc2hpcCxcbiAgcGxheWVyQ3J1aXNlcixcbiAgcGxheWVyU3VibWFyaW5lLFxuICBwbGF5ZXJEZXN0cm95ZXIsXG5dO1xuXG4vLyBBSSBTaGlwc1xuY29uc3QgYWlDYXJyaWVyID0gbmV3IFNoaXAoJ2FpQ2FycmllcicsIDUpO1xuY29uc3QgYWlCYXR0bGVzaGlwID0gbmV3IFNoaXAoJ2FpQmF0dGxlc2hpcCcsIDQpO1xuY29uc3QgYWlDcnVpc2VyID0gbmV3IFNoaXAoJ2FpQ3J1aXNlcicsIDMpO1xuY29uc3QgYWlTdWJtYXJpbmUgPSBuZXcgU2hpcCgnYWlTdWJtYXJpbmUnLCAzKTtcbmNvbnN0IGFpRGVzdHJveWVyID0gbmV3IFNoaXAoJ2FpRGVzdHJveWVyJywgMik7XG5jb25zdCBhaVNoaXBzID0gW2FpQ2FycmllciwgYWlCYXR0bGVzaGlwLCBhaUNydWlzZXIsIGFpU3VibWFyaW5lLCBhaURlc3Ryb3llcl07XG5cbi8vIEluaXRpYWxpemUgcGxheWVyL0FJIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG5jb25zdCBhaUJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdQbGF5ZXInLCBwbGF5ZXJCb2FyZCk7XG5jb25zdCBhaSA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJywgYWlCb2FyZCk7XG5cbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJDYXJyaWVyLCAwLCAwLCB0cnVlKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJCYXR0bGVzaGlwLCAxLCA4LCB0cnVlKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJDcnVpc2VyLCA5LCAzLCBmYWxzZSk7XG4vLyBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAocGxheWVyU3VibWFyaW5lLCA1LCAzLCB0cnVlKTtcbi8vIHBsYXllckJvYXJkLnBsYWNlU2hpcChwbGF5ZXJEZXN0cm95ZXIsIDAsIDIsIGZhbHNlKTtcblxuc2hpcHNET00uZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2hpcERpcmVjdGlvbik7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgZS50YXJnZXQuaWQpO1xuICB9KTtcbn0pO1xuXG5haUJvYXJkLnBsYWNlU2hpcChhaUNhcnJpZXIsIDAsIDAsIHRydWUpO1xuYWlCb2FyZC5wbGFjZVNoaXAoYWlCYXR0bGVzaGlwLCAxLCA4LCB0cnVlKTtcbmFpQm9hcmQucGxhY2VTaGlwKGFpQ3J1aXNlciwgOSwgMywgZmFsc2UpO1xuYWlCb2FyZC5wbGFjZVNoaXAoYWlTdWJtYXJpbmUsIDUsIDMsIHRydWUpO1xuYWlCb2FyZC5wbGFjZVNoaXAoYWlEZXN0cm95ZXIsIDAsIDIsIGZhbHNlKTtcblxuY3JlYXRlR2FtZWJvYXJkKHBsYXllcik7XG5jcmVhdGVHYW1lYm9hcmQoYWkpO1xuXG5wbGF5ZXIuc3RhcnRUdXJuKCk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVNoaXBEaXJlY3Rpb24oKSB7XG4gIGlmIChzaGlwQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPT09ICdjb2x1bW4nKSB7XG4gICAgc2hpcHNET00uZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHNoaXAuZGF0YXNldC5ob3Jpem9udGFsID0gJ2ZhbHNlJztcbiAgICB9KTtcbiAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAncm93JztcbiAgfSBlbHNlIHtcbiAgICBzaGlwc0RPTS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICBzaGlwLmRhdGFzZXQuaG9yaXpvbnRhbCA9ICd0cnVlJztcbiAgICB9KTtcbiAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJztcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lYm9hcmQocGxheWVyTmFtZSkge1xuICBsZXQgZ2FtZWJvYXJkRE9NO1xuICBpZiAocGxheWVyTmFtZS5uYW1lID09PSAnUGxheWVyJykge1xuICAgIGdhbWVib2FyZERPTSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKTtcbiAgfSBlbHNlIHtcbiAgICBnYW1lYm9hcmRET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWktYm9hcmQnKTtcbiAgfVxuXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgcGxheWVyTmFtZS5nYW1lYm9hcmQuc2l6ZTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBwbGF5ZXJOYW1lLmdhbWVib2FyZC5zaXplOyB4KyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgY2VsbC5kYXRhc2V0LnggPSB4O1xuICAgICAgY2VsbC5kYXRhc2V0LnkgPSB5O1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IGAke3h9LCR7eX1gO1xuICAgICAgaWYgKHBsYXllck5hbWUubmFtZSA9PT0gJ0NvbXB1dGVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBoYW5kbGVQbGF5ZXJBdHRhY2soZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllck5hbWUubmFtZSA9PT0gJ1BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZHJvcFBsYXllclNoaXAoZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkRE9NLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkcm9wUGxheWVyU2hpcChlKSB7XG4gIGNvbnN0IHNoaXBOYW1lID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xuICBjb25zdCB4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSk7XG4gIGNvbnN0IHkgPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpKTtcbiAgY29uc3QgY2FycmllckRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJyaWVyJyk7XG4gIGNvbnN0IGJhdHRsZXNoaXBET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlc2hpcCcpO1xuICBjb25zdCBjcnVpc2VyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NydWlzZXInKTtcbiAgY29uc3Qgc3VibWFyaW5lRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1hcmluZScpO1xuICBjb25zdCBkZXN0cm95ZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzdHJveWVyJyk7XG4gIGxldCBob3Jpem9udGFsO1xuXG4gIHN3aXRjaCAoc2hpcE5hbWUpIHtcbiAgICBjYXNlICdjYXJyaWVyJzpcbiAgICAgIGlmIChjYXJyaWVyRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3Jpem9udGFsJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyQ2FycmllciwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyQ2FycmllciwgeCwgeSwgaG9yaXpvbnRhbCk7XG4gICAgICAgIHJlbmRlclNoaXBzKHBsYXllcik7XG4gICAgICAgIHNoaXBDb250YWluZXIucmVtb3ZlQ2hpbGQoY2FycmllckRPTSk7XG4gICAgICAgIGlmIChzaGlwQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIDw9IDYpIHtcbiAgICAgICAgICBzaGlwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgYWlTaWRlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JhdHRsZXNoaXAnOlxuICAgICAgaWYgKGJhdHRsZXNoaXBET00uZ2V0QXR0cmlidXRlKCdkYXRhLWhvcml6b250YWwnKSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICBob3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24ocGxheWVyQmF0dGxlc2hpcCwgeCwgeSwgaG9yaXpvbnRhbClcbiAgICAgICkge1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXJCYXR0bGVzaGlwLCB4LCB5LCBob3Jpem9udGFsKTtcbiAgICAgICAgcmVuZGVyU2hpcHMocGxheWVyKTtcbiAgICAgICAgc2hpcENvbnRhaW5lci5yZW1vdmVDaGlsZChiYXR0bGVzaGlwRE9NKTtcbiAgICAgICAgaWYgKHNoaXBDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPD0gNikge1xuICAgICAgICAgIHNoaXBDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBhaVNpZGUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY3J1aXNlcic6XG4gICAgICBpZiAoY3J1aXNlckRPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9yaXpvbnRhbCcpID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc2l0aW9uKHBsYXllckNydWlzZXIsIHgsIHksIGhvcml6b250YWwpKSB7XG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHBsYXllckNydWlzZXIsIHgsIHksIGhvcml6b250YWwpO1xuICAgICAgICByZW5kZXJTaGlwcyhwbGF5ZXIpO1xuICAgICAgICBzaGlwQ29udGFpbmVyLnJlbW92ZUNoaWxkKGNydWlzZXJET00pO1xuICAgICAgICBpZiAoc2hpcENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA8PSA2KSB7XG4gICAgICAgICAgc2hpcENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGFpU2lkZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdWJtYXJpbmUnOlxuICAgICAgaWYgKHN1Ym1hcmluZURPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9yaXpvbnRhbCcpID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc2l0aW9uKHBsYXllclN1Ym1hcmluZSwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyU3VibWFyaW5lLCB4LCB5LCBob3Jpem9udGFsKTtcbiAgICAgICAgcmVuZGVyU2hpcHMocGxheWVyKTtcbiAgICAgICAgc2hpcENvbnRhaW5lci5yZW1vdmVDaGlsZChzdWJtYXJpbmVET00pO1xuICAgICAgICBpZiAoc2hpcENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA8PSA2KSB7XG4gICAgICAgICAgc2hpcENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGFpU2lkZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkZXN0cm95ZXInOlxuICAgICAgaWYgKGRlc3Ryb3llckRPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9yaXpvbnRhbCcpID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc2l0aW9uKHBsYXllckRlc3Ryb3llciwgeCwgeSwgaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyRGVzdHJveWVyLCB4LCB5LCBob3Jpem9udGFsKTtcbiAgICAgICAgcmVuZGVyU2hpcHMocGxheWVyKTtcbiAgICAgICAgc2hpcENvbnRhaW5lci5yZW1vdmVDaGlsZChkZXN0cm95ZXJET00pO1xuICAgICAgICBpZiAoc2hpcENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA8PSA2KSB7XG4gICAgICAgICAgc2hpcENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIGFpU2lkZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJTaGlwcyhwbGF5ZXIpIHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gcGxheWVyLmdhbWVib2FyZC5ib2FyZDtcbiAgY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkKTtcblxuICBwbGF5ZXJHYW1lYm9hcmQuZm9yRWFjaCgocm93LCB4KSA9PiB7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIHkpID0+IHtcbiAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgI3BsYXllci1ib2FyZCBbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3l9XCJdYCxcbiAgICAgICAgKTtcbiAgICAgICAgc2VsZWN0ZWRDZWxsLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVQbGF5ZXJBdHRhY2soY2VsbCkge1xuICBjb25zdCB4ID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LngpO1xuICBjb25zdCB5ID0gcGFyc2VJbnQoY2VsbC5kYXRhc2V0LnkpO1xuICBjb25zdCBhdHRhY2tJbmZvID0gcGxheWVyLmF0dGFjayhhaSwgeCwgeSk7XG4gIGNvbnN0IHJlc3VsdCA9IGF0dGFja0luZm8ucmVzdWx0O1xuICB1cGRhdGVHYW1lYm9hcmQocmVzdWx0LCBjZWxsKTtcbiAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICBpZiAoYWkuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZW5kR2FtZShwbGF5ZXIpO1xuICB9XG4gIGhhbmRsZUFJQXR0YWNrKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUFJQXR0YWNrKCkge1xuICBjb25zdCBhdHRhY2tJbmZvID0gYWkuZ2VuZXJhdGVSYW5kb21BdHRhY2socGxheWVyKTtcbiAgY29uc3QgeCA9IGF0dGFja0luZm8ueDtcbiAgY29uc3QgeSA9IGF0dGFja0luZm8ueTtcbiAgY29uc3QgcmVzdWx0ID0gYXR0YWNrSW5mby5yZXN1bHQ7XG4gIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGAjcGxheWVyLWJvYXJkIFtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gLFxuICApO1xuICB1cGRhdGVHYW1lYm9hcmQocmVzdWx0LCBjZWxsKTtcbiAgaWYgKHBsYXllci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBlbmRHYW1lKGFpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVHYW1lYm9hcmQocmVzdWx0LCBjZWxsKSB7XG4gIGlmIChyZXN1bHQpIHtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICB9IGVsc2Uge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUod2lubmVyKSB7XG4gIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBgJHt3aW5uZXIubmFtZX0gaGFzIHdvbiFgO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9