const { updateField } = require('./_utils');

module.exports = async (req, res) => {
  const { id, value } = req.query;
  if (!id || !['up', 'down'].includes(value)) {
    return res.status(400).json({ error: 'Invalid id or value' });
  }

  try {
    await updateField(id, `votes.${value}`);
    return res.json({ success: true });
  } catch (e) {
    console.error(e.response?.data || e.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
