require("dotenv").config();

const User = require("../models/user");
const Student = require("../models/student");
const Department = require("../models/department");
const Scores = require("../models/scores");
const StudentRegDetails = require("../models/regDetails");

const AuthController = async(req,res) => {
  try {
      const user = await User.findById({_id: req.body.userId});
      user.password = undefined;

      if(!user){
          return res.status(200).send({message:"User not found", success:false});
      }

      const userData = await Student.findById({ _id: req.body.userId });
      const dep = await Department.findOne({_id: userData.department});
      const userObj = {...user.toObject(), ...userData.toObject(), department: dep.depName, faculty: dep.faculty};


      res.status(200).send({
          success:true,
          data: userObj,
      });

  } catch (error) {
      console.log(error);
      res.status(200).send({message: "Auth failed", success: false, error});
  }
};

const getStudentsByDepartment = async (req, res) => {
  const { department } = req.query;
  const dep = await Department.findOne({depName: department});
  try {
    const students = await Student.find({ department: dep._id });
    let stu = [];
    for (const student of students) {
      const regDetails = await StudentRegDetails.findOne({_id : student._id});
      const scores = await Scores.findOne({_id : student._id});
      regDetails.overallMarks = scores.overall;
      stu.push({ ...student.toObject(), ...regDetails.toObject(), department: dep.depName, faculty: dep.faculty});
    }
    return res.status(200).json({ stu });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    let stu = [];
    for (const student of students) {
      const regDetails = await StudentRegDetails.findOne({_id : student._id});
      const scores = await Scores.findOne({_id : student._id});
      const dep = await Department.findOne({_id : student.department});
      regDetails.overallMarks = scores.overall;
      stu.push({ ...student.toObject(), ...regDetails.toObject(), department: dep.depName, faculty: dep.faculty});
    }
    return res.status(200).json({ stu });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

const getScores = async (req, res) => {
  const { studentId } = req.params;
  try {
    const scores = await Scores.findOne({ _id: studentId });
    if (!scores) {
      return res.status(404).json({ message: "Scores not found for this student" });
    }
    return res.status(200).json({ scores });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching scores", error: error.message });
  }
};

const updateScores = async (req, res) => {
  const { studentId } = req.params;
  const updatedScores = req.body.scores;
  const flag = req.body.flag;
  updatedScores.overall = updatedScores.bsc + updatedScores.msc + updatedScores.interaction + updatedScores.proposal + updatedScores.scholarship;
  
  try {
    // Update the Scores document with the provided student ID
    const scores = await Scores.findOneAndUpdate(
      { _id: studentId },
      updatedScores,
      { new: true }
    );
    
    // Update the Student document with the overall marks and approval status
    let updatedStudent;
    if(flag){
      updatedStudent = await StudentRegDetails.findByIdAndUpdate(
        studentId,
        {
          depApproved: true, 
        },
        { new: true }
      );
    }

    if (!scores || !updatedStudent) {
      return res.status(404).json({ message: "Scores not found for this student" });
    }

    return res.status(200).send({ message: "Scores updated successfully", scores, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Error updating scores", error: error.message });
  }
};

module.exports = { AuthController, getStudentsByDepartment, getAllStudents, getScores, updateScores };
