import { ExpandCircleDownTwoTone } from '@mui/icons-material';
import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/Buy.feature');

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

  test('The user adds produts to the cart and go to the buy page', ({given,when,then}) => {
    jest.setTimeout(100000);
    let email:string;
    let value:string;
    
    given('Nothing', () => { 
      email = "dani@gmail.com"
      value = "123456"  
    });

    when('Buy some products and go to the buy view', async () => {
      await expect(page).toFillForm('form[name="login"]', {
        email: email,
        password: value,
      })
      await expect(page).toClick('button', { text: 'Enviar' })

      page = await browser.newPage();

      await page
      .goto("http://localhost:3000/Tienda", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
      await expect(page).toMatch('Artículos disponibles')
      await expect(page).toClick('button', { text: 'Añadir al carrito' })
      await expect(page).toClick('button', { text: 'Añadir más' }) // Hacer click de nuevo en el anterior producto
      await expect(page).toClick('button', { text: 'Añadir al carrito' })
      await expect(page).toClick('button', { text: 'Añadir al carrito' })
      await expect(page).toClick('#botonCarrito')
      await expect(page).toMatch('Pasar por caja')
      await expect(page).toClick('button', { text: 'Pasar por caja' })
    });

    then('The products and the price are correct', async () => {
      await expect(page).toMatch('Pedido Final')
      await expect(page).toMatch('pollo(2 uds.)')
      await expect(page).toMatch('Total: 2.4€')
      await expect(page).toMatch('Total a pagar: 5.05€')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});