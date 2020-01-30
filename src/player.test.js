const player = require('./player.js');

let p = player();
let ai = player(true);

test('expect attack 00 to return hit', () => {
    expect(p.attack('00', ai)).toBe('hit');
});

