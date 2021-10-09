/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const gameboard = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");

const displayController = (() => {
  const container = document.getElementById('container');
  const enemyBoardElement = document.getElementById('enemyBoard');
  const enemyRows = enemyBoardElement.rows;
  const playerBoardElement = document.getElementById('playerBoard');
  const playerRows = playerBoardElement.rows;

  const init = (() => {
    for (let i = 1; i < enemyRows.length; i++) {
      for (let j = 0; j < 10; j++) {
        playerRows[i].insertAdjacentHTML('beforeend', `<td id=1${i - 1}${j} class='blankCoord'></td>`);
        enemyRows[i].insertAdjacentHTML('beforeend', `<td id=2${i - 1}${j} class='blankCoord'></td>`);
      }
    }
  })(); // something is wrong.. make sure the old fleet isn't receiving hits somehow


  const renderBoards = (playerBoard, enemyBoard) => {
    let pState = playerBoard.state;
    let eState = enemyBoard.state;

    for (let i = 1; i < enemyRows.length; i++) {
      for (let j = 0; j < 10; j++) {
        document.getElementById('1' + (i - 1) + j).className = 'blankCoord';
        document.getElementById('2' + (i - 1) + j).className = 'blankCoord';
        document.getElementById('1' + (i - 1) + j).innerHTML = '';
        document.getElementById('2' + (i - 1) + j).innerHTML = '';
      }
    }

    for (let i = 0; i < pState.misses; i++) {
      document.getElementById(pState.misses[i]).className = 'miss';
    }

    for (let i = 0; i < eState.misses; i++) {
      document.getElementById(eState.misses[i]).className = 'miss';
    }

    for (let i = 0; i < pState.hits; i++) {
      document.getElementById(pState.hits[i]).className = 'hit';
      document.getElementById(pState.hits[i]).innerHTML = `<img src='../src/assets/fire.png'>`;
    }

    for (let i = 0; i < eState.hits; i++) {
      document.getElementById(eState.hits[i]).className = 'hit';
      document.getElementById(pState.hits[i]).innerHTML = `<img src='../src/assets/fire.png'>`;
    }

    for (let i = 0; i < pState.fleet.length; i++) {
      for (let j = 0; j < pState.fleet[i].coords.length; j++) {
        document.getElementById(pState.fleet[i].coords[j]).className = 'ship';
      }
    }
  };

  return {
    renderBoards
  };
})();

module.exports = displayController;

/***/ }),

/***/ "./src/eventController.js":
/*!********************************!*\
  !*** ./src/eventController.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ship = __webpack_require__(/*! ./ship.js */ "./src/ship.js");

const displayController = __webpack_require__(/*! ./displayController.js */ "./src/displayController.js");

const player = __webpack_require__(/*! ./player.js */ "./src/player.js");

