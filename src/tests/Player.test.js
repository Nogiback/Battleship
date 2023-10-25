import Player from '../Player';
import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Player', () => {
  test('Player should return correct name', () => {
    const board = new Gameboard(10);
    const player = new Player('Peter', board);
    expect(player.getName()).toMatch('Peter');
  });

  test('Player should be able to change name', () => {
    const board = new Gameboard(10);
    const player = new Player('Peter', board);
    player.setName('Nogiback');
    expect(player.getName()).toMatch('Nogiback');
  });

  test('Player should return the correct gameboard when called', () => {
    const board = new Gameboard(10);
    const aiBoard = new Gameboard(10);
    const player = new Player('Peter', board);
    const ai = new Player('AI', aiBoard);
    expect(player.getGameboard()).toBe(board);
    expect(ai.getGameboard()).toBe(aiBoard);
  });

  test('Player should be able to attack opponent gameboard if they have turn', () => {
    const playerBoard = new Gameboard(10);
    const aiBoard = new Gameboard(10);
    const player = new Player('Peter', playerBoard);
    const ai = new Player('AI', aiBoard);
    const ship = new Ship('test', 3);
    const horizontal = true;
    aiBoard.placeShip(ship, 0, 0, horizontal);
    player.startTurn();
    expect(player.attack(ai, 0, 0)).toBe(true);
    expect(ship.getHits()[0]).toBe(true);
  });

  test('Player should NOT be able to attack opponent gameboard if not their turn', () => {
    const playerBoard = new Gameboard(10);
    const aiBoard = new Gameboard(10);
    const player = new Player('Peter', playerBoard);
    const ai = new Player('AI', aiBoard);
    const ship = new Ship('test', 3);
    const horizontal = true;
    aiBoard.placeShip(ship, 0, 0, horizontal);
    ai.startTurn();
    expect(player.attack(ai, 0, 0)).toBe(false);
    expect(ship.getHits()[0]).toBe(false);
  });

  test('Player should generate a random attack if called and usedCoordinates array will increase', () => {
    const playerBoard = new Gameboard(10);
    const aiBoard = new Gameboard(10);
    const player = new Player('Peter', playerBoard);
    const ai = new Player('AI', aiBoard);
    ai.startTurn();
    ai.generateRandomAttack(player);
    ai.startTurn();
    ai.generateRandomAttack(player);
    ai.startTurn();
    ai.generateRandomAttack(player);
    expect(ai.usedCoordinates.length).toBe(3);
  });
});
