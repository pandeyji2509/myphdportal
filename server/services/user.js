const bcrypt = require("bcrypt");

const findUser = async (query, User) => {
  return await User.findOne(query);
};

const findAllUser = async (query, User) => {
  return await User.find(query);
};

const createUser = async (userBody, User) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userBody.password, salt);
  return await User.create({ ...userBody, password: hash });
};

const updateUser = async (query, options, User) => {
  return await User.updateOne(query, options);
};

module.exports = {
  findUser,
  createUser,
  updateUser,
};
