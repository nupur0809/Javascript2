// q7_allSettled_lazy_loader.js
// Use provided functions, randomly reject one, and use Promise.allSettled()
// Print which succeeded or failed and total time taken.

function loadProfile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.25 ? reject(new Error("Profile failed")) : resolve("Profile Loaded");
    }, 2000);
  });
}
function loadPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.25 ? reject(new Error("Posts failed")) : resolve("Posts Loaded");
    }, 1500);
  });
}
function loadMessages() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.25 ? reject(new Error("Messages failed")) : resolve("Messages Loaded");
    }, 1000);
  });
}

async function loadAllModules() {
  const start = Date.now();
  const results = await Promise.allSettled([loadProfile(), loadPosts(), loadMessages()]);
  const end = Date.now();
  results.forEach((r, idx) => {
    const name = ["Profile", "Posts", "Messages"][idx];
    if (r.status === "fulfilled") {
      console.log(`${name} succeeded ->`, r.value);
    } else {
      console.log(`${name} failed ->`, r.reason.message);
    }
  });
  console.log(`Total time: ${end - start} ms`);
}

loadAllModules();
