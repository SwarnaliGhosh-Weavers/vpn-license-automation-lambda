const axios = require('axios');
const { getConfig } = require('./config.service');
const logger = require('../utils/logger');

async function callInternalAPI(payload) {
  try {
    let { type, customer, subscription, raw } = payload;

    const config = await getConfig();

    let baseUrl = config.internalApiUrl;
    let url = '';
    let body = {};

    switch (type) {
      case 'subscription_created':
        body = { customer, subscription };
        url = `${baseUrl}/subscription-created`
        break;

      case 'charge_paid':
        body = { payload: raw }; // full webhook payload
        url = `${baseUrl}/charge-paid`
        break;

      // case 'subscription_cancelled':
      //   body = { subscription };
      //   break;

      // case 'license_extend':
      //   body = { subscriptionId: subscription?.id };
      //   break;

      // case 'customer_sync':
      //   body = { customer };
      //   break;

      default:
        throw new Error(`Unsupported API type: ${type}`);
    }

    logger.info('Calling internal API', {
      type,
      url,
      body,
    });

    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });

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