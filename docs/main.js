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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const displayController = (() => {
  const enemyBoardElement = document.getElementById('enemyBoard');
  const enemyRows = enemyBoardElement.rows;
  const playerBoardElement = document.getElementById('playerBoard');
  const playerRows = playerBoardElement.rows;

  for (let i = 1; i < enemyRows.length; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      playerRows[i].insertAdjacentHTML('beforeend', `<td id=1${i - 1}${j} class='blankCoord'></td>`);
      enemyRows[i].insertAdjacentHTML('beforeend', `<td id=2${i - 1}${j} class='blankCoord'></td>`);
    }
  }

  const renderBoards = (playerBoard, enemyBoard) => {
    const pState = playerBoard.state;
    const eState = enemyBoard.state;

    for (let i = 1; i < enemyRows.length; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        document.getElementById(`1${i - 1}${j}`).className = 'blankCoord';
        document.getElementById(`2${i - 1}${j}`).className = 'blankCoord';
        document.getElementById(`1${i - 1}${j}`).innerHTML = '';
        document.getElementById(`2${i - 1}${j}`).innerHTML = '';
      }
    }

    for (let i = 0; i < pState.misses; i += 1) {
      document.getElementById(pState.misses[i]).className = 'miss';
    }

    for (let i = 0; i < eState.misses; i += 1) {
      document.getElementById(eState.misses[i]).className = 'miss';
    }

    for (let i = 0; i < pState.hits; i += 1) {
      document.getElementById(pState.hits[i]).className = 'hit';
      document.getElementById(pState.hits[i]).innerHTML = '<img src=\'../src/assets/fire.png\'>';
    }

    for (let i = 0; i < eState.hits; i += 1) {
      document.getElementById(eState.hits[i]).className = 'hit';
      document.getElementById(pState.hits[i]).innerHTML = '<img src=\'../src/assets/fire.png\'>';
    }

    for (let i = 0; i < pState.fleet.length; i += 1) {
      for (let j = 0; j < pState.fleet[i].coords.length; j += 1) {
        document.getElementById(pState.fleet[i].coords[j]).className = 'ship';
      }
    }
  };

  return {
    renderBoards
  };
})();

/* harmony default export */ __webpack_exports__["default"] = (displayController);

/***/ }),

/***/ "./src/eventController.js":
/*!********************************!*\
  !*** ./src/eventController.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");




const eventController = (() => {
  const customFleet = true;
  let p;
  let enemy;
  const enemyBoardElement = document.getElementById('enemyBoard');
  let gameover = false;
  let attackBackTimeout = '';

  const attackHandler = e => {
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
      const taken = [];
      fleet.forEach(s => {
        if (s.coords !== undefined) {
          s.coords.forEach(c => {
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

    const getCoordsBetween = endCoord => {
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

    const mouseoverHandler = e => {
      cancelPotentialShips();
      const coordsBetween = getCoordsBetween(e.target.id);

      if (coordsBetween && coordsBetween.length <= fleet[newShipIndex].length) {
        for (const coord of coordsBetween) {
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
      const endRow = parseInt(e.target.id.charAt(1), 10);
      const endCol = parseInt(e.target.id.charAt(2), 10);
      const boardNumber = e.target.id.charAt(0);
      const coordsBetween = getCoordsBetween(`${boardNumber + endRow}${endCol}`);

      if (coordsBetween && coordsBetween.length === fleet[newShipIndex].length) {
        fleet[newShipIndex].coords = coordsBetween;
        fleet[newShipIndex].shipFunctions = Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(coordsBetween);
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
      const coord = e.target.id;

      if (takenCoords().includes(coord) || coord === '') {
        playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {
          once: true
        });
        return;
      }

      document.getElementById(coord).className = 'potentialShipCoord';
      currentInitial = coord;
      playerBoardElement.addEventListener('mouseover', mouseoverHandler, {
        once: true
      });
      playerBoardElement.addEventListener('mouseup', placeShipHandler, {
        once: true
      });
    };

    messageElement.innerHTML = `Place your ${fleet[newShipIndex].name} (${fleet[newShipIndex].length} squares)`;
    playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {
      once: true
    });
  };

  const init = () => {
    clearTimeout(attackBackTimeout);
    p = Object(_player__WEBPACK_IMPORTED_MODULE_2__["default"])(customFleet, true);
    enemy = Object(_player__WEBPACK_IMPORTED_MODULE_2__["default"])(false, false);

    if (customFleet) {
      _displayController__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoards(p.board, enemy.board);
      enemyBoardElement.removeEventListener('click', attackHandler);
      setFleet(p);
    } else {
      document.getElementById('message').innerHTML = 'Fire when ready!';
      enemyBoardElement.removeEventListener('click', attackHandler);
      _displayController__WEBPACK_IMPORTED_MODULE_1__["default"].renderBoards(p.board, enemy.board);
      startGame();
    }
  };

  return {
    init,
    startGame,
    setFleet
  };
})();

/* harmony default export */ __webpack_exports__["default"] = (eventController);

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


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
      name: 'destroyer',
      length: 2,
      coords: fleetCoords[0],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[0])
    };
    const submarine = {
      name: 'submarine',
      length: 3,
      coords: fleetCoords[1],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[1])
    };
    const cruiser = {
      name: 'cruiser',
      length: 3,
      coords: fleetCoords[2],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[2])
    };
    const battleship = {
      name: 'battleship',
      length: 4,
      coords: fleetCoords[3],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[3])
    };
    const carrier = {
      name: 'carrier',
      length: 5,
      coords: fleetCoords[4],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[4])
    };
    return [destroyer, submarine, cruiser, battleship, carrier];
  };

  const playerFleet = () => {
    const fleetCoords = [['100', '101'], ['123', '124', '125'], ['177', '187', '197'], ['180', '181', '182', '183'], ['150', '151', '152', '153', '154']];
    const destroyer = {
      name: 'destroyer',
      length: 2,
      coords: fleetCoords[0],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[0])
    };
    const submarine = {
      name: 'submarine',
      length: 3,
      coords: fleetCoords[1],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[1])
    };
    const cruiser = {
      name: 'cruiser',
      length: 3,
      coords: fleetCoords[2],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[2])
    };
    const battleship = {
      name: 'battleship',
      length: 4,
      coords: fleetCoords[3],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[3])
    };
    const carrier = {
      name: 'carrier',
      length: 5,
      coords: fleetCoords[4],
      shipFunctions: Object(_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(fleetCoords[4])
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

  const state = (() => ({
    misses,
    hits,
    fleet
  }))();

  const getTargetWithLetter = t => {
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

  const receiveAttack = target => {
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

/* harmony default export */ __webpack_exports__["default"] = (gameboard);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventController */ "./src/eventController.js");

_eventController__WEBPACK_IMPORTED_MODULE_0__["default"].init();
document.getElementById('newGame').addEventListener('click', _eventController__WEBPACK_IMPORTED_MODULE_0__["default"].init);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


const player = (customFleet = false, realPlayer = false) => {
  const board = Object(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(realPlayer, customFleet);
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

  return {
    attack,
    board
  };
};

/* harmony default export */ __webpack_exports__["default"] = (player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ship = coordinates => {
  const coords = coordinates;
  const hits = [];

  const hit = position => {
    hits.push(position);
    document.getElementById(position).innerHTML += 'x';
  };

  const getHits = (() => hits)();

  const isSunk = () => getHits.length === coords.length;

  return {
    hit,
    isSunk
  };
};

/* harmony default export */ __webpack_exports__["default"] = (ship);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map