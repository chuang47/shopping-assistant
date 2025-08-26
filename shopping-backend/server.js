import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const SERPAPI_KEY = process.env.SERPAPI_KEY;

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').toString().trim();
    if (!q) return res.status(400).json({ error: 'Missing q' });

    // Google Shopping via SerpAPI
    const url = new URL('https://serpapi.com/search.json');
    url.searchParams.set('engine', 'google_shopping');
    url.searchParams.set('q', q);
    url.searchParams.set('api_key', SERPAPI_KEY);

    const r = await fetch(url);
    if (!r.ok) {
      const t = await r.text();
      return res.status(r.status).json({ error: `SerpAPI error`, detail: t });
    }
    const json = await r.json();

    const products = (json.shopping_results || []).map(it => ({
      title: it.title,
      url: it.link,
      image: it.thumbnail || it.thumbnail && it.thumbnail[0] || '',
      source: it.source || 'Google Shopping',
      price: it.extracted_price || it.price
    }));

    res.json(products.slice(0, 24)); // cap to 24 items
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`shopping-backend on http://localhost:${port}`));
