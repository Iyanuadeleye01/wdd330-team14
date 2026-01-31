import ExternalServices from "./externalServices.mjs";
import ProductList from "./ProductList.js";
import {getParam , loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
console.log("Category from URL:", category);

document.querySelector(".title").textContent =
  `Top Products: ${category.replace("-", " ")}`;

// first create an instance of the ProductData class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
productList.init();
