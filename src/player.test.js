import player from './player';

const p = player();
const ai = player(true);

test('expect attack 00 to return hit', () => {
  expect(p.attack('00', ai)).toBe('hit');
});