const eventController = (() => {
  const attack = (player, enemy) => {
    let enemyBoardElement = document.getElementById('enemyBoard');
    let gameover = false;

    const attackHandler = e => {
      let target = e.target.id;

      if (target.charAt(0) == '2' && document.getElementById(target).classList.contains('blankCoord')) {
        enemyBoardElement.removeEventListener('click', attackHandler);
        player.attack(target, enemy);

        if (enemy.board.allSunk()) {
          enemyBoardElement.removeEventListener('click', attackHandler);
          gameover = true;
        }

        if (!gameover) {
          setTimeout(() => {
            enemy.attack(undefined, player);

            if (player.board.allSunk()) {
              gameover = true;
              enemyBoardElement.removeEventListener('click', attackHandler);
            } else {
              enemyBoardElement.addEventListener('click', attackHandler);
            }
          }, 18);
        }
      }
    };

    enemyBoardElement.addEventListener('click', attackHandler);
  }; // board setup


  const setFleet = realPlayer => {
    let board = realPlayer.board;
    let playerBoardElement = document.getElementById('playerBoard');
    let messageElement = document.getElementById('message');
    const fleet = [{
      name: 'destroyer',
      length: 2
    }, {
      name: 'submarine',
      length: 3
    }, {
      name: 'cruiser',
      length: 3
    }, {
      name: 'battleship',
      length: 4
    }, {
      name: 'carrier',
      length: 5
    }];
    let newShipIndex = 0;
    let currentInitial = [];

    const takenCoords = () => {
      let taken = [];

      for (let s of fleet) {
        if (s.coords != undefined) {
          for (let c of s.coords) {
            taken.push(c);
          }
        }
      }

      return taken;
    };

    const cancelPotentialShips = () => {
      let potentialShipElements = document.getElementsByClassName('potentialShipCoord');

      while (potentialShipElements.length) {
        potentialShipElements[0].className = 'blankCoord';
      }
    };

    const getCoordsBetween = endCoord => {
      let boardNumber = currentInitial.charAt(0);
      let startRow = parseInt(currentInitial.charAt(1), 10);
      let startCol = parseInt(currentInitial.charAt(2), 10);
      let endRow = parseInt(endCoord.charAt(1), 10);
      let endCol = parseInt(endCoord.charAt(2), 10);
      let coordsBetween = [];

      if (startRow == endRow) {
        coordsBetween.push(boardNumber + startRow + '' + startCol);

        if (startCol < endCol) {
          for (let i = startCol + 1; i <= endCol; i++) {
            coordsBetween.push(boardNumber + startRow + '' + i);

            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        } else {
          for (let i = endCol; i < startCol; i++) {
            coordsBetween.push(boardNumber + startRow + '' + i);

            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        }
      } else if (startCol == endCol) {
        coordsBetween.push(boardNumber + startRow + '' + startCol);

        if (startRow < endRow) {
          for (let i = startRow + 1; i <= endRow; i++) {
            coordsBetween.push(boardNumber + i + '' + startCol);

            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        } else {
          for (let i = endRow; i < startRow; i++) {
            coordsBetween.push(boardNumber + i + '' + startCol);

            if (takenCoords().includes(coordsBetween[coordsBetween.length - 1])) {
              return false;
            }
          }
        }
      }

      return coordsBetween;
    };

    const mouseoverHandler = e => {
      cancelPotentialShips();
      let newCoordElement = document.getElementById(e.target.id);
      let coordsBetween = getCoordsBetween(e.target.id);

      if (coordsBetween && coordsBetween.length <= fleet[newShipIndex].length) {
        for (let coord of coordsBetween) {
          document.getElementById(coord).className = 'potentialShipCoord';
        }
      }

      playerBoardElement.addEventListener('mouseover', mouseoverHandler, {
        once: true
      });
    };

    const placeShipHandler = e => {
      playerBoardElement.removeEventListener('mouseover', mouseoverHandler, {
        once: true
      });
      let endRow = parseInt(e.target.id.charAt(1), 10);
      let endCol = parseInt(e.target.id.charAt(2), 10);
      let boardNumber = e.target.id.charAt(0);
      let coordsBetween = getCoordsBetween(boardNumber + endRow + '' + endCol);

      if (coordsBetween && coordsBetween.length == fleet[newShipIndex].length) {
        fleet[newShipIndex].coords = coordsBetween;
        fleet[newShipIndex].shipFunctions = ship(coordsBetween);
        board.addShip(fleet[newShipIndex]);
        newShipIndex++;
        currentInitial = '';
        cancelPotentialShips();

        for (let coord of coordsBetween) {
          document.getElementById(coord).className = 'ship';
        }

        if (newShipIndex == fleet.length) {
          messageElement.innerHTML = `Game on! Fire when ready!`;
        } else {
          messageElement.innerHTML = `Place your ${fleet[newShipIndex].name} (${fleet[newShipIndex].length} squares)`;
          playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {
            once: true
          });
        }
      } else {
        cancelPotentialShips();
        currentInitial = '';
        playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {
          once: true
        });
      }
    };

    const beginPotentialShipHandler = e => {
      let coord = e.target.id;

      if (takenCoords().includes(coord)) {
        playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {
          once: true
        });
        return;
      } else {
        document.getElementById(coord).className = 'potentialShipCoord';
        currentInitial = coord;
        playerBoardElement.addEventListener('mouseover', mouseoverHandler, {
          once: true
        });
        playerBoardElement.addEventListener('mouseup', placeShipHandler, {
          once: true
        });
      }
    };

    messageElement.innerHTML = `Place your ${fleet[newShipIndex].name} (${fleet[newShipIndex].length} squares)`;
    playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {
      once: true
    });
  };

  return {
    attack,
    setFleet
  };
})();

