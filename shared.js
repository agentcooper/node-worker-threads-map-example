// @ts-check

/**
 * @param {number} i
 */
async function cpuHeavyFunction(i) {
  let output = i;
  for (let i = 0; i < 1000000000; i++) {
    output = i % 100;
  }
  return Promise.resolve(i * 2);
}

/**
 * @param {number} start
 * @param {number} end
 */
function range(start, end) {
  return Array.from(Array(end - start + 1), (_, i) => i + start);
}

function getData(end = 50) {
  return range(1, end);
}

/**
 * @param {string} s
 */
function parseNumber(s) {
  const number = Number(s);
  if (isNaN(number)) {
    return undefined;
  }
  return number;
}

module.exports = {
  range,
  cpuHeavyFunction,
  getData,
  parseNumber,
};
