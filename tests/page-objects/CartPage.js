import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.productRow = ".cart-item-row";
        this.removeProductCheckbox = "input[name='removefromcart']";
        this.updateCartButton = page.getByRole("button", { name: "Update shopping cart" });
        this.cartEmptyMessage = page.getByText("Your Shopping Cart is empty!");
        this.termsCheckbox = "#termsofservice[type='checkbox']";
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    }

    async open() {
        await this.visit("/cart");
        await this.page.waitForLoadState("load");
    }

    async getNumberOfProductRows() {
        await this.page.waitForSelector(this.productRow);
        return await this.page.locator(this.productRow).count();
    }

    async removeProductFromCart() {
        await this.page.locator(this.removeProductCheckbox).click();
        await this.updateCartButton.click();
    }

    async getEmptyCartMessage() {
        return await this.cartEmptyMessage.innerText();
    }

    async proceedToCheckoutPage() {
        await this.page.locator(this.termsCheckbox).click();
        await this.checkoutButton.click();
    }

}