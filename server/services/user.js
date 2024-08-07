const bcrypt = require("bcrypt");

const findUser = async (query, User) => {
  return await User.findOne(query);
};

const findAllUser = async (query, User) => {
  return await User.find(query);
};

const createUser = async (userBody, User) => {
  const password = "temp";
  const salt = bcrypt.genSaltSync(10);
  // console.log(userBody, userBody.password ? userBody.password : password);
  const hash = bcrypt.hashSync(userBody.password ? userBody.password : password, salt);
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
