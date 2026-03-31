const axios = require('axios');
const { getConfig } = require('./config.service');
const logger = require('../utils/logger');
const { callInternalAPI } = require('./internal-api.service');


async function handleChargePaid(payload) {
  const config = await getConfig();

  logger.info('Handling charge_paid', payload);
  try {

    await callInternalAPI({
      type: 'charge_paid',
      raw: payload
    });

  } catch (error) {
    logger.error('Error in subscription renew service', {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return null;
  }
}
module.exports = { handleChargePaid };


// 🧠 What This Function Should Do

// From webhook (charge/paid) you typically get:

// customer_id
// subscription_id (inside line_items)

// 👉 Flow:

// Fetch latest charge (optional but useful)
// Extract subscription_id
// Find your DB license using subscription_id
// Extend license
