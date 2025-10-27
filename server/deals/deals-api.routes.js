const express = require('express');
const UsersService = require('../users/users.service');
const DealsService = require('./deals.service');
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get(
  '/deals/me',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    const deals = await DealsService.findByUserId(user._id);
    sendSuccess(res, { deals: deals.map((d) => d.toJSON()) });
  }),
);

router.put(
  '/deals/me/:amount',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { amount } = req.params;
    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    const rate = Math.floor(Math.random() * (99 - 70 + 1) + 70);
    const dealDataDto = {
      type: 'purchase',
      user: user._id,
      coins: amount,
      exchangeRate: rate,
    };
    await DealsService.create(dealDataDto);
    const deals = await DealsService.findByUserId(user._id);
    const updatedCoinsData = await DealsService.calcCoinsByUser(user._id);
    sendSuccess(res, { deals: deals.map((d) => d.toJSON()), updatedCoinsData });
  }),
);

module.exports = router;
