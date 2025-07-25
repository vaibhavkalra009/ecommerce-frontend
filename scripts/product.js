// // Navigation -->
const cartIcon = document.getElementById("cartIcon");

cartIcon.addEventListener("click", () => {
  window.location.href = "cart.html";
});
// // Navigation end -->

// // Star Review Functionality -->
const stars = document.querySelectorAll(".star-rating span");
const ratingText = document.getElementById("rating-value");

function fillStars(rating) {
  stars.forEach((star) => {
    const value = parseInt(star.getAttribute("data-value"));
    if (value <= Math.floor(rating)) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}
// // Star review ends -->

// // Fetch product from localStorage and display -->
function DisplayProductFromLocalStorage() {
  const productImage = document.getElementById("product-image");
  const productLeftSide = document.getElementById("product-left-side");
  const price = document.getElementById("price");
  const productDetails = document.getElementById("product-details");

  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!product) {
    productDetails.innerHTML = "<p style='color:red'>No product selected.</p>";
    return;
  }

  const imageBox = document.createElement("div");

  const title = document.createElement("h3");
  title.innerHTML = `<h3 class="product-title">${product.title}</h3>`;

  const description = document.createElement("p");
  description.innerHTML = `<p>${product.description}</p>`;

  const productPrice = document.createElement("p");
  productPrice.textContent = `Price: $${product.price}`;

  const mainImage = document.getElementById("mainImage");
  mainImage.src = product.images[0];
  mainImage.alt = product.title;

  productImage.prepend(imageBox);
  productLeftSide.appendChild(title);
  productDetails.insertBefore(description, price);
  price.appendChild(productPrice);
  fillStars(product.rating);
}

DisplayProductFromLocalStorage();
// // Fetching product ends -->

// // Add to Cart Functionality -->
const addToCartBtn = document.getElementById("add-to-cart");
const cartNum = document.getElementById("cartCount");
const shoeSize = document.getElementById("shoeSize");
const navbtns = document.getElementById("navigation-btns");
const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

updateCartCountInNavbar(); // Initialize cart count

addToCartBtn.addEventListener("click", () => {
  const selectedSize = shoeSize.value;

  const oldAlert = document.getElementById("size-alert");
  if (oldAlert) oldAlert.remove();

  if (!selectedSize) {
    const alert = document.createElement("p");
    alert.textContent = "⚠️ Please select a shoe size";
    alert.style.color = "red";
    alert.id = "size-alert";
    navbtns.appendChild(alert);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const alreadyInCart = cart.find((item) => item.id === selectedProduct.id);

  if (!alreadyInCart) {
    cart.push({ ...selectedProduct, size: selectedSize });
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  // ✅ Show popup
  const popup = document.getElementById("cartPopup");
  if (popup) {
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3500);
  }

  // ✅ Update button text and cart count
  addToCartBtn.textContent = "Added to cart ";
  addToCartBtn.style.backgroundColor = "orange";
  updateCartCountInNavbar();
});
// // Add to cart ends -->

function updateCartCountInNavbar() {
  const cartNum = document.getElementById("cartCount");
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartNum) {
    cartNum.textContent = cart.length;
  }
}

// // Zoom functionality -->
const mainImage = document.getElementById("mainImage");
const zoomBox = document.getElementById("zoomBox");

mainImage.addEventListener("mouseenter", () => {
  zoomBox.style.display = "block";
  zoomBox.style.backgroundImage = `url('${mainImage.src}')`;
});

mainImage.addEventListener("mouseleave", () => {
  zoomBox.style.display = "none";
});

mainImage.addEventListener("mousemove", (e) => {
  const rect = mainImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  zoomBox.style.left = `${x}px`;
  zoomBox.style.top = `${y}px`;
  zoomBox.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});
// // Zoom ends -->
