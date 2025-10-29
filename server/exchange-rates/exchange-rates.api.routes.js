const express = require('express');
const ExchangeRatesService = require('./exchange-rates.service');
const { asyncHandler, sendSuccess } = require('../middleware/utils');

const router = express.Router();

router.get(
  '/exchange-rates/current',
  asyncHandler(async (req, res) => {
    const currentRate = await ExchangeRatesService.findLast();
    sendSuccess(res, { currentRate: currentRate.toJSON() });
  }),
);

// router.get(
//   '/exchange-rates',
//   asyncHandler(async (req, res) => {
//     const rates = await ExchangeRatesService.find();
//     sendSuccess(res, { rates: rates.map((r)=>r.toJSON()) });
//   }),
// );

module.exports = router;
