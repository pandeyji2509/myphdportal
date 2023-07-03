const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    password: { type: String, required: true },
    department: { type: String },
    faculty: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    permaddress: { type: String },
    localaddress: { type: String },
    aadhar: { type: Number },
    telNumber: { type: Number },
    state: { type: String },
    regNumber: { type: String },
    resetPasswordToken: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
