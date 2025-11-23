// q10_delivery_pipeline.js
// Steps: takeOrder -> prepare -> pack -> dispatch -> deliver
// Each returns a Promise with random 1-2s delay and random success/failure.
// runPipeline uses async/await and try/catch and logs each step.

function randDelay(min = 1000, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maybeFail(prob = 0.15, errMsg = "Step failed") {
  if (Math.random() < prob) throw new Error(errMsg);
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        maybeFail(0.1, "Failed to take order");
        resolve("Order taken");
      } catch (e) {
        reject(e);
      }
    }, randDelay());
  });
}

function prepare() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        maybeFail(0.15, "Failed to prepare food");
        resolve("Food prepared");
      } catch (e) {
        reject(e);
      }
    }, randDelay());
  });
}

function pack() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        maybeFail(0.1, "Failed to pack");
        resolve("Package ready");
      } catch (e) {
        reject(e);
      }
    }, randDelay());
  });
}

function dispatch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        maybeFail(0.1, "Dispatch failed");
        resolve("Out for delivery");
      } catch (e) {
        reject(e);
      }
    }, randDelay());
  });
}

function deliver() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        maybeFail(0.05, "Delivery failed");
        resolve("Delivery completed!");
      } catch (e) {
        reject(e);
      }
    }, randDelay());
  });
}

async function runPipeline() {
  console.log("Start Pipeline");
  try {
    console.log("Step 1: Order taken");
    await takeOrder();

    console.log("Step 2: Food prepared");
    await prepare();

    console.log("Step 3: Package ready");
    await pack();

    console.log("Step 4: Out for delivery");
    await dispatch();

    const res = await deliver();
    console.log(res);
    console.log("Delivery completed!");
  } catch (err) {
    console.error("Pipeline failed!", err.message);
  }
}

/*
Comments on async behavior & event loop:
- Each await pauses the async function but does NOT block the event loop.
  While awaiting, other tasks (microtasks/macrotasks) can run.
- Promises schedule microtasks for their resolution; awaiting a promise causes
  the rest of the async function to continue after the microtask queue
  handles the resolution.
*/
runPipeline();
