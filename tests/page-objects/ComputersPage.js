import { BasePage } from "./BasePage";

export class ComputersPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.subGroupTabTitles = ".sub-category-item .title";
    }

    async open() {
        await this.visit("/computers");
        await this.page.waitForLoadState("load");
    }

    getSubGroupTabTitleTexts() {
        return this.page.locator(this.subGroupTabTitles).allTextContents();
    }
}