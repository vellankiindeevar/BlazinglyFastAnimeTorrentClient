import { XMLParser } from "fast-xml-parser";
import express from "express";
import cors from 'cors';

const app = express()
const port = 3000

const parser = new XMLParser();

app.use(cors())

const fetchWithRetry = async (url, maxRetries) => {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const xml = await response.text();
                const { rss } = parser.parse(xml);
                const data = rss.channel.item;
                return data;
            } else {
                throw new Error(`HTTP error: ${response.status}`);
            }
        } catch (error) {
            retries++;
            console.error(`Fetch attempt ${retries} failed: ${error.message}`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    throw new Error('Max retries reached');
};


app.get('/api', async (req, res) => {
    const c = req.query.c || '';
    const f = req.query.f || '';
    const q = req.query.q || '';

    const apiUrl = `https://nyaa.si/?page=rss&q=${q}&c=${c}&f=${f}`;
    const maxRetries = 5; // Adjust the number of retries as needed

    try {
        const data = await fetchWithRetry(apiUrl, maxRetries);
        res.json(data);
    } catch (error) {
        console.error(`Max retries reached: ${error.message}`);
        res.status(500).json({ error: 'Max retries reached' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
