const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
const quantity = document.getElementById("quantity");

decrease.addEventListener("click", () => {
  let currentValue = parseInt(quantity.value);
  if (currentValue > 1) {
    quantity.value = currentValue - 1;
  }
});

increase.addEventListener("click", () => {
  let currentValue = parseInt(quantity.value);
  quantity.value = currentValue + 1;
});

function DisplayProduct() {
  const rightSide = document.querySelector(".right-side"); // ✅ use singular element
  const leftSide = document.querySelector(".left-side");
  const product = JSON.parse(localStorage.getItem("selectedProduct")); // ✅ correct key
  const priceDetails = document.querySelector(".price-details");

  if (!product) {
    rightSide.innerHTML = "<p>No product found</p>";
    return;
  }

  const productImage = document.createElement("img");
  const productTitle = document.createElement("h3");
  const category = document.createElement("p");
  const availabilityStatus = document.createElement("p");
  const price = document.createElement("p");
  const shippingInformation = document.createElement("p");

  productImage.src = product.images[0]; // or product.thumbnail
  productTitle.textContent = product.title;
  category.textContent = `Category: ${product.category}`;
  price.textContent = `Price: $${product.price}`;
  shippingInformation.textContent = `${product.shippingInformation}`;
  availabilityStatus.textContent = `${product.availabilityStatus}`;

  leftSide.prepend(productImage);
  rightSide.appendChild(productTitle);
  rightSide.appendChild(category);
  rightSide.appendChild(price);
  rightSide.appendChild(shippingInformation);
  rightSide.appendChild(availabilityStatus);
}
DisplayProduct();
