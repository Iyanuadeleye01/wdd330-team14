import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartItems = getLocalStorage("so-cart") || [];

const cartList = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-total");

function renderCart() {
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "Total: $0.00";
    return;
  }

  cartItems.forEach((item) => {
    cartList.innerHTML += `
      <li class="cart-card">
        <img src="${item.Images?.PrimaryMedium || item.Images}" width="100">
        <div>
          <h3>${item.NameWithoutBrand}</h3>
          <p>$${item.FinalPrice}</p>
        </div>
      </li>
    `;
  });

  calculateTotal();
}

function calculateTotal() {
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.FinalPrice);
  }, 0);

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

renderCart();