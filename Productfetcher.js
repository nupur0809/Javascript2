// q6_product_fetcher.js
// Fetch products from https://fakestoreapi.com/products
// Logs Title, Price ($), Image URL.
// Works in browser. In Node 18+ fetch is available.
// Handle errors and show message on failure.

async function fetchProducts() {
  const url = "https://fakestoreapi.com/products";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const products = await res.json();
    products.forEach((p) => {
      console.log(`Product: ${p.title}`);
      console.log(`Price: $${p.price}`);
      console.log(`Image: ${p.image}`);
      console.log("---");
    });
    // Bonus (optional): create DOM cards (run in browser only)
    /*
    const container = document.createElement('div');
    container.id = 'products';
    products.forEach(p => {
      const card = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = p.title;
      const price = document.createElement('p');
      price.textContent = `$${p.price}`;
      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.title;
      img.width = 120;
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      container.appendChild(card);
    });
    document.body.appendChild(container);
    */
  } catch (err) {
    console.error("Failed to load products. Please try again.", err.message);
  }
}

// Run:
fetchProducts();
