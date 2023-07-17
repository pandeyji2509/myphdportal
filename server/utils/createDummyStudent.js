require("dotenv").config();
const bcrypt = require("bcrypt");
const Student = require("../models/student");
const { createUser } = require("../services/user");

const createDummyStudent = async () => {
  try {
    const studentData = {
      email: process.env.STUDENT_EMAIL,
      password: process.env.STUDENT_PASSWORD,
      role: 'superadmin',
      firstName: 'Nitin',
      lastName: 'Kumar',
      faculty: 'Faculty of Engineering',
      department: 'UIET',
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
      masterPercent: '100%',
      masterSubject: 'CSE',
      masterRollNo: 'UE208068',
      eligibilityTest: 'GATE',
      regNumber: '3692123300',
      researchDep: 'UIET',
      employed: false,
    };

    console.log(studentData);
    await createUser(studentData, Student);

    console.log('Dummy Student created successfully!');
  } catch (error) {
    console.error('Error creating dummy student:', error);
  }
};

module.exports = createDummyStudent;