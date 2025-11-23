// q9_event_loop_debug.js
// Predict and explain execution order, then run and compare.

// Predicted output in comments:
// 1. Script start
// 2. Script end
// 3. Promise callback
// 4. Timeout callback
//
// Explanation: Promises schedule microtasks which run right after the current
// call stack completes and before macrotasks like setTimeout. So microtasks run before macrotasks.

console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

// If you run this, you'll observe:
// Script start
// Script end
// Promise callback
// Timeout callback
//
// This matches the prediction and demonstrates microtasks (Promise callbacks)
// have higher priority (run before macrotasks) once the current call stack is done.
