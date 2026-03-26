const logger = require("../utils/logger");
const { callInternalAPI } = require("./internal-api.service");
const { getRechargeCustomer } = require("./recharge.service");


async function handleSubscriptionCreated(payload) {
    try {
        logger.info('Handling subscription_created', { customerId: payload.subscription.customer_id });
        const subscription = payload.subscription;
        const customerId = subscription.customer_id;

        if (!customerId) {
            throw new Error('customer_id missing in payload');
        }

        const rechargeCustomer = await getRechargeCustomer(customerId);

        const customer = {
            ...(payload.customer || {}),
            external_customer_id:
                rechargeCustomer?.external_customer_id ||
                payload?.customer?.external_customer_id ||
                null,
        };

        await callInternalAPI(customer);

        logger.info('Subscription processed successfully', {
            subscriptionId: subscription.id
        });

    } catch (error) {
        logger.error('Error in subscription service', {
            error: error.message,
            payload,
        });
        throw error;
    }
}

module.exports = { handleSubscriptionCreated };