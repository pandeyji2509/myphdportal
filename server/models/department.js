const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    depName: { type: String, required: true },
    faculty: { type: String },
    depEmail: { type: String, required: true },
    subjects: { type: String },
  }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
