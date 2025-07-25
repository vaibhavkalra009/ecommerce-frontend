// //navigation -->

const cartIcon = document.getElementById("cartIcon");

cartIcon.addEventListener("click", () => {
  window.location.href = "cart.html";
});

// // navigation end -->

// Star review functionality starts -->

const stars = document.querySelectorAll(".star-rating span");
const ratingText = document.getElementById("rating-value");
let selectedRating = 0;

function fillStars(rating) {
  const stars = document.querySelectorAll(".star-rating span");
  stars.forEach((star) => {
    const value = parseInt(star.getAttribute("data-value"));
    if (value <= Math.floor(rating)) {
      star.classList.add("selected"); // full stars
    } else {
      star.classList.remove("selected");
    }
  });
}

// // star review functionality ends -->

// // fetching products from fake api -->

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
  const description = document.createElement("p");
  const productPrice = document.createElement("p");

  description.innerHTML = `<p>${product.description}</p>`;
  productPrice.textContent = `Price: $${product.price}`;

  //   imageBox.innerHTML = `<img src="${product.images[0]}"/>
  // `;
  const mainImage = document.getElementById("mainImage");
  mainImage.src = product.images[0];
  mainImage.alt = product.title;
  title.innerHTML = `<h3 class="product-title">${product.title}</h3>`;

  productImage.prepend(imageBox);
  productLeftSide.appendChild(title);
  productDetails.insertBefore(description, price);
  price.appendChild(productPrice);
  fillStars(product.rating);
}

DisplayProductFromLocalStorage();

// // fetching product ends -->

// // Add to cart functionality -->

const cart = document.getElementById("add-to-cart");
const cartNum = document.getElementById("cartCount");
const shoeSize = document.getElementById("shoeSize");
const navbtns = document.getElementById("navigation-btns");

let cartCounter = 0;

// shoe size -->

cart.addEventListener("click", () => {
  function showCartPopup() {
    const popup = document.getElementById("cartPopup");
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3500); // show for 2 seconds
  }
  const selectedSize = shoeSize.value;

  const oldAlert = document.getElementById("size-alert");
  if (oldAlert) {
    oldAlert.remove();
  }
  if (!selectedSize) {
    const alert = document.createElement("p");
    alert.textContent = "⚠️ Please select a shoe size";
    alert.style.color = "red";
    alert.id = "size-alert";
    navbtns.appendChild(alert);

    return;
  }
  // ends -->

  const inCart = cart.classList.toggle("in-cart");

  if (inCart) {
    cartCounter++;
    cart.textContent = "Added to cart ✅";
    cartNum.textContent = cartCounter;

    showCartPopup();
  } else {
    cartCounter--;
    cart.textContent = "Add to cart";
  }

  cartNum.textContent = cartCounter;
});

// ends

// zoom functionality start -->
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

  // Position zoomBox relative to image container instead of full page
  zoomBox.style.left = `${x}px`;
  zoomBox.style.top = `${y}px`;

  zoomBox.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});

// // zoom functionality end -->

// Add to cart button functionality --> starts

const addToCartBtn = document.getElementById("add-to-cart");
const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

addToCartBtn.addEventListener("click", () => {
  // Get existing cart or initialize
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Optional: Check for duplicates
  const alreadyInCart = cart.find((item) => item.id === selectedProduct.id);
  if (!alreadyInCart) {
    cart.push(selectedProduct);
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  // Redirect to cart page
  // window.location.href = "cart.html";
});

// ends -->
