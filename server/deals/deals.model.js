const { Schema, model } = require('mongoose');

const dealSchema = new Schema(
  {
    type: {
      type: String, // purchase | spending
      required: true,
    },
    coins: {
      type: Number,
      default: 0,
    },
    exchangeRate: {
      type: Number, // 55-95
      required: true,
    },
    createdAt: {
      type: Date,
    },
    user: {
      type: Schema.Types.Mixed,
      ref: 'Users',
      default: null,
    },
    manager: {
      type: Schema.Types.Mixed,
      ref: 'Users',
      default: null,
    },
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
module.exports = model('Deals', dealSchema);
