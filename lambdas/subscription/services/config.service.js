const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const logger = require('../utils/logger');

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_REGION,
});

const SECRETS_ARN = process.env.SECRETS_ARN;

// --------------------
// Internal Cache
// --------------------
let cachedConfig = null;

// --------------------
// Load Secrets Once
// --------------------
async function loadConfig() {
  try {
    if (cachedConfig) return cachedConfig;

    const command = new GetSecretValueCommand({
      SecretId: SECRETS_ARN,
    });

    const response = await secretsClient.send(command);

    const secrets = JSON.parse(response.SecretString);

    logger.info('secrets', secrets);


    // ✅ Normalize config (VERY IMPORTANT)
    cachedConfig = {
      rechargeApiToken: secrets.RECHARGE_API_TOKEN,
      internalApiUrl: secrets.INTERNAL_SUBSCRIPTION_API_URL,
    };

    return cachedConfig;
  } catch (error) {
    console.error('Config load failed:', error);
    throw error;
  }
}

// --------------------
// Getter (Safe Access)
// --------------------
async function getConfig() {
  if (!cachedConfig) {
    await loadConfig();
  }
  return cachedConfig;
}

// --------------------
// Optional: Preload (for handler)
// --------------------
async function preloadConfig() {
  await loadConfig();
}

module.exports = {
  getConfig,
  preloadConfig,
};