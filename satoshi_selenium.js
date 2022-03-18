const { Builder, By, Key, until } = require('selenium-webdriver');

(async () => {
    const driver = await new Builder().forBrowser('firefox').build();

    try {
	await driver.get('https://satoshislounge.lootnft.io');

	driver.manage().setTimeouts({ implicit: 1500 });
	driver.manage().window().maximize();

	// find sales history link and follow it
	const salesHistoryLink = await driver.findElement(By.xpath('//ul[@class="footerLink"]/li[3]/a'));

	await salesHistoryLink.click();

	// find all the sold items in the page
	let salesImageURLS = await driver.findElement(By.xpath('//div[@class="proBox"]/div[@class="textB"]'));

	// wait for the page to reload then get the elements again
	driver.wait(until.stalenessOf(salesImageURLS));
	let salesDivs = await driver.findElements(By.xpath('//div[@class="proBox"]'));

	// get all divs within a sale
	for (let sale of salesDivs) {
	    let price = await sale.findElement(By.css('div.textC strong')).getText();
	    let item = await sale.findElement(By.css('div.textA a')).getText();

	    // find the person who bought it
	    // click link and follow, get info on buyer then close and proceed
	    let infoBtn = await sale.findElement(By.css('div.img button.show-product-history-modal'));
	    await infoBtn.click();

	    let historyModal = await driver.findElement(By.xpath('//div[@class="modal-content"]'));
	    let details = await historyModal.findElement(By.xpath('//div[@class="popUpBody"]'));
	    // let closeBtn = await historyModal.findElement(By.xpath('//div[@class="popUpBottom"]/div[contains(@class,"row")]/div[@class="col-auto"]/a[contains(@class, "closePopUp")]'));
	    let closeBtn = await driver.findElement(By.xpath('//div[contains(@class,"fade")]'));
	    // const actions = driver.actions({async: true});
	    console.log(infoBtn);
	    console.log(details);
	    console.log(closeBtn);

	    await closeBtn.click();
	    await closeBtn.click();
	    await closeBtn.click();
	    await closeBtn.click();
	    // await actions.move({origin: closeBtn}).perform();
	    await driver.wait(until.elementIsNotVisible(historyModal));
	    // await closeBtn.click();
	    // await historyModal.sendKeys(Key.ESCAPE);
	}
	// let details = await salesDivs.findElements(By.xpath('//div'));

	// for (let i = 0; i = salesDivs.length; i++) {
	//     // let children = await salesDivs[i].findElements(By.css('div'));
	//     // let name = await children[1].findElement(By.css('textA')).getText();
	//     console.log(salesDivs[i]);
	// }

	await driver.quit();
    } catch (err) {
	console.log(err);
	await driver.quit();
    }
})();
