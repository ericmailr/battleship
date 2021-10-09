import ship from './ship';

const coords = ['00', '01'];
const s = ship(coords);

test('new ship is not sunk', () => {
  expect(s.isSunk()).toBe(false);
});

test('destroyer (2 length) hit once is not sunk', () => {
  s.hit('00');
  expect(s.isSunk()).toBe(false);
});

test('destroyer (2 length) is sunk after 2 hits', () => {
  s.hit('01');
  expect(s.isSunk()).toBe(true);
});
