const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function renderCartItems() {
  const cartContainer = document.getElementById("cart-container");
  const cartRightSection = document.querySelector(".cartRightSection");
  const cart = getCartData();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const cartLeftSection = document.createElement("div");
  cartLeftSection.classList.add("cartLeftSection");

  cart.forEach((product, index) => {
    const productElement = createCartProductElement(product, index);
    cartLeftSection.appendChild(productElement);

    if (index !== cart.length - 1) {
      cartLeftSection.appendChild(createDivider());
    }
  });

  cartContainer.appendChild(cartLeftSection);
  cartContainer.appendChild(cartRightSection);

  attachQuantityListeners(cart);
}

function getCartData() {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
}

function createCartProductElement(product, index) {
  const container = document.createElement("div");
  container.classList.add("cartProductBox");

  const quantitySection = document.createElement("div");
  quantitySection.classList.add("quantitySelectorAndImage");

  quantitySection.innerHTML = `
    <div class="productImage">
      <img src="${product.images[0]}" width="100" />
    </div>
    <div class="quantitySelector">
      <button class="decrease">-</button>
      <input class="quantityInput" type="number" value="1" readonly />
      <button class="increase">+</button>
    </div>
  `;

  const detailsSection = document.createElement("div");
  detailsSection.classList.add("cartDetails");

  detailsSection.innerHTML = `
    <div class="cartTitleBox">
      <h3>${product.title}</h3>
      <span>${product.sku}, </span><span>${product.category}</span>
    </div>
    <div class="priceShip">
      <h2>$${product.price}</h2>
      <p>${product.shippingInformation}</p>
    </div>
    <div>
      <button id="removeProduct" onclick="removeFromCart(${index})">Remove</button>
    </div>
  `;

  container.appendChild(quantitySection);
  container.appendChild(detailsSection);

  return container;
}

function createDivider() {
  const divider = document.createElement("hr");
  divider.classList.add("product-divider");
  return divider;
}

function attachQuantityListeners(cart) {
  const productBoxes = document.querySelectorAll(".cartProductBox");

  productBoxes.forEach((box, index) => {
    const decreaseBtn = box.querySelector(".decrease");
    const increaseBtn = box.querySelector(".increase");
    const quantityInput = box.querySelector(".quantityInput");
    const productPrice = cart[index].price;

    const updateTotal = () => {
      let grandTotal = 0;

      productBoxes.forEach((box, i) => {
        const qty = parseInt(box.querySelector(".quantityInput").value);
        const price = cart[i].price;
        grandTotal += price * qty;
      });

      document.getElementById(
        "totalAmount"
      ).innerHTML = `Total amount : <span style="color:red;">$${grandTotal.toFixed(
        2
      )}</span>`;
    };

    decreaseBtn.addEventListener("click", () => {
      let qty = parseInt(quantityInput.value);
      if (qty > 1) {
        quantityInput.value = qty - 1;
        updateTotal();
      }
    });

    increaseBtn.addEventListener("click", () => {
      let qty = parseInt(quantityInput.value);
      quantityInput.value = qty + 1;
      updateTotal();
    });

    updateTotal();
  });
}

function removeFromCart(index) {
  const cart = getCartData();
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCartItems();
}

renderCartItems();

function updateCartCountInNavbar() {
  const cartNum = document.getElementById("cartCount");
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartNum) {
    cartNum.textContent = cart.length;
  }
}
updateCartCountInNavbar();
