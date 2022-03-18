const puppeteer = require('puppeteer');

(async () => {
    try {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://satoshislounge.lootnft.io');

	// await page.type('input.gLFyf', 'Hello');
	await page.click('ul.footerLink > li:nth-child(3) > a');

	// find all text elements storing nft name and price sold
	const divs = await page.$x('//div[@class="container"]/div[@id="product-container"]/div[@class="proBox"]');
	// const divs = await page.$$eval('.proBox', (divs) => divs.length);
	
	console.log(divs);
	console.log(await page.title());

	await browser.close();
    } catch (err) {
	console.log(err);
    }
})();
