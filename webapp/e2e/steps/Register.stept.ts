import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/Register.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/Signup", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Register a user in the app', ({given,when,then}) => {
    let username:string;
    let email:string;
    let password:string;
    let pwconfirm:string;

    given('A unregistered user', () => {
      username = "Hugo"
      email = "hugo@gmail.com"
      password = "123456"
      pwconfirm = "123456"
    });

    when('Fill the data in the form and press submit', async () => {
      await expect(page).toMatch('Signup')
      await expect(page).toFillForm('form[name="Signup"]', {
        username: username,
        email: email,
        password: password,
        pwconfirm: pwconfirm
      })
      await expect(page).toClick('button', { text: 'Enviar' })
    });

    then('Profile page with username and not POD vinculation should be shown in the screen', async () => {
      await expect(page).toMatch('Hugo')
      await expect(page).toMatch('Por favor, conéctate con tu POD para que podamos utilizar tus datos')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});