import checkoutProcess from "./checkoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new checkoutProcess("so-cart", ".order-summary");

// now init exists!
checkout.init();

// recalc order totals after ZIP is entered
document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

// submit form
document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await checkout.checkout(e.target);
  console.log(result);
});
