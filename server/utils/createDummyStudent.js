require("dotenv").config();
const bcrypt = require("bcrypt");
const Student = require("../models/student");
const { createUser } = require("../services/user");
const Scores = require("../models/scores");
const students = require("./student");


const createDummyStudent = async () => {
  try {
    for (const student of students) {
      const studentData = {
          email: student.email,
          password: process.env.STUDENT_PASSWORD,
          firstName: student.firstName,
          lastName: student.lastName,
          faculty: 'Faculty of Engineering & Technology',
          department: 'University Institute of Engineering and Technology',
          subject: 'Information Technology',
          gender: student.gender,
          fatherName: 'A',
          motherName: 'B',
          mobileNumber: student.mobileNumber,
          permaddress: 'Ghaziabad',
          localaddress: 'Chandigarh',
          aadhar: '123456789876',
          state: 'Uttar Pradesh',
          masterDegree: 'M.Sc',
          masterYear: '2022',
          masterUniversity: 'IIT Bombay',
          masterDivision: '1st',
          masterMarks: '100',
          masterPercent: student.masterPercent,
          masterSubject: 'CSE',
          masterRollNo: 'UE208068',
          bscPercent: student.bscPercent,
          eligibilityTest: 'GATE',
          regNumber: '3692123300',
          researchDep: 'University Institute of Engineering and Technology',
          employed: false,
        };
      console.log(student);
      const scoreData = {
        bsc : 0.2 * student.bscPercent,
        msc : 0.3 * student.masterPercent,
        scholarship : 10,
        overall: 0.2 * student.bscPercent + 0.3 * student.masterPercent + 10,
      }
      const scoreObj = await Scores.create(scoreData);
      studentData._id = scoreObj._id;
      studentData.overallMarks = scoreObj.overall;
      await createUser(studentData, Student);
    }
    console.log('Dummy Students created successfully!');
  } catch (error) {
    console.error('Error creating dummy student:', error);
  }
};

module.exports = createDummyStudent;