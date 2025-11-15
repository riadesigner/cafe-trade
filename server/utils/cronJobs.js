// server/cronJobs.js
const cron = require('node-cron');
const updateExchangeRate = require('../exchange-rates/updateExchangeRate');

function initCronJobs() {
  // Каждый день в 1 час ночи
  cron.schedule('0 1 * * *', async () => {
    console.log('Running exchange rate update...');
    try {
      console.log('try exchange');
      await updateExchangeRate();
      console.log('Exchange rate updated successfully');
    } catch (error) {
      console.error('Failed to update exchange rate:', error);
    }
  });
}

module.exports = initCronJobs;
