// Exporting using CommonJS syntax
exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.noOfProducts = "//*[@id='tbodyid']/tr/td[2]";
  }

  async checkProductInCart(productName) {
    const productsIncart = await this.page.$$(this.noOfProducts);
    console.log(`Found ${productsIncart.length} products in the cart.`);

    for (const productc of productsIncart) {
      const productText = await productc.textContent();
      console.log(productText);
      if (productName.trim() == productText.trim()) {
        return true;
      }
    }
    return false;
  }

  async listProducts() {
    const cartProductsList = await this.page.$$(this.noOfProducts);
    for (const cproduct of cartProductsList) {
      const cpname = await cproduct.textContent();
      console.log(cpname.trim());
    }
  }
};
