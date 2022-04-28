import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/Login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/Login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is registered in the site', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('A registered user', () => {
      email = "dani@gmail.com"
      password = "123456"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toMatch('Login')
      await expect(page).toFillForm('form[name="login"]', {
        email: email,
        password: password,
      })
      await expect(page).toClick('button', { text: 'Enviar' })
    });

    then('Profile page with username should be shown in the screen', async () => {
      await expect(page).toMatch('dani')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

