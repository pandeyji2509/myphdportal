const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    adminName: { type: String },
    mobile: { type: String },
    user: {type: String },
    num: { type: Number, default: 0},
  }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
