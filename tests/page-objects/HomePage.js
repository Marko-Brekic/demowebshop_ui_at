import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.logoutButton = ".ico-logout";
        this.computersHorizontalCategorySection = page.getByRole("link", { name: "Computers" }).first();
    }

    async open() {
        await this.visit("/");
        await this.page.waitForLoadState("load");
    }

    getLogoutButton() {
        return this.page.locator(this.logoutButton);
    }
}