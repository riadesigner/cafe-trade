const AppError = require('../middleware/AppError');

const ExchangeRateModel = require('./exchange-rates.model');

async function updateExchangeRate() {
  try {
    const newRate = await getExchangeRateFromExternalAPI();
    await ExchangeRateModel.create({ rate: newRate });
    console.log(`Exchange rate updated: ${newRate}`);
    return newRate;
  } catch (error) {
    console.error('Error updating exchange rate:', error);
    throw AppError(error, 500);
  }
}

async function getExchangeRateFromExternalAPI() {
  // 70...99
  const newRate = Math.floor(Math.random() * (99 - 70 + 1) + 70);
  return newRate;
}

// Если скрипт запущен напрямую
if (require.main === module) {
  updateExchangeRate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = updateExchangeRate;
