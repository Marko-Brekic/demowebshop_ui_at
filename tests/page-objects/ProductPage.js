export class ProductPage {

    constructor(page) {
        this.page = page;
        this.addToWishlistButton = page.getByRole("button", { name: "Add to wishlist" });
        this.wishlistHeaderLink = page.getByRole("link", { name: "Wishlist", exact: true });
        this.addToCartButton = ".add-to-cart [value='Add to cart']";
        this.shoppingCartLink = "#topcartlink .cart-label";
    }

    async addProductToWishlist() {
        await this.addToWishlistButton.click();
        await this.page.waitForLoadState("networkidle");
    }

    async openWishlist() {
        await this.wishlistHeaderLink.click();
        await this.page.waitForLoadState("networkidle");
    }

    async addProductToCart() {
        await this.page.locator(this.addToCartButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    async openCart() {
        await this.page.locator(this.shoppingCartLink).click();
    }

}