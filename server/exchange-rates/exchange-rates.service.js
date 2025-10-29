const AppError = require('../middleware/AppError');
const ExchangeRateModel = require('./exchange-rates.model');

exports.findLast = async function () {
  try {
    return await ExchangeRateModel.findOne()
      .sort({ createdAt: -1 }) // -1 = по убыванию (последняя сначала)
      .limit(1);
  } catch (error) {
    console.error('Not found exchange rate:', error);
    throw AppError(error, 500);
  }
};
