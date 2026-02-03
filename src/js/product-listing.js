import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// console.log("Category:", category);
// console.log("Base URL:", import.meta.env.VITE_SERVER_URL);
// console.log("Hello World")

const dataSource = new ProductData("");

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

loadHeaderFooter();

productList.init();
