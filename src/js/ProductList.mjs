import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${product.Id}">
        <img src="${product.Images?.PrimaryMedium || '/images/placeholder.png'}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="favorite-btn" data-id="${product.Id}">
        ♡ Add to Favorites
      </button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // store fetched products
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list; // store for filtering

    this.updateTitle();
    this.renderList(this.products);
    this.addFavoriteListeners();
    this.markSavedFavorites();
  }

  updateTitle() {
    const titleElement = document.querySelector(".category");
    if (titleElement && this.category) {
      const categoryName = this.category.charAt(0).toUpperCase() + this.category.slice(1);
      titleElement.textContent = `Top Products: ${categoryName}`;
    }
  }

  renderList(list) {
    this.listElement.innerHTML = ""; // clear previous content
    if (!list || list.length === 0) {
      this.listElement.innerHTML = `<p>No products found</p>`;
      return;
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  filterByName(term) {
    const filtered = this.products.filter(product =>
      product.Name.toLowerCase().includes(term.toLowerCase())
    );
    this.renderList(filtered);
    this.addFavoriteListeners();
    this.markSavedFavorites();
  }

  addFavoriteListeners() {
    const buttons = this.listElement.querySelectorAll(".favorite-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.saveFavorite(id);
        btn.textContent = "♥ Saved";
      });
    });
  }

  saveFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  markSavedFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.listElement.querySelectorAll(".favorite-btn").forEach(btn => {
      if (favorites.includes(btn.dataset.id)) {
        btn.textContent = "♥ Saved";
      }
    });
  }
}
