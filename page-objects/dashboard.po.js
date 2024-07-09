const { expect } = require("@playwright/test");
const dashboardTestData = require("../Fixtures/Dashboard.fixture.json");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.createPost = '//*[@id="topbar"]/div/div[2]/span/a';
    this.postTitle = '//*[@id="article-form-title"]';
    this.PostContent = '//*[@id="article_body_markdown"]';
    this.publishButton = '//*[@id="editor-actions"]/button[1]';
    this.validatePost = '//*[@id="main-title"]/div/h1';
    this.profileavatar = '//*[@id="member-menu-button"]';
    this.dashboardLink =
      '//*[@id="crayons-header__menu__dropdown__list"]/li[3]/a';
    this.editButton = `a[aria-label="Edit post: ${dashboardTestData.postTitle}"]`;
    this.manageButton = `a[aria-label="Manage post: ${dashboardTestData.editTitle}"]`;
    this.savechanges = 'button:has-text("Save changes")';
    this.deleteButton = '//*[@id="main-content"]/div[2]/div[1]/div[4]/a[2]';
    this.deletePopup = '//*[@id="main-content"]/div[2]/form/button';
    this.verifyDeleteBlog = `a:has-text("${dashboardTestData.editTitle}")`;
    this.logout = '//*[@id="last-nav-link"]';
    this.logoutConfirmation =
      '//*[@id="page-content-inner"]/div[2]/form/button';
    this.loginButton = '//*[@id="authentication-top-nav-actions"]/span/a';
  }

  async postBlog() {
    await this.page.locator(this.createPost).click();

    await this.page.waitForTimeout(5000);
    await this.page.locator(this.postTitle).fill(dashboardTestData.postTitle);
    await this.page
      .locator(this.PostContent)
      .fill(dashboardTestData.postContent);

    await this.page.locator(this.publishButton).click();
  }

  async validatePosting() {
    await expect(this.page.locator(this.validatePost)).toHaveText(
      dashboardTestData.postTitle
    );
  }

  async editPost() {
    await this.page.locator(this.profileavatar).click();
    await this.page.locator(this.dashboardLink).click();
    await this.page.locator(this.editButton).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.postTitle).fill(dashboardTestData.editTitle);
    await this.page.locator(this.savechanges).click();
  }

  async verifyEdit() {
    await expect(this.page.locator(this.validatePost)).toHaveText(
      dashboardTestData.editTitle
    );
  }

  async deleteBlog() {
    await this.page.locator(this.profileavatar).click();
    await this.page.locator(this.dashboardLink).click();
    await this.page.locator(this.manageButton).click();
    await this.page.locator(this.deleteButton).click();
    await this.page.locator(this.deletePopup).click();
  }

  async verifyDelete() {
    await expect(this.page.locator(this.verifyDeleteBlog)).toBeHidden();
  }

  async logoutUser() {
    await this.page.locator(this.profileavatar).click();
    await this.page.locator(this.logout).click();
    await this.page.locator(this.logoutConfirmation).click();
  }

  async logoutVerify() {
    await expect(this.page.locator(this.loginButton)).toBeVisible();
  }
};
