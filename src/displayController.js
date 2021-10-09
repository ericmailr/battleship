
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

  return { renderBoards };
})();

export default displayController;
