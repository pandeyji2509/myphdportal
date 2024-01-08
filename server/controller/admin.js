require("dotenv").config();

const { hashPassword } = require("../utils/bycrpt");
const { createUser } = require("../services/user");
const { sendPasswordEmail, sendInteractionInvite, sendFeeRequest } = require("../utils/mailer");

const User = require("../models/user");
const Student = require("../models/student");
const Department = require("../models/department");
const Scores = require("../models/scores");
const Admin = require("../models/admin");
const StudentRegDetails = require("../models/regDetails");
  
const AuthController = async (req, res) => {
  try {
      const user = await User.findById({ _id: req.body.userId });
      user.password = undefined;

      if (!user) {
          return res.status(200).send({ message: "User not found", success: false });
      }

      let userData;
      let userObj;
      if (user.role === "admin") {
        userData = await Admin.findById({ _id: req.body.userId });
        userObj = {
          _id: user._id,
          role: user.role,
          email: user.email,
          name: userData.name,
          adminName: userData.adminName,
          mobile: userData.mobile,
          user: userData.user,
        };
      } else if (user.role === "department") {
        userData = await Department.findById({ _id: req.body.userId });
        userObj = {
          _id: user._id,
          role: user.role,
          email: user.email,
          depName: userData.depName,
          faculty: userData.faculty,
          subjects: userData.subjects,
          adminName: userData.adminName,
          mobile: userData.mobile,
        };
      }

      res.status(200).send({
          success: true,
          data: userObj,
      });

  } catch (error) {
      console.log(error);
      res.status(200).send({ message: "Auth failed", success: false, error });
  }
};
  
const AddDepartment = async (req, res) => {
  try {

    var user = await Department.findOne({
      depName: req.body.depName,
    });

    if (user) {
      return res.status(200).send({
        success: false,
        message: "Department already added",
      });
    }

    const depData = {
      depName: req.body.depName,
      faculty: req.body.faculty,
      email: req.body.depEmail,
      subjects: req.body.subjects,
      adminName: req.body.name,
      mobile: '9876543210',
    };

    const depObj = await Department.create(depData);

    const userData = {
      _id: depObj._id,
      password: req.body.password,
      role: "department",
      email: req.body.depEmail,
    };
    
    await createUser(userData, User);

    return res.status(200).send({
      success: true,
      message: "Registration Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(200).send({
      success: false,
      message: "Cannot Register",
    });
  }
};

