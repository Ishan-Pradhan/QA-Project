const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '//*[@id="user_email"]';
    this.passwordInput = '//*[@id="user_password"]';
    this.loginButton = '//*[@id="new_user"]/div[4]/input';
    this.errorMessage = '//*[@id="page-content-inner"]/div[2]/strong';
    this.dashboardLoginButton =
      '//*[@id="authentication-top-nav-actions"]/span/a';
  }

  async login(email, password) {
    await this.page.locator(this.dashboardLoginButton).click();
    await this.page.locator(this.emailInput).fill(email);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page).toHaveURL("https://dev.to/?signin=true");
  }

  async invalidLogin() {
    await expect(this.page.locator(this.errorMessage)).toHaveText(
      "Unable to login."
    );
  }
};
