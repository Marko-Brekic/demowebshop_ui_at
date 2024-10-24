import { BasePage } from "./BasePage";

export class WishlistPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.productRow = ".cart-item-row";
    }

    async open() {
        await this.visit("/wishlist");
        await this.page.waitForLoadState("load");
    }

    async getNumberOfProductRows() {
        await this.page.waitForSelector(this.productRow);
        return await this.page.locator(this.productRow).count();
    }
}