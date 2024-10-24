export class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.countryDropdown = "#BillingNewAddress_CountryId";
        this.cityField = "#BillingNewAddress_City";
        this.address1Field = "#BillingNewAddress_Address1";
        this.zipcodeField = "#BillingNewAddress_ZipPostalCode";
        this.phoneField = "#BillingNewAddress_PhoneNumber";
        this.continueButton = page.getByRole("button", { name: "Continue" });
        this.shippingMethodContinueButton = "#shipping-method-buttons-container [value='Continue']";
        this.paymentMethodContinueButton = "#checkout-step-payment-method [value='Continue']";
        this.paymentInformationContinueButton = "#checkout-step-payment-info [value='Continue']";
        this.orderConfirmationContinueButton = "#confirm-order-buttons-container [value='Confirm']";
        this.orderSuccessfullyProcessedMessage = page.getByText("Your order has been");
    }

    async fillBillingAddressMandatoryFields(country, city, address1, zipcode, phone) {
        await this.page.selectOption(this.countryDropdown, { label: country });
        await this.page.locator(this.cityField).fill(city);
        await this.page.locator(this.address1Field).fill(address1);
        await this.page.locator(this.zipcodeField).fill(zipcode);
        await this.page.locator(this.phoneField).fill(phone);
        await this.continueButton.click();
        await this.page.waitForLoadState("networkidle");
    }

    async confirmBillingAddress() {
        await this.continueButton.click();
        await this.page.waitForLoadState("networkidle");
    }

    async confirmShippingAddress() {
        await this.continueButton.click();
        await this.page.waitForLoadState("networkidle");
    }

    async confirmShippingMethod() {
        await this.continueButton.waitFor({ state: "visible" });
        await this.page.locator(this.shippingMethodContinueButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    async confirmPaymentMethod() {
        await this.page.locator(this.paymentMethodContinueButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    async confirmPaymentInformation() {
        await this.page.locator(this.paymentInformationContinueButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    async confirmOrder() {
        await this.page.locator(this.orderConfirmationContinueButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    async getOrderConfirmationMessage() {
        return await this.orderSuccessfullyProcessedMessage.innerText();
    }

}