const logger = require('../utils/logger');


async function handleSubscriptionCancelled(payload) {
    try {
        logger.info('Handling subscription_created', { customerId: payload.subscription.customer_id });
        const subscription = payload.subscription;
        const customerId = subscription.customer_id;

        if (!customerId) {
            throw new Error('customer_id missing in payload');
        }
        // const rechargeCustomer = await getRechargeCustomer(customerId);
        // const customer = {
        //     external_customer_id:
        //         rechargeCustomer?.external_customer_id || null
        // };

        // await callInternalAPI(customer, subscription);

        logger.info('Subscription cancelld processed successfully', {
            subscriptionId: subscription.id
        });

    } catch (error) {
        logger.error('Error in subscription cancelled service', {
            error: error.message,
            payload,
        });
        throw error;
    }
}

module.exports = { handleSubscriptionCancelled };
