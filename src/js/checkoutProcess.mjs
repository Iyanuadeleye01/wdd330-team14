import ProductData from "./ProductData.mjs";
import { getLocalStorage } from "./utils.mjs";

export default class checkoutProcess {
  constructor(cartKey, outputSelector) {
    this.key = cartKey;
    this.outputSelector = outputSelector; // e.g., ".order-summary"
    this.list = [];
    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.services = new ProductData();
  }

  // load cart and show subtotal
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice) * (item.quantity ?? 1),
      0
    );
    document.querySelector(`${this.outputSelector} #cart-total`).textContent =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    const itemCount = this.list.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    );

    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).textContent =
      `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).textContent =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #total`).textContent =
      `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.FinalPrice,
      quantity: item.quantity ?? 1
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries());

    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    return await this.services.checkout(order);
  }
}
