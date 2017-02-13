const usedKeys = {};
const MULTIPLIER = Math.pow(2, 24);

function generateRandomKey() {
  let key;
  while (key === undefined || usedKeys.hasOwnProperty(key) || !isNaN(Number(key))) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  return key;
}

export default generateRandomKey;
