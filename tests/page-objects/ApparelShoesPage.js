import { BasePage } from "./BasePage";

export class ApparelShoesPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.productSortingDropdown = "#products-orderby";
        this.productSortingDropdownOption = "#products-orderby option";
        this.productsDisplayDropdown = "#products-pagesize";
        this.productTiles = ".product-item";
        this.productTitles = ".product-title";
        this.addToCartButtons = ".product-box-add-to-cart-button",
        this.productPrices = ".actual-price";
    }

    async open() {
        await this.visit("/apparel-shoes");
        await this.page.waitForLoadState("load");
    }

    async selectProductDropdownSortingOption(option) {
        await this.page.locator(this.productSortingDropdown).selectOption(option);
    }

    async displayProductsPerPage(option) {
        await this.page.locator(this.productsDisplayDropdown).selectOption(option.toString());
        await this.page.waitForTimeout(500);
        await this.page.waitForSelector(this.productTiles);
    }

    async getNumberOfDisplayedProducts() {
        return await this.page.locator(this.productTiles).count();
    }

    async selectFirstAvailableProduct() {
        await this.page.locator(this.productTitles).first().click();
    }

    async selectFirstAvailableAddToCartButton() {
        await this.page.locator(this.addToCartButtons).first().click();
    }

    async getProductPrices() {
        await this.page.waitForTimeout(500);
        return await this.page.$$eval(this.productPrices, elements =>
            elements.map(element => element.textContent)
        );
    }
}