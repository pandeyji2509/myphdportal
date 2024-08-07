require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Admin = require("../models/admin");
const { createUser } = require("../services/user");

const createSuperAdmin = async () => {
  try {
    const userData = {
      email: process.env.RNS_EMAIL,
      password: process.env.PASSWORD,
      role: "admin",
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);
    let adminObj = await User.create({ ...userData, password: hash });

    const adminData = {
      _id: adminObj._id,
      name: "Registration & Stores Department",
      adminName : "R&S Admin",
      mobile : "9876543210",
      user : "rns",
    }

    await Admin.create(adminData);

    userData.email = process.env.DUI_EMAIL;
    adminObj = await User.create({ ...userData, password: hash });

    adminData._id  = adminObj._id;
    adminData.name = "Dean of University Instruction";
    adminData.adminName = "DUI Admin";
    adminData.user = "dui";

    await Admin.create(adminData);
    console.log('Super admins created successfully!');
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

module.exports = createSuperAdmin;