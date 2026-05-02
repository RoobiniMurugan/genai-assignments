import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Before(async function() {
  browser = await chromium.launch();
  page = await browser.newPage();
});

After(async function() {
  await page.close();
  await browser.close();
});

Given('I open the create lead page', async function() {
  await page.goto('https://leaftaps.com/crmsfa/control/createLeadForm');
});

When('I fill in the lead details with company name {string}, first name {string}, last name {string}, and email {string}', async function(companyName: string, firstName: string, lastName: string, email: string) {
  await page.locator('#createLeadForm_companyName').fill(companyName);
  await page.locator('#createLeadForm_firstName').fill(firstName);
  await page.locator('#createLeadForm_lastName').fill(lastName);
  await page.locator('#createLeadForm_primaryEmail').fill(email);
});

When('I click the Create Lead button', async function() {
  await page.locator('input[type="submit"][name="submitButton"]').click();
});

Then('I should see a confirmation message containing {string}', async function(confirmationMessage: string) {
  const confirmationElement = page.locator('text=' + confirmationMessage);
  await expect(confirmationElement).toBeVisible();
});
