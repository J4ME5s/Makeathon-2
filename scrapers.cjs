const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="productMaterialDescription-content"]/dl/dd[1]/p');

    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    console.log({rawTxt});

    browser.close();

    const arr = rawTxt.split(" ");
    let percentPol = 0;
    let percentNyl = 0;
    let polCount = 0;
    let nylCount = 0;
    let i = 0;
    while(i < arr.length) {
        if(arr[i].includes("Polyester") && polCount == 0) {
            percentPol = parseInt(arr[i - 1].substring(0, arr[i - 1].length - 1), 10);
            polCount++;     
        } else if(arr[i].includes("Nylon") && nylCount == 0) {
            percentNyl = parseInt(arr[i - 1].substring(0, arr[i - 1].length - 1), 10);
            nylCount++;
        }
        i++;
    }
    if(percentNyl != 0) {
        return percentNyl * 13.563 * 100;
    } else if(percentPol != 0) {
        return percentPol * 9.687 * 100;
    }
}

module.exports = scrapeProduct;

//scrapeProduct('https://www.uniqlo.com/us/en/products/E440522-000/00?colorDisplayCode=30&sizeDisplayCode=008');

