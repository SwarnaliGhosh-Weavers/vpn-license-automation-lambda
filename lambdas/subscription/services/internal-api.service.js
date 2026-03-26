const axios = require('axios');
const { getConfig } = require('./config.service');

async function callInternalAPI(data) {
  const config = await getConfig();

  logger.info('Calling internal API', { url: config.internalApiUrl, data });

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