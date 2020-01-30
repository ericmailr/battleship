"use strict";
const ship = require('./ship');

const gameboard = (realPlayer, customFleet) => {

 
    const aiFleet = () => {
            let fleetCoords = [['200','201'],['223','224','225'],['277','287','297'],['280','281','282','283'],['250','251','252','253','254']];
            let destroyer = {name: 'destroyer', length: 2, coords: fleetCoords[0], shipFunctions: ship(fleetCoords[0])};
            let submarine = {name: 'submarine', length: 3, coords: fleetCoords[1], shipFunctions: ship(fleetCoords[1])};
            let cruiser = {name: 'cruiser', length: 3, coords: fleetCoords[2], shipFunctions: ship(fleetCoords[2])};
            let battleship = {name: 'battleship', length: 4, coords: fleetCoords[3], shipFunctions: ship(fleetCoords[3])};
            let carrier = {name: 'carrier', length: 5, coords: fleetCoords[4], shipFunctions: ship(fleetCoords[4])};
            return [destroyer, submarine, cruiser, battleship, carrier];
    }

    const playerFleet = () => {
            let fleetCoords = [['100','101'],['123','124','125'],['177','187','197'],['180','181','182','183'],['150','151','152','153','154']];
            let destroyer = {name: 'destroyer', length: 2, coords: fleetCoords[0], shipFunctions: ship(fleetCoords[0])};
            let submarine = {name: 'submarine', length: 3, coords: fleetCoords[1], shipFunctions: ship(fleetCoords[1])};
            let cruiser = {name: 'cruiser', length: 3, coords: fleetCoords[2], shipFunctions: ship(fleetCoords[2])};
            let battleship = {name: 'battleship', length: 4, coords: fleetCoords[3], shipFunctions: ship(fleetCoords[3])};
            let carrier = {name: 'carrier', length: 5, coords: fleetCoords[4], shipFunctions: ship(fleetCoords[4])};
            return [destroyer, submarine, cruiser, battleship, carrier];
    }

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
 
/*    const init = () => {
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
        return {misses, hits, fleet}
    }
*/
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


    const receiveAttack = (target) => {
        console.log('here: ' + fleet[0].coords);
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
        messageElement.innerHTML = realPlayer ? 'Miss... pathetic.' : 'Miss!' ;
        return 'miss';
    }

    const allSunk = (ships = fleet) => {
        for (let s of ships) {
            if (!s.shipFunctions.isSunk()){
                return false;
            }
        }
        document.getElementById('message').innerHTML = realPlayer ? '... you lost.' : 'Victory!';
        return true;
    }

    const addShip = (s) => {
        fleet.push(s);
        return fleet;
    }

    const state = (() => {
        return {misses, hits, fleet} 
    })()

    return {receiveAttack, state, allSunk, addShip};
}

module.exports = gameboard;
