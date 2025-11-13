const AppError = require('../middleware/AppError');
const UsersService = require('../users/users.service');
const DealsModel = require('./deals.model');

exports.findByUserId = async function (userId) {
  try {
    const deals = await DealsModel.find({ user: userId })
      .populate('user')
      .populate('manager')
      .sort({ createdAt: -1 });
    return deals;
  } catch {
    return [];
  }
};

exports.create = async function (dealDataDto) {
  try {
    return await DealsModel.create(dealDataDto);
  } catch (e) {
    console.log(
      `cant create deals for the userId ${dealDataDto.userId}, err: ${e.message || e}`,
    );
    throw new AppError('User not found', 404);
  }
};

/**
 * Возвращает сводную информацию:
 * Общее количество: totalCoins
 * Всего куплено: totalPurchases
 * Всего потрачено: totalSpendings
 */
exports.calcCoinsByUser = async function (userId) {
  try {
    const result = await DealsModel.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalPurchases: {
            $sum: {
              $cond: [{ $eq: ['$type', 'purchase'] }, '$coins', 0],
            },
          },
          totalSpendings: {
            $sum: {
              $cond: [{ $eq: ['$type', 'spending'] }, '$coins', 0],
            },
          },
        },
      },
      {
        $project: {
          totalCoins: { $subtract: ['$totalPurchases', '$totalSpendings'] },
          totalPurchases: 1,
          totalSpendings: 1,
        },
      },
    ]);

    if (result.length > 0) {
      return {
        totalCoins: result[0].totalCoins,
        totalPurchases: result[0].totalPurchases,
        totalSpendings: result[0].totalSpendings,
      };
    } else {
      return {
        totalCoins: 0,
        totalPurchases: 0,
        totalSpendings: 0,
      };
    }
  } catch (e) {
    console.log(`cant calc coins by userId ${userId}, err: ${e.message || e}`);
    throw new AppError('cant calc coins', 500);
  }
};

exports.create = async function (dealDataDto) {
  try {
    const newDeal = await DealsModel.create(dealDataDto);
    return newDeal;
  } catch (e) {
    throw new AppError(`cant create new deal, err: ${e}`, 500);
  }
};

exports.findByManagerId = async function (managerId) {
  try {
    const opt = { manager: managerId };
    const sort = { createdAt: -1 };

    const deals = await DealsModel.find(opt).populate('user').sort(sort);
    return deals;
  } catch (err) {
    console.log(`not found deals for the managerId ${managerId}`, err);
    return [];
  }
};

exports.doSell = async function (opt) {
  const { clientId, managerId, amount, rate } = opt;
  console.log('-------new sell----------', clientId, managerId, amount, rate);
  const manager = await UsersService.findById(managerId);
  if (!manager && manager.role !== 'manager') {
    throw new AppError('Операция запрещена', 403);
  }
  const dealDataDto = {
    type: 'spending',
    user: clientId,
    manager: managerId,
    coins: amount,
    exchangeRate: rate,
  };
  return await this.create(dealDataDto);
};
