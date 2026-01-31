const baseURL = "https://sleepoutside-api.herokuapp.com/api/";

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );
    const data = await response.json();
    return data;
  }

  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${id}`
    );
    return await response.json();
  }
}
