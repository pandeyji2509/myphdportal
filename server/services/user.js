const User = require("../models/user");
const bcrypt = require("bcrypt");

const findUser = async (query) => {
  return await User.findOne(query);
};

const findAllUser = async (query) => {
  return await User.find(query);
};

const createUser = async (userBody) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userBody.password, salt);
  return await User.create({ ...userBody, password: hash });
};

const updateUser = async (query, options) => {
  return await User.updateOne(query, options);
};

module.exports = {
  findUser,
  createUser,
  updateUser,
};
