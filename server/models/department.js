const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    email: {type: String },
    depName: { type: String, required: true },
    faculty: { type: String },
    subjects: { type: String },
    adminName: { type: String },
    mobile: { type: String },
  }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
