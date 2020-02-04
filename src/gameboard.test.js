import gameboard from './gameboard';

const g = gameboard();

test('expect 00 to be a hit', () => {
  expect(g.receiveAttack('00')).toBe('hit');
});

test('expect 03 to be a miss', () => {
  expect(g.receiveAttack('03')).toBe('miss');
});

test('expect 00 to return already hit', () => {
  expect(g.receiveAttack('00')).toBe('already hit');
});

test('expect 01 to return sunk ship', () => {
  expect(g.receiveAttack('01')).toBe('sunk ship');
});

test('expect allSunk to return true given 1 ship fleet', () => {
  expect(g.allSunk([g.state.fleet[0]])).toBe(true);
});

test('expect allSunk default input to return false', () => {
  expect(g.allSunk()).toBe(false);
});
