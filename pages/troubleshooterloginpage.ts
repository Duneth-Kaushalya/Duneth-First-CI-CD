import { Page, Locator } from '@playwright/test';

// This class represents the Login Page and all its elements and actions.
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;
    readonly dashboardText: Locator;

    constructor(page: Page) {
        this.page = page;
        // Define all locators for the page here.
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.errorMessage = page.getByText('Invalid username or password');
        this.dashboardText = page.getByText('System Dashboard');
    }

    // A method to navigate to the login page.
    async goto() {
        await this.page.goto('https://troubleshooter-qa.globalwavenet.com/login');
    }

    // A method for performing a valid login.
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
