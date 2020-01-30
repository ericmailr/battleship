
"use strict";
const ship = require('./ship.js');
const displayController = require('./displayController.js');
const player = require('./player.js');

const eventController = (() => {

    const attack = (player, enemy) => {
        let enemyBoardElement = document.getElementById('enemyBoard');
        let gameover = false;

        const attackHandler = (e) => {
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
                        },18)
                    }
                }
        }
        enemyBoardElement.addEventListener('click', attackHandler);
    }

    // board setup

    const setFleet = (realPlayer) => {
        let board = realPlayer.board;
        let playerBoardElement = document.getElementById('playerBoard'); 
        let messageElement = document.getElementById('message');
        const fleet = [{name: 'destroyer', length: 2}, {name: 'submarine', length: 3}, {name: 'cruiser', length: 3}, {name: 'battleship', length: 4}, {name: 'carrier', length: 5}];
        let newShipIndex = 0;
        let currentInitial = [];

        const takenCoords = () => {
            let taken = [];
            for( let s of fleet ) {
                if (s.coords != undefined) {
                    for ( let c of s.coords ) {
                        taken.push(c);
                    }
                }
            }
            return taken;
        }

        const cancelPotentialShips = () => {
            let potentialShipElements = document.getElementsByClassName('potentialShipCoord');
            while (potentialShipElements.length) {
                potentialShipElements[0].className = 'blankCoord';
            }
        }

        const getCoordsBetween = (endCoord) => {
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
                           if (takenCoords().includes(coordsBetween[coordsBetween.length-1])) {
                                return false;
                           }
                       }  
                    } else {
                       for (let i = endCol; i < startCol; i++) {
                           coordsBetween.push(boardNumber + startRow + '' + i);
                           if (takenCoords().includes(coordsBetween[coordsBetween.length-1])) {
                                return false;
                           }
                       }
                   }
                } else if (startCol == endCol) {
                coordsBetween.push(boardNumber + startRow + '' + startCol);
                    if (startRow < endRow) {
                       for (let i = startRow + 1; i <= endRow; i++) {
                           coordsBetween.push(boardNumber + i + '' + startCol);
                           if (takenCoords().includes(coordsBetween[coordsBetween.length-1])) {
                                return false;
                           }
                       }
                    } else {
                       for (let i = endRow; i < startRow; i++) {
                           coordsBetween.push(boardNumber + i + '' + startCol);
                           if (takenCoords().includes(coordsBetween[coordsBetween.length-1])){
                                return false;
                           }
                       }
                }
            }
            return coordsBetween;
        }

        const mouseoverHandler = (e) => {
            cancelPotentialShips();
            let newCoordElement = document.getElementById(e.target.id);
            let coordsBetween = getCoordsBetween(e.target.id);
            if (coordsBetween && coordsBetween.length <= fleet[newShipIndex].length) {
                for (let coord of coordsBetween) {
                    document.getElementById(coord).className = 'potentialShipCoord';
                }
            }
            playerBoardElement.addEventListener('mouseover', mouseoverHandler, {once: true});
        }

        const placeShipHandler = (e) => {
           playerBoardElement.removeEventListener('mouseover', mouseoverHandler, {once: true});
           let endRow = parseInt(e.target.id.charAt(1),10);
           let endCol = parseInt(e.target.id.charAt(2),10);
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
                    playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {once: true});
                }
           } else {
               cancelPotentialShips();
               currentInitial = '';
               playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {once: true});
           }
        }

        const beginPotentialShipHandler = (e) => {
            let coord = e.target.id;
            if (takenCoords().includes(coord)) {
                playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {once: true});
                return;
            } else {
                document.getElementById(coord).className = 'potentialShipCoord';
                currentInitial = coord;
                playerBoardElement.addEventListener('mouseover', mouseoverHandler, {once: true});
                playerBoardElement.addEventListener('mouseup', placeShipHandler, {once: true});
            }
        }

        messageElement.innerHTML = `Place your ${fleet[newShipIndex].name} (${fleet[newShipIndex].length} squares)`;
        playerBoardElement.addEventListener('mousedown', beginPotentialShipHandler, {once: true});
    }

    return {attack, setFleet};
})()

module.exports = eventController;
