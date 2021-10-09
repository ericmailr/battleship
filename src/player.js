
import gameboard from './gameboard';

const player = (customFleet = false, realPlayer = false) => {
  const board = gameboard(realPlayer, customFleet);
  const pastTargets = ['none'];

  const randomTarget = () => {
    let target = 'none';
    while (pastTargets.includes(target)) {
      target = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    }
    return target;
  };

  const attack = (target, enemy) => {
    if (realPlayer) {
      enemy.board.receiveAttack(target);
      pastTargets.push(target.slice(1));
    } else {
      enemy.board.receiveAttack(`1${randomTarget()}`);
      pastTargets.push(target);
    }
  };

  return { attack, board };
};

export default player;
