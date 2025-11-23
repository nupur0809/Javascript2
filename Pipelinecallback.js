// q5_pipeline_callbacks_and_async.js
// 5 stages: design -> build -> test -> deploy -> celebrate
// Each stage takes 1 second and logs its step.
// First show nested callbacks (bad); then show async/await (good).

// Helper
function stage(name) {
  return (cb) => {
    setTimeout(() => {
      console.log(`Stage: ${name}`);
      if (typeof cb === "function") cb();
    }, 1000);
  };
}

/* -------------------------------
   Nested callbacks (Callback Hell)
   ------------------------------- */
function pipelineWithCallbacks() {
  console.log("Starting pipeline (callbacks)...");
  stage("design")(() => {
    stage("build")(() => {
      stage("test")(() => {
        stage("deploy")(() => {
          stage("celebrate")(() => {
            console.log("Pipeline (callbacks) finished");
          });
        });
      });
    });
  });
}

/* -------------------------------
   Cleaner version: async/await
   ------------------------------- */
function waitStage(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Stage: ${name}`);
      resolve(name);
    }, 1000);
  });
}

async function pipelineWithAsyncAwait() {
  console.log("Starting pipeline (async/await)...");
  await waitStage("design");
  await waitStage("build");
  await waitStage("test");
  await waitStage("deploy");
  await waitStage("celebrate");
  console.log("Pipeline (async/await) finished");
}

/*
Why async/await improves readability:
- It flattens nested callbacks into linear, top-to-bottom code that reads like synchronous code.
- Error handling is simpler with try/catch.
- The control flow is clearer, reducing indentation and cognitive load.
*/

// Uncomment to run either:
pipelineWithCallbacks();
// pipelineWithAsyncAwait();
