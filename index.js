const path = require("path");
const { isMainThread } = require("worker_threads");

const { mapUsingWorkers } = require("./map-using-workers");
const { getData, parseNumber } = require("./shared");

async function main() {
  console.time("Computation");

  const data = getData(parseNumber(process.argv[2]));
  const mappedData = await mapUsingWorkers(
    data,
    path.join(__dirname, "./index.worker.js"),
  );
  console.log(mappedData);

  console.timeEnd("Computation");
}

if (!isMainThread) {
  throw new Error("This code is supposed to be executed on the main thread.");
}

main();
