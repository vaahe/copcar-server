const puppeteer = require('puppeteer');

const getLotImages = async (req, res) => {
    const id = parseInt(req.params.id);

    const browserFetcher = puppeteer.createBrowserFetcher();
    let revisionInfo = await browserFetcher.download('1095492');
    
    const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
        headless: "new",
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ]
    });

    try {
        const page = await browser.newPage();
        await page.goto(`https://www.copart.com/public/data/lotdetails/solr/lotImages/${id}`)

        await page.waitForSelector('pre');
        const innerHtmlJson = await page.$eval('pre', element => element.innerHTML);


        res.json(JSON.parse(innerHtmlJson).data.imagesList);
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

module.exports = { getLotImages };