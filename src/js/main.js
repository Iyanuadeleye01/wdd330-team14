import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const datasource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents",datasource, element);

productList.init();