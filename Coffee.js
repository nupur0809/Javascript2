// q1_coffee.js
// Each step returns a Promise that resolves after 1-2 seconds.
// We use promise chaining (.then()) and simulate random failure.

function delayRandom(min = 1000, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function boilWater() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) return reject(new Error("Boiler malfunction"));
      console.log("Step: Water boiled");
      resolve("Boiled water");
    }, delayRandom());
  });
}

function brewCoffee(water) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) return reject(new Error("Coffee grounds empty"));
      console.log("Step: Coffee brewed with", water);
      resolve("Brewed coffee");
    }, delayRandom());
  });
}

function pourIntoCup(coffee) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) return reject(new Error("Cup dropped"));
      console.log("Step: Poured into cup:", coffee);
      resolve("Coffee ready for the team!");
    }, delayRandom());
  });
}

// Use Promise chaining (.then()) as requested:
boilWater()
  .then((water) => brewCoffee(water))
  .then((coffee) => pourIntoCup(coffee))
  .then((final) => console.log(final))
  .catch((err) => console.error("Coffee machine error:", err.message));
