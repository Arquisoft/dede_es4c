import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { threadId } from 'worker_threads';

const feature = loadFeature('./features/RemoveFromCart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false});
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/Tienda", {
        waitUntil: "networkidle0"
      })
      .catch(() => {});

  });

  test('The user removes a proudct from the cart', ({given,when,then}) => {
    jest.setTimeout(100000);
    given('A product already added to the cart', async () => {   
      await expect(page).toMatch('Artículos disponibles')
      await expect(page).toClick('button', { text: 'Añadir al carrito' }) 
    });

    when('I press de delete button', async () => {
      
      await expect(page).toClick('#botonCarrito')
      await page.evaluate(() => {
        debugger;
      });
      await expect(page).toMatch('Carrito')
      await expect(page).toClick('button', {text: 'Eliminar'});
    });

    then('The cart should be empty', async () => {
      await expect(page).toMatch('La cesta está vacía')
      await expect(page).toMatch('Total del importe: 0.00 €')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

