import puppeteer from 'puppeteer';

const parser = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(
    'https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet'
  );

  const buttonSelector = 'button.btn_secondary';

  await page.waitForSelector(buttonSelector);
  await page.waitForSelector('.card-title__link');
  await page.click(buttonSelector);
  await page.waitForSelector('text/KION');

  const cards = await page.$$eval('mts-tariff-card', (cards) =>
    cards.map((card) => ({
      title: card.querySelector('.card-title__link').textContent,
      description: card.querySelector('.card-description')?.textContent,
      price:
        card.querySelectorAll('.price-main > .price-text')[0].textContent +
        ' ' +
        card.querySelectorAll('.price-main > .price-text')[1].textContent,
      priceSale: card.querySelectorAll('.price-sale > .price-text')[0]
        ? card.querySelectorAll('.price-sale > .price-text')[0].textContent +
          ' ' +
          card.querySelectorAll('.price-sale > .price-text')[1].textContent
        : undefined,
      priceAnnotation: card.querySelector('.price-annotation')?.textContent,
      features: Array.from(card.querySelectorAll('.feature-description')).map(
        (el) => el.textContent
      ),
      benefits: card.querySelector('.benefits-description')?.textContent,
    }))
  );
  console.log(cards);

  await browser.close();
};

parser();
