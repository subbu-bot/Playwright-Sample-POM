// Exporting using CommonJS syntax
exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.productsList = "//*[@id='tbodyid']/div/div/div/h4/a";
    this.addToCart = "//a[@class='btn btn-success btn-lg']";
    this.cartLink = "#cartur";
    
  }

  async addProductToCart(productName) {
    const productsList = await this.page.$$(this.productsList);
    for (const product of productsList) {
      const productText = await product.textContent();
      if (productName == productText) {
        await product.click();
        break;
      }
    }
    await this.page.on("dialog", async (dialog) => {
      if (dialog.message().includes("added")) {
        await dialog.accept();
      }
    });
    await this.page.locator(this.addToCart).click();
  }

  async gotoCart() {
    await this.page.locator(this.cartLink).click();
  }
};
