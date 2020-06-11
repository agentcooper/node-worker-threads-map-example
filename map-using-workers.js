// @ts-check

const os = require("os");
const { Worker } = require("worker_threads");
const { range } = require("./shared");

const cpuCount = os.cpus().length;

/**
 * @template T
 * @template U
 * @param {T[]} inputArray
 * @param {string} workerFilename
 * @returns {Promise<U[]>}
 */
async function mapUsingWorkers(inputArray, workerFilename) {
  const outputArray = new Array(inputArray.length);
  const chunkSize = Math.floor(inputArray.length / cpuCount);

  const promises = range(0, cpuCount - 1).map((cpuIndex) => {
    const isLast = cpuIndex === cpuCount - 1;

    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(workerFilename, {
        workerData: {
          inputArray,
          startIndex: cpuIndex * chunkSize,
          endIndex: isLast
            ? inputArray.length - 1
            : (cpuIndex + 1) * chunkSize - 1,
        },
      });
      worker.once("message", ({ chunk, startIndex }) => {
        for (let i = 0; i < chunk.length; i++) {
          outputArray[startIndex + i] = chunk[i];
        }
        resolve();
      });
      worker.on("error", reject);
    });
    return promise;
  });

  return Promise.all(promises).then(() => {
    return outputArray;
  });
}

module.exports = {
  mapUsingWorkers,
};
