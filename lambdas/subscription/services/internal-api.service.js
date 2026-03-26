const axios = require('axios');
const { getConfig } = require('./config.service');
const logger = require('../utils/logger');

async function callInternalAPI(customer, subscription) {
  try {
    const config = await getConfig();

    logger.info('Calling internal API', {
      url: config.internalApiUrl,
      customer, subscription,
    });

    const response = await axios.post(
      config.internalApiUrl,
      { customer, subscription },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
      },
    );

    // logger.info('Internal API success', {
    //   status: response.status,
    //   data: response.data,
    // });

    // return response.data;

  } catch (error) {
    logger.error('Internal API failed', {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    //  IMPORTANT: choose behavior
    throw error; 
  }
}

module.exports = { callInternalAPI };