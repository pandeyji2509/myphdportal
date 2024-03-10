const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { 
      type: String, 
      required: [true, "Email Address is required"], 
      unique: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"] 
    },
    role: { 
      type: String, 
      required: true 
    },
    resetPasswordToken: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
