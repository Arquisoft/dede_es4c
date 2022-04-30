import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/AddToCart.feature');

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

  test('The user adds some produts to the cart', ({given,when,then}) => {
    
    given('Nothing', () => {   
    });

    when('I press de button to add the items to cart', async () => {
      await expect(page).toMatch('Artículos disponibles')
      await expect(page).toClick('button', { text: 'Añadir al carrito' }) // Hacer click en el primer artículo
      await expect(page).toClick('button', { text: 'Añadir al carrito' }) // Hacer click en el segundo artículo
      await expect(page).toClick('#botonCarrito')
    });

    then('That products should be shown in the cart', async () => {
      await expect(page).toMatch('Carrito')
      await expect(page).toMatch('pollo')
      await expect(page).toMatch('tortilla')
      await expect(page).toMatch('Total del importe: 2.70 €')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

