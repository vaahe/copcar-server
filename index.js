const cors = require('cors');
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const PORT = 8080;

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


const makeRequest = async (id) => {
    const browser = await puppeteer.launch({
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


        return JSON.parse(innerHtmlJson).data.imagesList;
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

app.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await makeRequest(id);

    res.json(data);
})


app.listen(PORT, () => console.log(`App started on port ${PORT}`));