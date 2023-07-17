require("dotenv").config();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const { createUser } = require("../services/user");

const createSuperAdmin = async () => {
  try {
    const superAdminData = {
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'superadmin',
      department: null, // Set the department field to null for the super admin
      name: 'RNS Branch',
    };

    console.log(superAdminData);
    await createUser(superAdminData, Admin);

    console.log('Super admin created successfully!');
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

module.exports = createSuperAdmin;