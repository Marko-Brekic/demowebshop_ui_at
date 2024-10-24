import { test } from "./utils/fixtures";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import testData from "../data/test-data.json";

const email = testData.credentials.testEmail;
const password = testData.credentials.testPassword;

test.describe("Registration and login tests", () => {


    test("Verify that it is possible to register a user", async ({ registerPage }) => {
        await registerPage.open();
        await registerPage.registerUser(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            password
        )
        const registrationMessage = await registerPage.getRegistrationConfirmationMessage();
        expect(registrationMessage).toContain(testData.registrationConfirmationMessage);
    });

    test("Verify that it is possible to log in", async ({ loginPage, homePage }) => {
        await loginPage.open();
        await loginPage.loginUser(email, password);
        await expect(homePage.getLogoutButton()).toBeVisible();
    });
});

test.describe("Menus and sorting tests", () => {

    test("Verify that 'Computers' group has 3 sub-groups with correct names", async ({ computersPage }) => {
        await computersPage.open();
        const subGroupTabTitles = await computersPage.getSubGroupTabTitleTexts();
        const trimmedTitles = subGroupTabTitles.map(title => title.trim());
        expect(trimmedTitles).toHaveLength(3);
        expect(trimmedTitles).toEqual(testData.computersSubGroupTitles);
    });

    // test("Verify that it is possible to sort items (different options)", async ({ page, apparelShoesPage }) => {
    //     await apparelShoesPage.open();
    //     const productSortingDropdownOptions = apparelShoesPage.getAllProductSortingOptionValues();
    //     for (const sortingOption of productSortingDropdownOptions) {
    //         await apparelShoesPage.selectProductDropdownSortingOption(sortingOption);
    //     }
    //     await apparelShoesPage.selectDropdownOption()
    // });

    test("Verify that it is possible to change number of items on the page", async ({ apparelShoesPage }) => {
        const productsPerPage = [4, 8, 12];
        let numberOfProducts;
        await apparelShoesPage.open();
        for (let i = 0; i < productsPerPage.length; i++) {
            await apparelShoesPage.displayProductsPerPage(productsPerPage[i]);
            numberOfProducts = await apparelShoesPage.getNumberOfDisplayedProducts();
            expect(numberOfProducts).toBe(productsPerPage[i]);
        }
    });
});

test.describe("Adding and removing products", () => {

    test("Verify that it is possible to add a product to wishlist", async ({ apparelShoesPage, productPage, wishlistPage }) => {
        await apparelShoesPage.open();
        await apparelShoesPage.selectFirstAvailableProduct();
        await productPage.addProductToWishlist();
        await productPage.openWishlist();
        const numberOfProductInWishlist = await wishlistPage.getNumberOfProductRows();
        expect(numberOfProductInWishlist).toBeGreaterThan(0);
    });

    test("Verify that it is possible to add an item to and remove item from the cart", async ({ apparelShoesPage, productPage, cartPage }) => {
        await apparelShoesPage.open();
        await apparelShoesPage.selectFirstAvailableAddToCartButton();
        await productPage.addProductToCart();
        await productPage.openCart();
        const numberOfProductsInCart = await cartPage.getNumberOfProductRows();
        expect(numberOfProductsInCart).toBeGreaterThan(0);
        cartPage.removeProductFromCart();
        const emptyCartMessage = await cartPage.getEmptyCartMessage();
        expect(emptyCartMessage).toBe("Your Shopping Cart is empty!");
    });
});

test.describe("Checkout flow", () => {

    test("Verify that it is possible to complete checkout", async ({ page, loginPage, apparelShoesPage, productPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        await loginPage.loginUser(email, password);
        await apparelShoesPage.open();
        await apparelShoesPage.selectFirstAvailableProduct();
        await productPage.addProductToCart();
        await productPage.openCart();
        await cartPage.proceedToCheckoutPage();
        await checkoutPage.confirmBillingAddress();
        await checkoutPage.confirmShippingAddress();
        await checkoutPage.confirmShippingMethod();
        await checkoutPage.confirmPaymentMethod();
        await checkoutPage.confirmPaymentInformation();
        await checkoutPage.confirmOrder();
        const orderConfirmationMessage = await checkoutPage.getOrderConfirmationMessage();
        expect(orderConfirmationMessage).toBe(testData.orderConfirmationMessage);
    });
});