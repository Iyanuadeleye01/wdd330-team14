import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

await productList.init(); // fetch products and render

// Search input for filtering inside category
const searchInput = document.querySelector("#category-search");

searchInput.addEventListener("input", (e) => {
  productList.filterByName(e.target.value);
});