module.exports = eventController;

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ship = __webpack_require__(/*! ./ship */ "./src/ship.js");

const gameboard = (realPlayer, customFleet) => {
  const aiFleet = () => {
    let fleetCoords = [['200', '201'], ['223', '224', '225'], ['277', '287', '297'], ['280', '281', '282', '283'], ['250', '251', '252', '253', '254']];
    let destroyer = {
      name: 'destroyer',
      length: 2,
      coords: fleetCoords[0],
      shipFunctions: ship(fleetCoords[0])
    };
    let submarine = {
      name: 'submarine',
      length: 3,
      coords: fleetCoords[1],
      shipFunctions: ship(fleetCoords[1])
    };
    let cruiser = {
      name: 'cruiser',
      length: 3,
      coords: fleetCoords[2],
      shipFunctions: ship(fleetCoords[2])
    };
    let battleship = {
      name: 'battleship',
      length: 4,
      coords: fleetCoords[3],
      shipFunctions: ship(fleetCoords[3])
    };
    let carrier = {
      name: 'carrier',
      length: 5,
      coords: fleetCoords[4],
      shipFunctions: ship(fleetCoords[4])
    };
    return [destroyer, submarine, cruiser, battleship, carrier];
  };

  const playerFleet = () => {
    let fleetCoords = [['100', '101'], ['123', '124', '125'], ['177', '187', '197'], ['180', '181', '182', '183'], ['150', '151', '152', '153', '154']];
    let destroyer = {
      name: 'destroyer',
      length: 2,
      coords: fleetCoords[0],
      shipFunctions: ship(fleetCoords[0])
    };
    let submarine = {
      name: 'submarine',
      length: 3,
      coords: fleetCoords[1],
      shipFunctions: ship(fleetCoords[1])
    };
    let cruiser = {
      name: 'cruiser',
      length: 3,
      coords: fleetCoords[2],
      shipFunctions: ship(fleetCoords[2])
    };
    let battleship = {
      name: 'battleship',
      length: 4,
      coords: fleetCoords[3],
      shipFunctions: ship(fleetCoords[3])
    };
    let carrier = {
      name: 'carrier',
      length: 5,
      coords: fleetCoords[4],
      shipFunctions: ship(fleetCoords[4])
    };
    return [destroyer, submarine, cruiser, battleship, carrier];
  };

  console.log('gameboard has been called');
  let misses = [];
  let hits = [];
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

  const state = (() => {
    return {
      misses,
      hits,
      fleet
    };
  })();

  const getTargetWithLetter = t => {
    let row = parseInt(t.charAt(1), 10) + 1;
    let col = parseInt(t.charAt(2), 10);

    switch (col) {
      case 0:
        return row + 'A';

      case 1:
        return row + 'B';

      case 2:
        return row + 'C';

      case 3:
        return row + 'D';

      case 4:
        return row + 'E';

      case 5:
        return row + 'F';

      case 6:
        return row + 'G';

      case 7:
        return row + 'H';

      case 8:
        return row + 'I';

      case 9:
        return row + 'J';

      default:
    }
  };

  const receiveAttack = target => {
    let targetElement = document.getElementById(target);
    let messageElement = document.getElementById('message');

    if (hits.includes(target)) {
      return 'already hit';
    }

    for (let s of fleet) {
      if (s.coords.includes(target)) {
        s.shipFunctions.hit(target);
        hits.push(target);

        if (s.shipFunctions.isSunk()) {
          targetElement.innerHTML = `<img src='../src/assets/fire.png'>`;
          messageElement.innerHTML = realPlayer ? 'Sunk ship. Ouch.' : 'Sunk Ship!!!';

          for (let coord of s.coords) {
            document.getElementById(coord).className = 'sunk';
          }

          return 'sunk ship';
        }

        targetElement.className = 'hit';
        targetElement.innerHTML = `<img src='../src/assets/fire.png'>`;
        messageElement.innerHTML = realPlayer ? 'Hit. Lucky shot.' : 'Hit!';
        return 'hit';
      }
    }

    misses.push(target);
    document.getElementById(target).className = 'miss';
    messageElement.innerHTML = realPlayer ? 'Miss... pathetic.' : 'Miss!';
    return 'miss';
  };

  const allSunk = (ships = fleet) => {
    for (let s of ships) {
      if (!s.shipFunctions.isSunk()) {
        return false;
      }
    }

    document.getElementById('message').innerHTML = realPlayer ? '... you lost.' : 'Victory!';
    return true;
  };

  const addShip = s => {
    fleet.push(s);
    return fleet;
  };

  return {
    receiveAttack,
    state,
    allSunk,
    addShip
  };
};

