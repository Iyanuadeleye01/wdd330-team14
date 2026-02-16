import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);


async function initPage() {
  await productList.init();
}

initPage();

// Search input for filtering inside category
const searchInput = document.querySelector("#category-search");

searchInput.addEventListener("input", (e) => {
  productList.filterByName(e.target.value);
});
