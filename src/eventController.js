
import ship from './ship';
import displayController from './displayController';
import player from './player';

const eventController = (() => {
  const customFleet = true;
  let p;
  let enemy;
  const enemyBoardElement = document.getElementById('enemyBoard');
  let gameover = false;
  let attackBackTimeout = '';

  const attackHandler = (e) => {
    const target = e.target.id;
    if (target.charAt(0) === '2' && document.getElementById(target).classList.contains('blankCoord')) {
      enemyBoardElement.removeEventListener('click', attackHandler);
      p.attack(target, enemy);
      if (enemy.board.allSunk()) {
        enemyBoardElement.removeEventListener('click', attackHandler);
        gameover = true;
      }
      if (!gameover) {
        attackBackTimeout = setTimeout(() => {
          enemy.attack(undefined, p);
          if (p.board.allSunk()) {
            gameover = true;
            enemyBoardElement.removeEventListener('click', attackHandler);
          } else {
            enemyBoardElement.addEventListener('click', attackHandler);
          }
        }, 1000);
      }
    }
  };

  const startGame = () => {
    gameover = false;
    enemyBoardElement.addEventListener('click', attackHandler);
  };

  const setFleet = () => {
    const playerBoardElement = document.getElementById('playerBoard');
    const messageElement = document.getElementById('message');
    const fleet = [{ name: 'destroyer', length: 2 }, { name: 'submarine', length: 3 }, { name: 'cruiser', length: 3 }, { name: 'battleship', length: 4 }, { name: 'carrier', length: 5 }];
    let newShipIndex = 0;
    let currentInitial = [];

    const takenCoords = () => {
      const taken = [];
      fleet.forEach((s) => {
        if (s.coords !== undefined) {
          s.coords.forEach((c) => {
            taken.push(c);
          });
        }
      });
      return taken;
    };

    const cancelPotentialShips = () => {
      const potentialShipElements = document.getElementsByClassName('potentialShipCoord');
      while (potentialShipElements.length) {
        potentialShipElements[0].className = 'blankCoord';
      }
    };

    const getCoordsBetween = (endCoord) => {
      const boardNumber = currentInitial.charAt(0);
      const startRow = parseInt(currentInitial.charAt(1), 10);
      const startCol = parseInt(currentInitial.charAt(2), 10);
      const endRow = parseInt(endCoord.charAt(1), 10);
      const endCol = parseInt(endCoord.charAt(2), 10);
      const coordsBetween = [];
      if (startRow === endRow) {
        coordsBetween.push(`${boardNumber + startRow}${startCol}`);
        if (startCol < endCol) {
          for (let i = startCol + 1; i <= endCol; i += 1) {
            coordsBetween.push(`${boardNumber + startRow}${i}`);
            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        } else {
          for (let i = endCol; i < startCol; i += 1) {
            coordsBetween.push(`${boardNumber + startRow}${i}`);
            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        }
      } else if (startCol === endCol) {
        coordsBetween.push(`${boardNumber + startRow}${startCol}`);
        if (startRow < endRow) {
          for (let i = startRow + 1; i <= endRow; i += 1) {
            coordsBetween.push(`${boardNumber + i}${startCol}`);
            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        } else {
          for (let i = endRow; i < startRow; i += 1) {
            coordsBetween.push(`${boardNumber + i}${startCol}`);
            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        }
      }
      return coordsBetween;
    };

    const mouseoverHandler = (e) => {
      cancelPotentialShips();
      const coordsBetween = getCoordsBetween(e.target.id);
      if (coordsBetween && coordsBetween.length <= fleet[newShipIndex].length) {
        for (const coord of coordsBetween) {
          document.getElementById(coord).className = 'potentialShipCoord';
        }
      }
      playerBoardElement.addEventListener('mouseover', mouseoverHandler, { once: true });
    };

    const placeShipHandler = (e) => {
      playerBoardElement.removeEventListener('mouseover', mouseoverHandler, { once: true });
      const endRow = parseInt(e.target.id.charAt(1), 10);
      const endCol = parseInt(e.target.id.charAt(2), 10);
      const boardNumber = e.target.id.charAt(0);
      const coordsBetween = getCoordsBetween(`${boardNumber + endRow}${endCol}`);
      if (coordsBetween && coordsBetween.length === fleet[newShipIndex].length) {
        fleet[newShipIndex].coords = coordsBetween;
        fleet[newShipIndex].shipFunctions = ship(coordsBetween);
        p.board.addShip(fleet[newShipIndex]);
        newShipIndex += 1;
        currentInitial = '';
        cancelPotentialShips();
        for (const coord of coordsBetween) {
          document.getElementById(coord).className = 'ship';
        }
        if (newShipIndex === fleet.length) {
          messageElement.innerHTML = 'Game on! Fire when ready!';
          startGame();
        } else {
          messageElement.innerHTML = `Place your ${fleet[newShipIndex].name} (${fleet[newShipIndex].length} squares)`;
          playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, { once: true });
        }
      } else {
        cancelPotentialShips();
        currentInitial = '';
        playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, { once: true });
      }
    };

    const beginPotentialShipHandler = (e) => {
      const coord = e.target.id;
      if (takenCoords().includes(coord) || coord === '') {
        playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, { once: true });
        return;
      }
      document.getElementById(coord).className = 'potentialShipCoord';
      currentInitial = coord;
      playerBoardElement.addEventListener('mouseover', mouseoverHandler, { once: true });
      playerBoardElement.addEventListener('mouseup', placeShipHandler, { once: true });
    };

    messageElement.innerHTML = `Place your ${fleet[newShipIndex].name} (${fleet[newShipIndex].length} squares)`;
    playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, { once: true });
  };

  const init = () => {
    clearTimeout(attackBackTimeout);
    p = player(customFleet, true);
    enemy = player(false, false);
    if (customFleet) {
      displayController.renderBoards(p.board, enemy.board);
      enemyBoardElement.removeEventListener('click', attackHandler);
      setFleet(p);
    } else {
      document.getElementById('message').innerHTML = 'Fire when ready!';
      enemyBoardElement.removeEventListener('click', attackHandler);
      displayController.renderBoards(p.board, enemy.board);
      startGame();
    }
  };

  return { init, startGame, setFleet };
})();

export default eventController;
