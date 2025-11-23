// q2_eventloop_order.js
// Demonstrate microtask (Promise.then) vs macrotask (setTimeout).
// Logs and explanation in comments.

console.log("Start");

// macrotask
setTimeout(() => {
  console.log("setTimeout callback (macrotask)");
}, 0);

// microtask
Promise.resolve().then(() => {
  console.log("Promise.then callback (microtask)");
});

// synchronous
console.log("Synchronous log");

// final
console.log("End");

/*
Expected order when run:
Start
Synchronous log
End
Promise.then callback (microtask)
setTimeout callback (macrotask)

Explanation:
- Synchronous code runs first.
- When current call stack empties, microtasks (Promise callbacks) run before macrotasks (setTimeout).
- So Promise.then executes before setTimeout even though both were scheduled.
*/
