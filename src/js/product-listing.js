import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter, getParam} from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
// first create an instance of the productData class
const dataSource = new ProductData();
// then get the element you want the product list to render in
const element = document.querySelector(".product-list");
// then create an instance of the productList class and send it
const productList = new ProductList(category, dataSource, element);
// finally call the init method to show the products
productList.init();
