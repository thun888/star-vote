import { updateVote, headers } from '../_utils.js';

export default async function handler(req, res) {
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id, value } = req.query;
  if (!id || !['up', 'down'].includes(value)) {
    return res.status(400).json({ error: 'Invalid vote parameters' });
  }

  try {
    await updateVote(id, value);
    res.json({ success: true });
  } catch (e) {
    console.error('[vote/update] ERROR:', e.response?.data || e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