module.exports = gameboard;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ship = __webpack_require__(/*! ./ship.js */ "./src/ship.js");

const gameboard = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");

const player = __webpack_require__(/*! ./player.js */ "./src/player.js");

const displayController = __webpack_require__(/*! ./displayController.js */ "./src/displayController.js");

const eventController = __webpack_require__(/*! ./eventController.js */ "./src/eventController.js");

const game = (() => {
  const init = () => {
    console.log('new game');
    let customFleet = true;
    let p = player(customFleet, true);
    let enemy = player(false, false);

    if (customFleet) {
      eventController.setFleet(p);
    } else {
      document.getElementById('message').innerHTML = 'Fire when ready!';
    }

    displayController.renderBoards(p.board, enemy.board);
    eventController.attack(p, enemy);
  };

  init();
  document.getElementById('newGame').addEventListener('click', init);
})();

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const gameboard = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");

const player = (customFleet = false, realPlayer = false) => {
  let board = gameboard(realPlayer, customFleet);
  let pastTargets = ['none'];

  const randomTarget = () => {
    let target = 'none';

    while (pastTargets.includes(target)) {
      target = Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10);
    }

    return target;
  };

  const getTargetWithLetter = t => {
    let row = parseInt(t.charAt(1), 10) + 1;
    let col = parseInt(t.charAt(2), 10);

    switch (col) {
      case 0:
        return row + 'A';

      case 1:
        return row + 'B';

      case 2:
        return row + 'C';

      case 3:
        return row + 'D';

      case 4:
        return row + 'E';

      case 5:
        return row + 'F';

      case 6:
        return row + 'G';

      case 7:
        return row + 'H';

      case 8:
        return row + 'I';

      case 9:
        return row + 'J';

      default:
    }
  };

  const attack = (target, enemy) => {
    const messageElement = document.getElementById('message');
    let result = '';
    let targetElement = '';

    if (realPlayer) {
      result = enemy.board.receiveAttack(target);
      messageElement.style.color = 'white';
      document.getElementById('enemyStatus').innerHTML = getTargetWithLetter(target) + ' ' + result;
    } else {
      target = '1' + randomTarget();
      result = enemy.board.receiveAttack(target);
      messageElement.style.color = '#FF4136';
      document.getElementById('playerStatus').innerHTML = getTargetWithLetter(target) + ' ' + result;
    }

    pastTargets.push(target);
  };

  return {
    attack,
    board
  };
};

module.exports = player;

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ship = coordinates => {
  let coords = coordinates;
  let hits = [];

  const hit = position => {
    hits.push(position);
    document.getElementById(position).innerHTML += 'x';
  };

  const isSunk = () => {
    return getHits.length == coords.length;
  };

  const getHits = (() => {
    return hits;
  })();

  return {
    hit,
    isSunk
  };
};

module.exports = ship;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map