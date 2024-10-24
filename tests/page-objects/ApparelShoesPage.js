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
        this.addToCartButtons = ".product-box-add-to-cart-button"
    }

    async open() {
        await this.visit("/apparel-shoes");
        await this.page.waitForLoadState("load");
    }

    // async getAllProductSortingOptionValues() {
    //     await this.page.locator(this.productSortingDropdownOption).evaluateAll(options => options.map(option => option.value));
    // }  // not working

    // async selectProductDropdownSortingOption(option) {
    //     await this.page.locator(this.productSortingDropdown).selectOption(option);
    // }

    // async selectDropdownOption(dropdown, option) {
    //     await this.page.selectOption(dropdown, option);
    // }
    // async getDropdownOptions(dropdown) {
    //     await dropdown.locator("option").all();
    // }

    // getProductsDisplayDropdown() {
    //     return this.page.locator(this.productsDisplayDropdown);
    // }

    async displayProductsPerPage(option) {
        await this.page.locator(this.productsDisplayDropdown).selectOption(option.toString());
        await this.page.waitForLoadState("networkidle");
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
}