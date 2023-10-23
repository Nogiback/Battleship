import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.grid = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
  }

  placeShip(ship, row, col, isVertical) {
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][col] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][col + i] = ship;
      }
    }
  }

  receiveAttack(row, col, isVertical) {
    if (this.grid[row][col]) {
      const ship = this.grid[row][col];
      ship.hit(isVertical ? row : col);
      return true;
    }
    return false;
  }

  allShipsSunk() {
    return this.grid
      .flat()
      .filter((cell) => cell instanceof Ship)
      .every((ship) => ship.isSunk());
  }
}
