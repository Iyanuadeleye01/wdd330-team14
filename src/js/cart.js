import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderCartContents(cartItems) {
  const list = document.querySelector(".product-list");
  const htmlItems = cartItems.map(cartItemTemplate);
  list.innerHTML = htmlItems.join("");
}

function renderCartTotal(cartItems) {
  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (!cartItems || cartItems.length === 0) {
    footer.classList.add("hide");
    return;
  }

  footer.classList.remove("hide");
   
  let sum = 0;
  cartItems.forEach((item) => {
    sum = sum + item.FinalPrice; // quantity is 1 for now
  });

  totalElement.textContent = `Total: $${sum.toFixed(2)}`;
}

const cartItems = getLocalStorage("so-cart") || [];

renderCartContents(cartItems);

renderCartTotal(cartItems);
