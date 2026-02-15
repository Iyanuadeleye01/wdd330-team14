import CheckoutProcess from "../js/checkoutProcess.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

const form = document.querySelector("#checkout-form");
const messageBox = document.querySelector("#checkout-message");

// Recalculate totals when ZIP loses focus
document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  messageBox.className = "message";
  messageBox.textContent = "";

  // HTML5 validation
  if (!form.checkValidity()) {
    form.reportValidity();
    showError("Please complete all required fields correctly.");
    return;
  }

  try {
    const result = await checkout.checkout(form);

    if (result) {
      showSuccess("🎉 Your order was placed successfully!");
      form.reset();
    } else {
      showError("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    showError("Checkout failed. Please try again later.");
  }
});

// Helper functions
function showSuccess(message) {
  messageBox.classList.add("success");
  messageBox.textContent = message;
}

function showError(message) {
  messageBox.classList.add("error");
  messageBox.textContent = message;
}
