import Ship from '../Ship';

describe('Ship', () => {
  test('Should return length of ship that is passed through', () => {
    const carrier = new Ship('carrier', 5);
    expect(carrier.getLength()).toBe(5);
  });

  test('Should return array of hits which are all false', () => {
    const carrier = new Ship('carrier', 5);
    expect(carrier.getHits()).toEqual([false, false, false, false, false]);
  });

  test('Should return array of hits with correct position after a hit', () => {
    const carrier = new Ship('carrier', 5);
    carrier.hit(1);
    expect(carrier.getHits()).toEqual([false, true, false, false, false]);
  });

  test('Should return false if ship is not sunk', () => {
    const carrier = new Ship('carrier', 5);
    carrier.hit(2);
    expect(carrier.isSunk()).toBe(false);
  });

  test('Should return true if ship is fully hit', () => {
    const carrier = new Ship('carrier', 5);
    carrier.hit(0);
    carrier.hit(1);
    carrier.hit(2);
    carrier.hit(3);
    carrier.hit(4);
    expect(carrier.isSunk()).toBe(true);
  });
});
