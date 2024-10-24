import { test as baseTest } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { LoginPage } from "../page-objects/LoginPage";
import { ComputersPage } from "../page-objects/ComputersPage";
import { ApparelShoesPage } from "../page-objects/ApparelShoesPage";
import { ProductPage } from "../page-objects/ProductPage";
import { WishlistPage } from "../page-objects/WishlistPage";
import { CartPage } from "../page-objects/CartPage";
import { CheckoutPage } from "../page-objects/CheckoutPage";

const test = baseTest.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    computersPage: async ({ page }, use) => {
        const computersPage = new ComputersPage(page);
        await use(computersPage);
    },
    apparelShoesPage: async ({ page }, use) => {
        const apparelShoesPage = new ApparelShoesPage(page);
        await use(apparelShoesPage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    wishlistPage: async ({ page }, use) => {
        const wishlistPage = new WishlistPage(page);
        await use(wishlistPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }
});

export { test };