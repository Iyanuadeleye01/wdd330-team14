const baseURL = "https://wdd330-backend.onrender.com";

async function convertToJson(res) {
  const jsonFile = await res.json();
  if (res.ok) return jsonFile;
  throw { name: "servicesError", message: jsonFile };
}

export default class ExternalServices {
  // Fetch products by category or search term
  async getData(categoryOrTerm) {
    const res = await fetch(`${baseURL}/products/search/${categoryOrTerm}`);
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
