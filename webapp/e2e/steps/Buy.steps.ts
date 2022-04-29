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
      .goto("http://localhost:3000/Tienda", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user adds produts to the cart and go to the buy page', ({given,when,then}) => {
    
    given('Nothing', () => {   
    });

    when('Buy some products and go to the buy view', async () => {
      await expect(page).toMatch('Artículos disponibles')
      await expect(page).toClick('button', { text: 'Añadir al carrito' })
      await expect(page).toClick('button', { text: 'Añadir más' }) // Hacer click de nuevo en el anterior producto
      await expect(page).toClick('button', { text: 'Añadir al carrito' })
      await expect(page).toClick('button', { text: 'Añadir al carrito' })
      await expect(page).toClick('#botonCarrito')
      await expect(page).toClick('button', { text: 'Pasar por caja' })
    });

    then('The products and the price are correct', async () => {
      await expect(page).toMatch('Pedido Final')
      await expect(page).toMatch('pollo(2 uds.)')
      await expect(page).toMatch('Total: 2.4€')
      await expect(page).toMatch('tortilla(1 uds.)')
      await expect(page).toMatch('Total: 2.4€')
      await expect(page).toMatch('jamon(1 uds.)')
      await expect(page).toMatch('Total: 2.4€')
      await expect(page).toMatch('Total a pagar: 5.05 €')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});