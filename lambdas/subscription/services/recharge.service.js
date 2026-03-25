const axios = require('axios');
const { getConfig } = require('./config.service');

async function getRechargeCustomer(customerId) {
  const config = await getConfig();

  const url = `https://api.rechargeapps.com/customers/${customerId}`;

  const response = await axios.get(url, {
    headers: {
      'X-Recharge-Access-Token': config.rechargeApiToken,
      'X-Recharge-Version': '2021-11',
    },
    timeout: 5000,
  });

  return response.data.customer;
}

module.exports = { getRechargeCustomer };