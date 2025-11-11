const AppError = require('../middleware/AppError');

const UsersModel = require('./users.model');
const DealsService = require('../deals/deals.service');

exports.findById = async function (id) {
  try {
    const user = await UsersModel.findById(id);
    return user;
  } catch (e) {
    console.log(`[1] cant find user by id ${id}, err: ${e.message || e}`);
    throw new AppError('User not found', 404);
  }
};

exports.findClientsByPhone = async function (phone) {
  try {
    console.log('================ phone ================ ', phone);
    const users = await UsersModel.find({
      phone: { $regex: phone, $options: 'i' },
      role: 'client',
    });
    return users;
  } catch (e) {
    console.log(`cant find clients by phone ${phone}, err: ${e.message || e}`);
    return [];
  }
};

exports.findClients = async function () {
  try {
    const clients = await UsersModel.find({
      role: 'client',
    });
    return clients;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

exports.findManagers = async function () {
  try {
    const managers = await UsersModel.find({
      role: 'manager',
    });
    return managers;
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

exports.findClientsCount = async function () {
  try {
    const clientsCount = await UsersModel.countDocuments({
      role: 'client',
    });
    return clientsCount;
  } catch (err) {
    console.log('err', err);
    return 0;
  }
};

// exports.update = async function (id, userUpdateDto) {
//     const {updatedAt, createdAt, ...data } = userUpdateDto;
//     try{
//       const userUpdated = await UsersModel.findByIdAndUpdate(
//           id,
//           data,
//           { new: true }
//       );
//       res(userUpdated);

//     }catch(e){
//       console.log(`cant find user by id ${id}, err: ${e.message || e}`)
//       res(null);
//     }
// }

exports.create = async function (userData) {
  try {
    const newUser = await UsersModel.create(userData);
    return newUser;
  } catch (e) {
    throw new AppError(`cant create new user, err: ${e}`, 500);
  }
};

exports.findByEmail = async function (email) {
  try {
    const user = await UsersModel.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.findAdmins = async function () {
  try {
    return await UsersModel.find({
      role: 'administrator',
    });
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

exports.findManagers = async function () {
  try {
    return await UsersModel.find({
      role: 'manager',
    });
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

exports.addManager = async function (managerData) {
  const { email, name } = managerData;
  const user = await this.findByEmail(email);

  if (user && user.role !== 'manager') {
    throw new AppError('Пользователь с такой почтой уже есть', 400);
  }

  if (user && user.role === 'manager') {
    user.isActive = true;
    await user.save();
    return user;
  }

  if (!user) {
    const userData = { email, name, role: 'manager' };
    const manager = await UsersModel.create(userData);
    return manager;
  }
};

exports.removeManagerByEmail = async function (email) {
  try {
    const manager = await UsersModel.findOne({ email: email, role: 'manager' });
    if (!manager) {
      throw new AppError(`Не удалось найти менеджера с почтой ${email}`, 404);
    }
    const deals = await DealsService.findByManagerId(manager._id);
    if (deals && deals.length > 0) {
      manager.isActive = false;
      await manager.save();
    } else {
      const result = await UsersModel.findByIdAndDelete(manager._id);
      if (!result) {
        throw new AppError(
          `Не удется удалить менеджера ${manager._id}, ${email}`,
          400,
        );
      }
    }
    return true;
  } catch (err) {
    console.log('err', err);
    throw new AppError(`Не удется удалить менеджера ${email}`, 400);
  }
};
