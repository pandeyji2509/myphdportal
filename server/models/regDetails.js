const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentRegDetailsSchema = new Schema(
  {    
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
    
    enrollmentNumber: { type: String },
    depApproved:{ type: Boolean, default: false },
    duiApproved:{ type: Boolean, default: false },
    rnsApproved:{ type: Boolean, default: false },
    flag: { type: Boolean, default: false },
    objections: [String],

    noc: String,
    migration: String,
    eligibility: String,
    dmc: String,
    scholarship: String,
    mom: String,
    fee: String,
  },
  { timestamps: true }
);

const StudentRegDetails = mongoose.model('StudentRegDetails', StudentRegDetailsSchema);
module.exports = StudentRegDetails;
