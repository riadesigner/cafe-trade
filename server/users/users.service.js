const AppError = require('../middleware/AppError');

const UsersModel = require('./users.model');

exports.findById = async function (id) {
  try {
    const user = await UsersModel.findById(id);
    return user;
  } catch (e) {
    console.log(`cant find user by id ${id}, err: ${e.message || e}`);
    throw new AppError('User not found', 404);
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
  try {
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
  } catch (err) {
    console.log('err', err);
    throw new AppError('Не удалось создать пользователя', 500);
  }
};
