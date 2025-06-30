const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  console.log("clicked");
});

async function fetchAndDisplayProducts() {
  const productContainer = document.getElementById("productContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");

  // Show loading
  loadingMessage.style.display = "block";
  errorMessage.style.display = "none";

  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=8");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const products = await response.json();

    // Clear loading message
    loadingMessage.style.display = "none";

    products.forEach((product, index) => {
      const box = document.createElement("div");
      const boxClasses = ["box-1", "box-2", "box-3", "box-4"];
      box.classList.add("box", boxClasses[index % boxClasses.length]);

      const truncatedTitle =
        product.title.length > 18
          ? product.title.slice(0, 18) + "..."
          : product.title;

      box.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h4 class="product-name">${truncatedTitle}</h4>
        <p class="product-price">$${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;

      productContainer.appendChild(box);
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    loadingMessage.style.display = "none";
    errorMessage.style.display = "block";
  }
}
fetchAndDisplayProducts();
