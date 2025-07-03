const axios = require('axios');

const APP_ID = process.env.LEANCLOUD_APP_ID;
const APP_KEY = process.env.LEANCLOUD_APP_KEY;
const SERVER_URL = process.env.LEANCLOUD_SERVER_URL;
const CLASS_NAME = 'Feedback';

async function updateField(id, fieldPath) {
  const updateField = {
    [fieldPath]: {
      __op: "Increment",
      amount: 1
    }
  };

  const queryResp = await axios.get(
    `${SERVER_URL}/1.1/classes/${CLASS_NAME}?where=${encodeURIComponent(JSON.stringify({ id }))}`,
    {
      headers: {
        'X-LC-Id': APP_ID,
        'X-LC-Key': APP_KEY,
      }
    }
  );

  const data = queryResp.data.results[0];

  if (data) {
    await axios.put(
      `${SERVER_URL}/1.1/classes/${CLASS_NAME}/${data.objectId}`,
      updateField,
      {
        headers: {
          'X-LC-Id': APP_ID,
          'X-LC-Key': APP_KEY,
          'Content-Type': 'application/json',
        }
      }
    );
  } else {
    const initData = {
      id,
      votes: {},
      rating: {},
      ...updateField
    };
    await axios.post(
      `${SERVER_URL}/1.1/classes/${CLASS_NAME}`,
      initData,
      {
        headers: {
          'X-LC-Id': APP_ID,
          'X-LC-Key': APP_KEY,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

module.exports = { updateField };
