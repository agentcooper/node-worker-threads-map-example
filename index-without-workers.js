const { cpuHeavyFunction, getData, parseNumber } = require("./shared");

async function main() {
  console.time("Computation");

  const data = getData(parseNumber(process.argv[2]));
  const mappedData = await Promise.all(data.map(cpuHeavyFunction));
  console.log(mappedData);

  console.timeEnd("Computation");
}

main();
