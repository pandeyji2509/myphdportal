require("dotenv").config();
const bcrypt = require("bcrypt");
const Student = require("../models/student");
const { createUser } = require("../services/user");
const Scores = require("../models/scores");

const studentData = [
  {
      email: process.env.NITIN_EMAIL,
      password: process.env.STUDENT_PASSWORD,
      firstName: 'Nitin',
      lastName: 'Kumar',
      faculty: 'Faculty of Engineering',
      department: 'University Institute of Engineering and Technology, Panjab University',
      subject: 'Information Technology',
      gender: 'Male',
      fatherName: 'Ram',
      motherName: 'Kaushalya',
      mobileNumber: '9876543210',
      permaddress: 'Ghaziabad',
      localaddress: 'Chandigarh',
      aadhar: '123456789876',
      state: 'Uttar Pradesh',
      masterDegree: 'M.Sc',
      masterYear: '2022',
      masterUniversity: 'IIT Bombay',
      masterDivision: '1st',
      masterMarks: '100',
      masterPercent: 95,
      masterSubject: 'CSE',
      masterRollNo: 'UE208068',
      bscPercent: 80,
      eligibilityTest: 'GATE',
      regNumber: '3692123300',
      researchDep: 'UIET',
      employed: false,
},
{
  email: process.env.ANKIT_EMAIL,
    password: process.env.STUDENT_PASSWORD,
    firstName: 'Prasad',
    lastName: 'Ankit',
    faculty: 'Faculty of Engineering',
    department: 'University Institute of Engineering and Technology, Panjab University',
    subject: 'Information Technology',
    gender: 'Male',
    fatherName: 'Mr. Father',
    motherName: 'Mrs. Mother',
    mobileNumber: '9876543210',
    permaddress: 'Bihar',
    localaddress: 'Chandigarh',
    aadhar: '123456789876',
    state: 'Chandigarh',
    masterDegree: 'M.Sc',
    masterYear: '2022',
    masterUniversity: 'IIT Bombay',
    masterDivision: '1st',
    masterMarks: '100',
    masterPercent: 77,
    masterSubject: 'CSE',
    masterRollNo: 'UE208068',
    bscPercent: 80,
    eligibilityTest: 'GATE',
    regNumber: '3692123300',
    researchDep: 'UIET',
    employed: false,
},
{
  email: process.env.MUNISH_EMAIL,
    password: process.env.STUDENT_PASSWORD,
    firstName: 'Munishwar',
    lastName: 'Sharma',
    faculty: 'Faculty of Engineering',
    department: 'University Institute of Engineering and Technology, Panjab University',
    subject: 'Information Technology',
    gender: 'Male',
    fatherName: 'Mr. Father',
    motherName: 'Mrs. Mother',
    mobileNumber: '9876543210',
    permaddress: 'Amritsar',
    localaddress: 'Chandigarh',
    aadhar: '123456789876',
    state: 'Punjab',
    masterDegree: 'M.Sc',
    masterYear: '2022',
    masterUniversity: 'IIT Bombay',
    masterDivision: '1st',
    masterMarks: '100',
    masterPercent: 67,
    masterSubject: 'CSE',
    masterRollNo: 'UE208068',
    bscPercent: 80,
    eligibilityTest: 'GATE',
    regNumber: '3692123300',
    researchDep: 'UIET',
    employed: false,
},
{
    email: "prachi@gmail.com",
    password: process.env.STUDENT_PASSWORD,
    firstName: 'Prachi',
    lastName: 'Gaur',
    faculty: 'Faculty of Arts',
    department: 'Arts College',
    subject: 'Modern Art',
    gender: 'Female',
    fatherName: 'Mr. Father',
    motherName: 'Mrs. Mother',
    mobileNumber: '9876543210',
    permaddress: 'Alwar',
    localaddress: 'Chandigarh',
    aadhar: '123456789876',
    state: 'Punjab',
    masterDegree: 'M.Sc',
    masterYear: '2022',
    masterUniversity: 'IIT Bombay',
    masterDivision: '1st',
    masterMarks: '100',
    masterPercent: 87,
    masterSubject: 'CSE',
    masterRollNo: 'UE208073',
    bscPercent: 80,
    eligibilityTest: 'GATE',
    regNumber: '3692123300',
    researchDep: 'Arts College',
    employed: false,
},
];

const createDummyStudent = async () => {
  try {
    for (const student of studentData) {
      const scoreData = {
        bsc : 0.2 * student.bscPercent,
        msc : 0.3 * student.masterPercent,
        scholarship : 10,
        overall: 0.2 * student.bscPercent + 0.3 * student.masterPercent + 10,
      }
      const scoreObj = await Scores.create(scoreData);
      student._id = scoreObj._id;
      student.overallMarks = scoreObj.overall;
      await createUser(student, Student);
    }
    console.log('Dummy Students created successfully!');
  } catch (error) {
    console.error('Error creating dummy student:', error);
  }
};

module.exports = createDummyStudent;