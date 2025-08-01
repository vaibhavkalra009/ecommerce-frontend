const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

async function fetchAndDisplayProducts() {
  const productContainer = document.getElementById("productContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");

  // Show loading
  loadingMessage.style.display = "block";
  errorMessage.style.display = "none";

  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/mens-shoes?limit=4"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const products = data.products;

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
        <img src="${product.images[0]}" alt="${product.title}" />

        <h4 class="product-name">${truncatedTitle}</h4>
        <p class="product-price">$${product.price}</p>
        <button class="add-to-cart">View Product</button>
      `;

      box.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
      });

      productContainer.appendChild(box);
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    loadingMessage.style.display = "none";
    errorMessage.style.display = "block";
  }
}
fetchAndDisplayProducts();

const testimonials = [
  {
    text: "These are the most comfortable shoes I've ever owned! I wore them for 10 hours straight on my trip and my feet felt amazing.",
    author: "Aarav Sinha, New Delhi",
  },
  {
    text: "Stylish, durable, and super light. Got so many compliments at work. Already ordered my second pair!",
    author: "Meera Joshi, Mumbai",
  },
  {
    text: "Loved the design and quality! Just wish they had more color options. Still, a great purchase.",
    author: "Ravi Menon, Bangalore",
  },
  {
    text: "Excellent grip and cushioning. Perfect for my daily runs. Highly recommend to all fitness lovers.",
    author: "Karan Deshmukh, Pune",
  },
];

let currentIndex = 0;

function displayTestimonial(index) {
  const reviews = document.querySelector(".quote-text");
  reviews.innerHTML = ""; // Clear old content

  const testimonialText = document.createElement("h5");
  testimonialText.innerHTML = `
    "${testimonials[index].text}"<br><em>- ${testimonials[index].author}</em>
  `;

  reviews.appendChild(testimonialText);
}

function setupTestimonialNavigation() {
  const leftBtn = document.querySelector(".prev");
  const rightBtn = document.querySelector(".next");

  leftBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    displayTestimonial(currentIndex);
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    displayTestimonial(currentIndex);
  });
}
function updateCartCountInNavbar() {
  const cartNum = document.getElementById("cartCount");
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartNum) {
    cartNum.textContent = cart.length;
  }
}

// Initial call
displayTestimonial(currentIndex);
setupTestimonialNavigation();

updateCartCountInNavbar();

const cartIcon = document.getElementById("cartIcon");

cartIcon.addEventListener("click", () => {
  window.location.href = "cart.html";
});
