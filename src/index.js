"use strict";
const ship = require('./ship.js');
const gameboard = require('./gameboard.js');
const player = require('./player.js');
const displayController = require('./displayController.js');
const eventController = require('./eventController.js');

const game = (() => {
    const init = () => {
        console.log('init new game')
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
    }

    init();
    document.getElementById('newGame').addEventListener('click', init);

})()
