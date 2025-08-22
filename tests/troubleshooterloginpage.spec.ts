import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/troubleshooterloginpage'; // Import the new Page Object class

// Define the valid login credentials.
const validUsername = 'heshan';
const validPassword = 'Heshan@99';
const loginUrl = 'https://troubleshooter-qa.globalwavenet.com/login';

// --- Test Case 1: Valid Login ---
test('should successfully log into Troubleshooting Agent with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUsername, validPassword);

  await expect(loginPage.dashboardText).toBeVisible();
  await expect(page).toHaveURL('https://troubleshooter-qa.globalwavenet.com/dashboard');
});

// --- Test Case 2: Invalid Username ---
test('should fail to log in with an invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('messi', validPassword);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 3: Invalid Password ---
test('should fail to log in with an invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUsername, 'Messi@99');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 4: Both Fields Invalid ---
test('should fail to log in with both fields invalid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('messi', 'Messi@99');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 5: Empty Username & Valid Password ---
test('should fail to log in with an empty username and valid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.passwordInput.fill(validPassword);
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 6: Empty Username & Invalid Password ---
test('should fail to log in with an empty username and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.passwordInput.fill('Messi@99');
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 7: Empty Password & Valid Username ---
test('should fail to log in with an empty password and valid username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.usernameInput.fill(validUsername);
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 8: Empty Password & Invalid Username ---
test('should fail to log in with an empty password and invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.usernameInput.fill('messi');
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 9: Both Fields Empty ---
test('should fail to log in with both fields empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signInButton.click();

  await expect(page).toHaveURL(loginUrl);
});

// --- Test Case 10: Password Masking ---
test('should mask the password input', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
});
