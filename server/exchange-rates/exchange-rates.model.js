const { Schema, model } = require('mongoose');

const exchangeRateSchema = new Schema(
  {
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = model('ExchangeRate', exchangeRateSchema);
