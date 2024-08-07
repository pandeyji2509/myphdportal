const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    email: {type: String },
    firstName: { type: String },
    lastName: { type: String },
    isApproved: {type: Boolean, default: false},
    subject: { type: String },
    gender: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    mobile: { type: String },
    permaddress: { type: String },
    localaddress: { type: String },
    aadhar: { type: String },
    tel: { type: String },
    state: { type: String },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
