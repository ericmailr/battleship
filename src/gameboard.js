
import ship from './ship';

const gameboard = (realPlayer, customFleet) => {
  const aiFleet = () => {
    /*
            const getRandomDigitBetween = (min, max) => {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            const getRandomCoords = (shipLength, orientation) => {
                let coord =  '2' + getRandomDigitBetween(0, 10 - shipLength);
                coord += getRandomDigitBetween(0, 10-shiplength);

            }
            */
    const fleetCoords = [['200', '201'], ['223', '224', '225'], ['277', '287', '297'], ['280', '281', '282', '283'], ['250', '251', '252', '253', '254']];
    const destroyer = {
      name: 'destroyer', length: 2, coords: fleetCoords[0], shipFunctions: ship(fleetCoords[0]),
    };
    const submarine = {
      name: 'submarine', length: 3, coords: fleetCoords[1], shipFunctions: ship(fleetCoords[1]),
    };
    const cruiser = {
      name: 'cruiser', length: 3, coords: fleetCoords[2], shipFunctions: ship(fleetCoords[2]),
    };
    const battleship = {
      name: 'battleship', length: 4, coords: fleetCoords[3], shipFunctions: ship(fleetCoords[3]),
    };
    const carrier = {
      name: 'carrier', length: 5, coords: fleetCoords[4], shipFunctions: ship(fleetCoords[4]),
    };
    return [destroyer, submarine, cruiser, battleship, carrier];
  };

  const playerFleet = () => {
    const fleetCoords = [['100', '101'], ['123', '124', '125'], ['177', '187', '197'], ['180', '181', '182', '183'], ['150', '151', '152', '153', '154']];
    const destroyer = {
      name: 'destroyer', length: 2, coords: fleetCoords[0], shipFunctions: ship(fleetCoords[0]),
    };
    const submarine = {
      name: 'submarine', length: 3, coords: fleetCoords[1], shipFunctions: ship(fleetCoords[1]),
    };
    const cruiser = {
      name: 'cruiser', length: 3, coords: fleetCoords[2], shipFunctions: ship(fleetCoords[2]),
    };
    const battleship = {
      name: 'battleship', length: 4, coords: fleetCoords[3], shipFunctions: ship(fleetCoords[3]),
    };
    const carrier = {
      name: 'carrier', length: 5, coords: fleetCoords[4], shipFunctions: ship(fleetCoords[4]),
    };
    return [destroyer, submarine, cruiser, battleship, carrier];
  };
  const misses = [];
  const hits = [];
  let fleet = [];
  if (realPlayer) {
    if (customFleet) {
      fleet = [];
    } else {
      fleet = playerFleet();
    }
  } else {
    fleet = aiFleet();
  }

  const state = (() => ({ misses, hits, fleet }))();

  const getTargetWithLetter = (t) => {
    const row = parseInt(t.charAt(1), 10) + 1;
    const col = parseInt(t.charAt(2), 10);
    switch (col) {
      case 0:
        return `${row}A`;
      case 1:
        return `${row}B`;
      case 2:
        return `${row}C`;
      case 3:
        return `${row}D`;
      case 4:
        return `${row}E`;
      case 5:
        return `${row}F`;
      case 6:
        return `${row}G`;
      case 7:
        return `${row}H`;
      case 8:
        return `${row}I`;
      case 9:
        return `${row}J`;
      default:
    }
    return null;
  };

  const receiveAttack = (target) => {
    const targetElement = document.getElementById(target);
    const messageElement = document.getElementById('message');
    const statusElement = realPlayer ? document.getElementById('playerStatus') : document.getElementById('enemyStatus');

    if (realPlayer) {
      statusElement.innerHTML = getTargetWithLetter(target);
      messageElement.style.color = '#FF4136';
    } else {
      statusElement.innerHTML = getTargetWithLetter(target);
      messageElement.style.color = 'white';
    }

    if (hits.includes(target)) {
      return 'already hit';
    }
    let result = '';
    for (const s of fleet) {
      if (s.coords.includes(target)) {
        s.shipFunctions.hit(target);
        hits.push(target);
        if (s.shipFunctions.isSunk()) {
          targetElement.innerHTML = '<img src=\'../src/assets/fire.png\'>';
          messageElement.innerHTML = realPlayer ? 'Sunk ship. Ouch.' : 'Sunk Ship!!!';
          for (const coord of s.coords) {
            document.getElementById(coord).className = 'sunk';
          }
          result = 'sunk ship';
          break;
        }
        targetElement.className = 'hit';
        targetElement.innerHTML = '<img src=\'../src/assets/fire.png\'>';
        messageElement.innerHTML = realPlayer ? 'Hit. Lucky shot.' : 'Hit!';
        result = 'hit';
        break;
      }
    }
    if (result === '') {
      misses.push(target);
      document.getElementById(target).className = 'miss';
      messageElement.innerHTML = realPlayer ? 'Miss... pathetic.' : 'Miss!';
      result = 'miss';
    }
    statusElement.innerHTML += ` ${result}`;
    return result;
  };

  const allSunk = (ships = fleet) => {
    for (const s of ships) {
      if (!s.shipFunctions.isSunk()) {
        return false;
      }
    }
    document.getElementById('message').innerHTML = realPlayer ? '... you lost.' : 'Victory!';
    return true;
  };

  const addShip = (s) => {
    fleet.push(s);
    return fleet;
  };


  return {
    receiveAttack, state, allSunk, addShip,
  };
};

export default gameboard;
