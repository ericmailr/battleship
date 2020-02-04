
const ship = (coordinates) => {
  const coords = coordinates;
  const hits = [];
  const hit = (position) => {
    hits.push(position);
    document.getElementById(position).innerHTML += 'x';
  };

  const getHits = (() => hits)();

  const isSunk = () => getHits.length === coords.length;

  return { hit, isSunk };
};

export default ship;
