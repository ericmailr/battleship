"use strict";
const ship = (coordinates) => {
    let coords = coordinates; 
    let hits = [];
    const hit = (position) => {
        hits.push(position); 
        document.getElementById(position).innerHTML += 'x';
    }
    const isSunk = () => {
        return getHits.length == coords.length;
    }

    const getHits = (() => {
        return hits;
    })()

    return {hit, isSunk}
}

module.exports = ship;
