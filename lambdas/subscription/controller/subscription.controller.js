const { EVENT_TYPES } = require("../constants/event-types");
const { handleSubscriptionCreated } = require("../services/subscription.service");

async function processEvent(body) {
  const { type, payload } = body;

  logger.info('Processing event', { type });

  switch (type) {
    case EVENT_TYPES.SUBSCRIPTION_CREATED:
      await handleSubscriptionCreated(payload);
      break;

    default:
      logger.warn('Unknown event type', { type });
  }
}

module.exports = { processEvent };