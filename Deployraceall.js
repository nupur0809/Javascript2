// q4_deploy_race_all.js
// Server A: 2s, Server B: 3s. Use Promise.all and Promise.race.
// Simulate random failure using Math.random().

function respondFromServer(name, timeMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error(`${name} failed during deployment`));
      } else {
        resolve(`${name} responded in ${timeMs}ms`);
      }
    }, timeMs);
  });
}

const serverA = respondFromServer("Server A", 2000);
const serverB = respondFromServer("Server B", 3000);

// Promise.all -> all must succeed
Promise.all([serverA, serverB])
  .then((results) => {
    console.log(results);
    console.log("Deployment completed for all servers");
  })
  .catch((err) => {
    console.error("One or more servers failed:", err.message);
  });

// Promise.race -> first to settle (resolve or reject)
// Show fastest successful response; handle first rejection too.
Promise.race([serverA, serverB])
  .then((first) => {
    console.log("Fastest response:", first);
  })
  .catch((err) => {
    console.error("Fastest responder failed:", err.message);
  });
