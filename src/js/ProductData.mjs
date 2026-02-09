const baseURL = "https://wdd330-backend.onrender.com";

function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error("Bad Response");
}

export default class ProductData {
  async getData(category) {
    const res = await fetch(`${baseURL}/products/search/${category}`);
    const data = await convertToJson(res);
    return data.Result;
  }

  // GET single product by id
  async findProductById(id) {
    const res = await fetch(`${baseURL}/product/${id}`);
    const data = await convertToJson(res);
    return data.Result;
  }

  // POST checkout
  async checkout(payload) {
    const res = await fetch(`${baseURL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return convertToJson(res);
  }
}
