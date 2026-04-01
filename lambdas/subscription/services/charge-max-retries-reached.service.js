const axios = require('axios');
const { getConfig } = require('./config.service');
const logger = require('../utils/logger');
const { callInternalAPI } = require('./internal-api.service');
const { EVENT_TYPES } = require('../constants/event-types');


async function handleChargeMaxRetriesReached(payload) {
  const config = await getConfig();

  logger.info('Handling charge_paid', payload);
  try {

    await callInternalAPI({
      type: EVENT_TYPES.CHARGE_MAX_RETRIES_REACHED,
      raw: payload
    });

  } catch (error) {
    logger.error('Error in handleChargeMaxRetriesReached service', {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return null;
  }
}
module.exports = { handleChargeMaxRetriesReached };
