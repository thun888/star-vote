const axios = require('axios');

const APP_ID = process.env.LEANCLOUD_APP_ID;
const APP_KEY = process.env.LEANCLOUD_APP_KEY;
const SERVER_URL = process.env.LEANCLOUD_SERVER_URL;
const CLASS_NAME = 'Feedback';

module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  try {
    const query = encodeURIComponent(JSON.stringify({ id }));
    const response = await axios.get(
      `${SERVER_URL}/1.1/classes/${CLASS_NAME}?where=${query}`,
      {
        headers: {
          'X-LC-Id': APP_ID,
          'X-LC-Key': APP_KEY
        }
      }
    );

    const data = response.data.results[0] || {};
    return res.json({ rating: data.rating || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
  } catch (e) {
    console.error(e.response?.data || e.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
