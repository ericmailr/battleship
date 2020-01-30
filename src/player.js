"use strict";
const gameboard = require('./gameboard.js');

const player = (customFleet = false, realPlayer = false) => {


    let board = gameboard(realPlayer, customFleet);
    let pastTargets = ['none'];

    const randomTarget = () => {
        let target = 'none';
        while (pastTargets.includes(target)) {
            target = Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10);  
        }
        return target;
    }

    const getTargetWithLetter = (t) => {
        let row = parseInt(t.charAt(1),10) + 1;
        let col = parseInt(t.charAt(2),10);
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
    }


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
    }

    return {attack, board}
}

module.exports = player;
