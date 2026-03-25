const SERVICE_NAME = 'subscription-lambda';

function log(level, message, meta = {}) {
  const logObject = {
    level,
    message,
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  console.log(JSON.stringify(logObject));
}

module.exports = {
  info: (message, meta) => log('info', message, meta),
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
};