// Function to generate a random password with at least one uppercase, one lowercase, and one numeric character,
// and concatenate it with the first three non-whitespace characters of the first name
const generatePassword = (firstName) => {
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const numericCharacters = '0123456789';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let password = '';
  let count = 0;
  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumeric = false;

  // Starts with first three non-whitespace characters of the first name
  for (let i = 0; i < firstName.length; i++) {
    if (count >= 3) {
      break;
    }
    if (firstName[i] !== ' ') {
      password += firstName[i];
      count++;
    }
  }

  // password will have least one uppercase, one lowercase, and one numeric character
  while (password.length < 8 || !hasUppercase || !hasLowercase || !hasNumeric) {
    const randomIndex = Math.floor(Math.random() * uppercaseCharacters.length);
    const randomCharacter = uppercaseCharacters.charAt(randomIndex);
    if (!hasUppercase) {
      password += randomCharacter;
      hasUppercase = true;
    }

    const randomIndex2 = Math.floor(Math.random() * lowercaseCharacters.length);
    const randomCharacter2 = lowercaseCharacters.charAt(randomIndex2);
    if (!hasLowercase) {
      password += randomCharacter2;
      hasLowercase = true;
    }

    const randomIndex3 = Math.floor(Math.random() * numericCharacters.length);
    const randomCharacter3 = numericCharacters.charAt(randomIndex3);
    if (!hasNumeric) {
      password += randomCharacter3;
      hasNumeric = true;
    }

    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
};

const sendCredentials = async(req,res) =>{
  try {
    const stu = await Student.findOne({_id: req.body.id});
    const score = await Scores.findOne({_id: req.body.id});

    if(!score || !score.finalApproval){
      return res.status(200).send({
        error: true,
        message: "Scores of candidates are not approved",
      })
    }

    if(stu){
      const firstName = stu.firstName;

      //password generated
      const password = generatePassword(firstName);
      const dep = await Department.findOne({_id: stu.department});
      const sendPassword = await sendPasswordEmail(stu.email, password, dep.depName, stu._id);

      if (sendPassword.error) {
        return res.status(500).send({
          error: true,
          message: "Couldn't send password email.",
        });
      }

      //password hashed
      const hash = await hashPassword(password);

      //hashed password stored in the db
      stu.isApproved = true;

      const user = {
        _id: stu._id,
        email: stu.email,
        password: hash,
        role: "student",
      };
      
      await stu.save();
      await User.create(user);

      res.status(200).send({
        status: "success",
        message: sendPassword.message,
      })
      
    }else{
      res.status(404).send({
        error: true,
        message: "User not found, please sign up to the portal"
      })
    }

  } catch (error) {
    console.log(error);
  }
};

const sendMeetInvite = async(req, res) =>{
  const {data, time, venue, date} = req.body;
  for(let i = 0; i<data.length; i++)
  {
      const user = await Student.findOne({_id: data[i]});
      if(user){

        const sendMail = await sendInteractionInvite(user.email, date, time, venue, data[i]);
        if(!sendMail.error)
        {
          user.mailSent = true;
          await user.save();
        }
        else{
          console.log(sendMail.message);
        }
      }
      else{
        console.log("User doesn't exist");
      }
  }

  res.status(200).send({
    status: "success",
    message: "Emails sent successfully",
  })
}

const raiseObjection = async (req, res) => {
  const { studentId } = req.params;
  const objectionText = req.body.obj;
  
  try {
    await StudentRegDetails.findByIdAndUpdate(
      studentId,
      { 
        $push: { objections: objectionText },
        $set: { flag: true, depApproved: false, duiApproved: false}, 
      },
      { new: true }
    );
    res.status(200).send('Objection text added successfully!');
  } catch (error) {
    console.error('Error updating objections:', error);
    res.status(500).send('Error updating objections');
  }
};

const getObjections = async (req, res) => {
  const { studentId } = req.params;
  try {
    const data = await StudentRegDetails.findOne({ _id: studentId });
    if (!data) {
      return res.status(404).json({ message: "Objections not found for this student" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching objections", error: error.message });
  }
};

const removeObjection = async (req, res) => {
  const { studentId } = req.params;
  const objectionText = req.body.obj;
  try {
    await StudentRegDetails.findByIdAndUpdate(
      studentId,
      { 
        $pull: { objections: objectionText },
      },
      { new: true }
    );

    const data = await StudentRegDetails.findOne({ _id: studentId });
    const flagVal = (data.objections.length !== 0);
    await StudentRegDetails.findByIdAndUpdate(
      studentId,
      { 
        $set: { flag: flagVal },
      },
      { new: true }
    );
    res.status(200).send('Objection text removed successfully!');
  } catch (error) {
    console.error('Error removing objections:', error);
    res.status(500).send('Error removing objections');
  }
};

const approveDui = async (req, res) => {
  const { studentId } = req.params;
  
  try {
    await StudentRegDetails.findByIdAndUpdate(
      studentId,
      { 
        $set: { duiApproved: true }, 
      },
      { new: true }
    );
    res.status(200).send('Approved!');
  } catch (error) {
    res.status(500).send('Error');
  }
};

const feeRequest = async(req,res) =>{
  console.log(req.body);
  try {
    const student = await Student.findOne({_id: req.body.id});
    const regDetails = await StudentRegDetails.findOne({_id: req.body.id});

    console.log(student, regDetails);
    if(regDetails.enrollmentNumber.length === 0) {
      const rns = await Admin.findOne({user: "rns"});
      await Admin.findByIdAndUpdate(
        rns._id,
        { 
          $set: { num: rns.num + 1 },
        },
        { new: true }
      );
      const updatedRns = await Admin.findOne({user: "rns"});
      const enrollmentNumber = 100000 + updatedRns.num;

      await StudentRegDetails.findByIdAndUpdate(
        student._id,
        { 
          $set: { enrollmentNumber: enrollmentNumber.toString() },
        },
        { new: true }
      );
    }

    if(!student || !regDetails){
      return res.status(200).send({
        error: true,
        message: "error finding student",
      })
    }

    const dep = await Department.findOne({_id: student.department});
    const updatedReg = await StudentRegDetails.findOne({_id: req.body.id});

    const sendRequest = await sendFeeRequest(student.email, student.firstName, updatedReg.enrollmentNumber, dep.depName, student._id);

    res.status(200).send({
      status: "success",
      message: "Request sent successfully",
    })

    if (sendRequest.error) {
      return res.status(500).send({
        error: true,
        message: "Couldn't send request email.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { AuthController, AddDepartment, sendCredentials, sendMeetInvite, raiseObjection, getObjections, removeObjection, approveDui, feeRequest };
  