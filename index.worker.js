// @ts-check

const { isMainThread, parentPort, workerData } = require("worker_threads");

const { cpuHeavyFunction } = require("./shared");

async function worker() {
  const chunk = [];

  /**
   * @param {number} index
   */
  async function compute(index) {
    if (index > workerData.endIndex) {
      parentPort.postMessage({
        chunk,
        startIndex: workerData.startIndex,
        endIndex: workerData.endIndex,
      });
      return;
    }

    const result = await cpuHeavyFunction(workerData.inputArray[index]);
    chunk.push(result);
    return compute(index + 1);
  }

  await compute(workerData.startIndex);
}

if (isMainThread) {
  throw new Error("This code is supposed to be executed on the worker thread.");
}

worker();
