const { EVENT_TYPES } = require("../constants/event-types");
const { handleChargePaid } = require("../services/charge-paid.service");
// const { handleSubscriptionCancelled } = require("../services/subscription-cancel.service");
const { handleSubscriptionCreated } = require("../services/subscription.service");
const logger = require("../utils/logger");

async function processEvent(body) {
  const { type, payload } = body;

  logger.info('Processing event', { type });

  switch (type) {
    case EVENT_TYPES.SUBSCRIPTION_CREATED:
      await handleSubscriptionCreated(payload);
      break;

    case EVENT_TYPES.CHARGE_PAID:
      await handleChargePaid(payload);

    // case EVENT_TYPES.SUBSCRIPTION_CANCELLED:
    //   await handleSubscriptionCancelled(payload);

    default:
      logger.warn('Unknown event type', { type });
  }
}

module.exports = { processEvent };