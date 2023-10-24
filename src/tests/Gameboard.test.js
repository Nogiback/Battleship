import Ship from '../Ship';
import Gameboard from '../Gameboard';

describe('Gameboard', () => {
  test('Should return array of arrays to make up grid/gameboard', () => {
    const board = new Gameboard(10);
    expect(board.getBoard().length).toBe(10);
    expect(board.getBoard()[0].length).toBe(10);
  });

  test('Gameboard should populate grid with null elements', () => {
    const board = new Gameboard(10);
    expect(board.getBoard()[0][0]).toEqual(null);
    expect(board.getBoard()[5][9]).toEqual(null);
  });

  test('Gameboard should place a ship if given valid coordinates', () => {
    const board = new Gameboard(10);
    const ship = new Ship('test', 3);
    const horizontal = true;
    board.placeShip(ship, 1, 2, horizontal);
    expect(board.getBoard()[1][2]).toEqual(ship);
    expect(board.getBoard()[2][2]).toEqual(ship);
    expect(board.getBoard()[3][2]).toEqual(ship);
  });

  test('Gameboard should NOT place a ship if given invalid coordinates', () => {
    const board = new Gameboard(10);
    const ship = new Ship('test', 3);
    const horizontal = true;
    expect(board.isValidPosition(ship, 9, 1, horizontal)).toBe(false);
    expect(board.placeShip(ship, 9, 1, horizontal)).toBe(false);
    expect(board.getBoard()[9][1]).toBe(null);
  });

  test('Gameboard should NOT place a ship if space is already occupied', () => {
    const board = new Gameboard(10);
    const ship1 = new Ship('test1', 3);
    const ship2 = new Ship('test2', 4);
    const horizontal1 = true;
    const horizontal2 = false;
    board.placeShip(ship1, 1, 2, horizontal1);
    expect(board.placeShip(ship2, 2, 1, horizontal2)).toBe(false);
    expect(board.isValidPosition(ship2, 2, 1, horizontal2)).toBe(false);
    expect(board.getBoard()[2][1]).toBe(null);
  });

  test('Gameboard should receive attack when a ship is hit', () => {
    const board = new Gameboard(10);
    const ship = new Ship('test1', 3);
    const horizontal = true;
    board.placeShip(ship, 0, 0, horizontal);
    board.receiveAttack(1, 0);
    expect(ship.getHits()[0]).toBe(true);
    expect(ship.getHits()[1]).toBe(false);
    expect(ship.getHits()[2]).toBe(false);
  });

  test('Gameboard should receive missed attack when nothing is hit', () => {
    const board = new Gameboard(10);
    const ship = new Ship('test1', 3);
    const horizontal = true;
    board.placeShip(ship, 0, 0, horizontal);
    board.receiveAttack(3, 4);
    expect(ship.getHits()[0]).toBe(false);
    expect(board.missedAttacks[3][4]).toBe(true);
    expect(board.missedAttacks[5][7]).toBe(false);
  });

  test('Gameboard should return TRUE if all ships are sunk', () => {
    const board = new Gameboard(10);
    const ship1 = new Ship('test1', 3);
    const ship2 = new Ship('test2', 2);
    const horizontal1 = true;
    const horizontal2 = false;
    board.placeShip(ship1, 0, 0, horizontal1);
    board.placeShip(ship2, 3, 2, horizontal2);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);
    board.receiveAttack(3, 2);
    board.receiveAttack(3, 3);
    expect(board.allShipsSunk()).toBe(true);
  });

  test('Gameboard should return FALSE if not all ships are sunk', () => {
    const board = new Gameboard(10);
    const ship1 = new Ship('test1', 3);
    const ship2 = new Ship('test2', 2);
    const horizontal1 = true;
    const horizontal2 = false;
    board.placeShip(ship1, 0, 0, horizontal1);
    board.placeShip(ship2, 3, 2, horizontal2);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);
    expect(board.allShipsSunk()).toBe(false);
  });
});
