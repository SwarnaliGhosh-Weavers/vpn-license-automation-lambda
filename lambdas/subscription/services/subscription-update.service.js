const logger = require('../utils/logger');
const { callInternalAPI } = require('./internal-api.service');

async function handleSubscriptionUpdated(payload) {
    logger.info('Handling subscription_updated', payload);
    try {

        await callInternalAPI({
            type: 'subscription_updated',
            raw: payload
        });

    } catch (error) {
        logger.error('Error in handleSubscriptionUpdated service', {
            error: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        return null;
    }
}

module.exports = { handleSubscriptionUpdated };
