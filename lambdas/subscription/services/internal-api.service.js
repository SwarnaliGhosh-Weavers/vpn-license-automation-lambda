const axios = require('axios');
const { getConfig } = require('./config.service');

async function callInternalAPI(data) {
  const config = await getConfig();

  await axios.post(
    config.internalApiUrl,
    data,
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    },
  );
}

module.exports = { callInternalAPI };