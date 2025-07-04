import axios from 'axios';
import { headers } from '../_utils.js';

export default async function handler(req, res) {
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const SERVER_URL = process.env.LEANCLOUD_SERVER_URL;
  const HEADERS = {
    'X-LC-Id': process.env.LEANCLOUD_APP_ID,
    'X-LC-Key': process.env.LEANCLOUD_APP_KEY,
    'User-Agent': 'Mozilla/5.0 (Feedback-App)',
    'Accept': 'application/json'
  };

  try {
    const query = encodeURIComponent(JSON.stringify({ id }));
    const url = `${SERVER_URL}/1.1/classes/Rating?where=${query}`;
    const response = await axios.get(url, { headers: HEADERS });
    const data = response.data.results[0] || {};
    res.json({ rating: data });
  } catch (e) {
    console.error('[rating/info] ERROR:', e.response?.data || e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
