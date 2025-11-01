const express = require('express');
const UsersService = require('./users.service');
const DealsService = require('../deals/deals.service');
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get(
  '/users/me',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    const coinsData = await DealsService.calcCoinsByUser(user._id);
    sendSuccess(res, { user: user.toJSON(), coinsData });
  }),
);

router.get(
  '/users/managers',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const managers = await UsersService.findManagers();
    sendSuccess(res, { managers: managers.map((m) => m.toJSON()) });
  }),
);

router.get(
  '/users/clients',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const clients = await UsersService.findClients();
    sendSuccess(res, { clients: clients.map((m) => m.toJSON()) });
  }),
);

router.get(
  '/users/clients/count',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const clientsCount = await UsersService.findClientsCount();
    sendSuccess(res, { clientsCount });
  }),
);

// router.get(
//   '/users/:id',
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     console.log(`search user ${id}`);
//     const user = await UsersService.findById(id);
//     if (!user) {
//       return sendError(res, 'User not found', 404);
//     }
//     sendSuccess(res, { user: user.toJSON() });
//   }),
// );

router.put(
  '/users/manager',
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    await UsersService.addManager({ name, email });
    const managers = await UsersService.findManagers();
    sendSuccess(res, { managers: managers.map((m) => m.toJSON()) });
  }),
);

router.delete(
  '/users/manager',
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    await UsersService.removeManagerByEmail(email);
    const managers = await UsersService.findManagers();
    sendSuccess(res, { managers: managers.map((m) => m.toJSON()) });
  }),
);

module.exports = router;
