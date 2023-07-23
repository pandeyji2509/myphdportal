const Department = require("../models/department");
const Student = require("../models/student");

const countFaculty = async(req, res) => {
    try {
        const uniqueFaculties = await Department.distinct('faculty');
        const count = uniqueFaculties.length;
        res.json({ count });
      } catch (error) {
        console.error('Error counting unique faculties:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const countDepartments = async(req, res) => {
    try {
        const uniqueDep = await Department.distinct('depName');
        const count = uniqueDep.length;
        res.json({ count });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const countStudents = async(req, res) => {
    try {
        const uniqueStudent = await Student.distinct('email');
        const count = uniqueStudent.length;
        res.json({ count });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

module.exports = {countFaculty,  countDepartments, countStudents};