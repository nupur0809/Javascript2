// q8_retry_order.js
// submitOrder fails 50% of the time. processOrder tries up to 3 times.

function submitOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(new Error("submitOrder: network error"));
      } else {
        resolve("Order submitted successfully");
      }
    }, 500);
  });
}

async function processOrder(maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await submitOrder();
      console.log(`Attempt ${attempt}: Success`);
      return; // done
    } catch (err) {
      console.log(`Attempt ${attempt}: Failed (${err.message})`);
      if (attempt === maxAttempts) {
        throw new Error("Order could not be processed");
      }
    }
  }
}

// Run and handle final failure gracefully
(async () => {
  try {
    await processOrder(3);
    console.log("Order processed!");
  } catch (err) {
    console.error(err.message);
  }
})();
