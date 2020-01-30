"use strict";
const gameboard = require('./gameboard.js');


const displayController = (() => {
    const container = document.getElementById('container');
    const enemyBoardElement = document.getElementById('enemyBoard');
    const enemyRows = enemyBoardElement.rows;
    const playerBoardElement = document.getElementById('playerBoard');
    const playerRows = playerBoardElement.rows;

    const init = (() => {
        for(let i = 1; i < enemyRows.length; i++) {
            for (let j = 0; j < 10; j++) {
                playerRows[i].insertAdjacentHTML('beforeend',`<td id=1${i-1}${j} class='blankCoord'></td>`);
                enemyRows[i].insertAdjacentHTML('beforeend',`<td id=2${i-1}${j} class='blankCoord'></td>`); 
            }
        }
    })();
// something is wrong.. make sure the old fleet isn't receiving hits somehow
    const renderBoards = (playerBoard, enemyBoard) => {
        let pState = playerBoard.state;
        let eState = enemyBoard.state;
        for(let i = 1; i < enemyRows.length; i++) {
            for (let j = 0; j < 10; j++) {
                document.getElementById('1' + (i-1) + j).className = 'blankCoord';
                document.getElementById('2' + (i-1) + j).className = 'blankCoord';
                document.getElementById('1' + (i-1) + j).innerHTML = '';
                document.getElementById('2' + (i-1) + j).innerHTML = '';
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
            document.getElementById(pState.hits[i]).innerHTML = `<img src='../src/assets/fire.png'>` ;
        }
        for (let i = 0; i < eState.hits; i++) {
            document.getElementById(eState.hits[i]).className = 'hit';
            document.getElementById(pState.hits[i]).innerHTML = `<img src='../src/assets/fire.png'>` ;
        }
        
        for (let i = 0; i < pState.fleet.length; i++) {
            for (let j = 0; j < pState.fleet[i].coords.length; j++) {
                document.getElementById(pState.fleet[i].coords[j]).className = 'ship';
            }
        }

    }

    return {renderBoards}
        
})()

module.exports = displayController;
