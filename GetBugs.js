// q3_getBugs.js
// Original callback-based function:
// function fetchBugs(callback) {
//   setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
// }

// Convert to Promise-based getBugs()
function getBugs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failed = Math.random() < 0.2; // simulate 20% chance of API failure
      if (failed) {
        reject(new Error("Failed to fetch bugs from server"));
      } else {
        resolve(["UI glitch", "API timeout", "Login failure"]);
      }
    }, 1000);
  });
}

// Use it and log neatly with console.table()
getBugs()
  .then((bugs) => {
    console.log("Bugs retrieved:");
    console.table(bugs.map((b, i) => ({ id: i + 1, bug: b })));
  })
  .catch((err) => console.error("Error fetching bugs:", err.message));
