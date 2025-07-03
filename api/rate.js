const { updateField } = require('./_utils');

module.exports = async (req, res) => {
  const { id, value } = req.query;
  const score = parseInt(value);
  if (!id || isNaN(score) || score < 1 || score > 5) {
    return res.status(400).json({ error: 'Invalid id or rating value' });
  }

  try {
    await updateField(id, `rating.${score}`);
    return res.json({ success: true });
  } catch (e) {
    console.error(e.response?.data || e.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
