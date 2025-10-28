const { Schema, model } = require('mongoose');

const exchangeRateSchema = new Schema(
  {
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = model('ExchangeRate', exchangeRateSchema);
