const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null},
    isApproved: {type: Boolean, default: false},
    firstName: { type: String },
    lastName: { type: String },
    faculty: { type: String },
    department: { type: String },
    subject: { type: String },
    gender: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    mobileNumber: { type: String },
    permaddress: { type: String },
    localaddress: { type: String },
    aadhar: { type: String },
    telNumber: { type: String },
    state: { type: String },
    masterDegree: { type: String },
    masterYear: { type: String },
    masterUniversity: { type: String },
    masterDivision: { type: String },
    masterMarks: { type: String },
    masterPercent: { type: Number },
    masterSubject: { type: String },
    masterRollNo: { type: String },
    bscPercent: {type: Number, default: 80},
    overallMarks: {type: Number, default: 0},
    eligibilityTest: { type: String },
    isScholarship: {type: Boolean, default: true},
    regNumber: { type: String },
    researchDep: { type: String },
    employed: { type: String },
    employerDetails: { type: String },
    mailSent:{ type: Boolean, default: false },
    noc: String,
    migration: String,
    eligibility: String,
    dmc: String,
    scholarship: String,
    mom: String,
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
