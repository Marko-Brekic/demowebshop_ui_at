import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.emailInputField = page.getByLabel("Email:");
        this.passwordInputField = page.getByLabel("Password:", { exact: true });
        this.loginButton = page.getByRole("button", { name: "Log in" });
    }

    async open() {
        await this.visit("/login");
        await this.page.waitForLoadState("load");
    }

    async loginUser(email, password) {
        await this.emailInputField.fill(email);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}