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
    // .populate('userInfo')
    return user;
  } catch (e) {
    console.log(`cant find user by id ${email}, err:${e.message || e}`);
    throw new AppError('User not found', 404);
  }
};

exports.findAdmins = async function () {
  try {
    return await UsersModel.find({
      role: 'administrator',
    });
    //.populate('userInfo');
  } catch (err) {
    console.log('err', err);
    return [];
  }
};
