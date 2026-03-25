const { processEvent } = require("./controller/subscription.controller");
const { preloadConfig } = require("./services/config.service");
const logger = require("./utils/logger");

exports.handler = async (event) => {
    try {
        logger.info('Lambda triggered', { recordCount: event.Records.length });
        // ✅ Load secrets ONCE per Lambda execution
        await preloadConfig();

        for (const record of event.Records) {
            const body = JSON.parse(record.body);

            await processEvent(body);
        }

        return { success: true };
    } catch (error) {
        logger.error('Lambda error', { error: error.message });
        throw error; // retry
    }
};