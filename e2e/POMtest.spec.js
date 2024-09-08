import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";
import { CartPage } from "../Pages/cartPage";
import { afterEach } from "node:test";

test("Test eCommerce Site 08 Sep", async ({ page }) => {
  //Login
  const loginobj = new LoginPage(page);
  await loginobj.gotoLoginPage();
  await loginobj.login("pavanol", "test@123");
  await page.waitForTimeout(3000);

  //Home
  const homeObj = new HomePage(page);
  await homeObj.addProductToCart("Nexus 6");
  await page.waitForTimeout(3000);
  await homeObj.gotoCart();

  //Cart
  const cartobj = new CartPage(page);
  await cartobj.listProducts();
  await page.waitForTimeout(4000);
  const statusCart = await cartobj.checkProductInCart("Nexus 6");
  await page.screenshot({path: 'screenshot.png'});
  await page.waitForTimeout(3000);
  expect(statusCart).toBe(true);
});
