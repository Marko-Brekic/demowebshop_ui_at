import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.genderMaleRadioButton = page.getByLabel("Male", { exact: true });
        this.firstNameInputField = page.getByLabel("First name:");
        this.lastNameInputField = page.getByLabel("Last name:");
        this.emailInputField = page.getByLabel("Email:");
        this.passwordField = page.getByLabel("Password:", { exact: true });
        this.confirmPasswordField = page.getByLabel("Confirm password:");
        this.registerSubmitButton = page.getByRole("button", { name: "Register"});
        this.registrationConfirmationMessage = page.getByText("Your registration completed");
    }

    async open() {
        await this.visit("/register");
        await this.page.waitForLoadState("load");
    }

    async registerUser(firstName, lastName, email, password) {
        await this.genderMaleRadioButton.click();
        await this.firstNameInputField.fill(firstName);
        await this.lastNameInputField.fill(lastName);
        await this.emailInputField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.registerSubmitButton.click();
    }

    async getRegistrationConfirmationMessage() {
        return await this.registrationConfirmationMessage.textContent();
    }
}