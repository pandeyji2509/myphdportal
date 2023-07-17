const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { generateJwt } = require("../utils/generateJwt");
const { hashPassword, comparePassword } = require("../utils/bycrpt");
const { createUser, updateUser } = require("../services/user");
const { sign_up } = require("../services/signup");
const { log_in } = require("../services/login");

const Admin = require("../models/admin");
const Student = require("../models/student");
const Department = require("../models/department");




const Signup = async (req, res) => {
  try {
    console.log(body);
    //Check if the email has been already registered.
    var user = await Admin.findOne({
      email: body.email,
    });

    if (user) {
      return res.status(500).json({
        error: true,
        message: "Email is already in use",
      });
    }

  //   const hash = await hashPassword(req.body.password);

    const expiryTime = "1h";

    const secret = process.env.SECRET;

  //   let code = Math.floor(100000 + Math.random() * 900000);

  //   let expiry = Date.now() + 60 * 1000 * 15; //15 mins in ms

    const userObj = await createUser(body, Admin);

  //   const sendCode = await sendOtpEmail(req.body.email, userObj._id);

  //   if (sendCode.error) {
  //     return res.status(500).json({
  //       error: true,
  //       message: "Couldn't send verification email.",
  //     });
  //   }

  //   const refreshToken = await generateJwt(req.body.email, userObj._id, expiryTime, secret);

  //   res.cookie("jwt", refreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "None",
  //     maxAge: 24 * 60 * 60 * 1000,
  //   });

    const accessToken = await generateJwt(req.body.email, userObj._id, expiryTime, secret);
    //Check if referred and validate code.

    return res.status(200).json({
      success: true,
      message: "Registration Success",
      refreshToken,
      accessToken,
      userObj,
    });
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};
  
const Login = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send({
        message: "Cannot authorize user", 
        success: false});
    }

    //1. Find if any account with that email exists in DB
    const user = await Admin.findOne({ email: email });

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(200).send({
        message: "Account Not Found", 
        success: false});
    }

    //2. Throw error if account is not activated
    // if (!user.active) {
    //   return res.status(400).json({
    //     error: true,
    //     message: "You must verify your email to activate your account",
    //   });
    // }

    //3. Verify the password is valid
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return res.status(200).send({
        message: "Invalid Credentials", 
        success: false});
    }

    //Generate Access token

    const expiryTime = "1h";
    const secret = process.env.JWT_SECRET;

    const accessToken = await generateJwt(user.email, user._id, expiryTime, secret);

    const refreshToken = await generateJwt(user.email, user._id, expiryTime, secret);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Success
    return res.send({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
};
  
  const AuthController = async(req,res) => {
    try {
        //finding user in the database with the userId which we created in the req.body in the authMiddleware
        const user = await Admin.findById({_id: req.body.userId});
        //we dont want to return password to the browser, so will hide it after fetching it from the database
        user.password = undefined;
        if(!user){
            return res.status(200).send({message:"User not found", success:false});
        }
        
        //sending every data about the user from the database to the frontend
        else{
            res.status(200).send({
                success:true,
                data: user,
            });
        }
  
    } catch (error) {
        console.log(error);
        res.status(200).send({message: "Auth failed", success: false, error});
    }
  };
  
  const ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      // user doesn't enter email.
      if (!email) {
        return res.send({
          status: 400,
          error: true,
          message: "Please enter email.",
        });
      }
      const user = await Admin.findOne({
        email: email,
      });
  
      // user email not found in database
      if (!user) {
        return res.send({
          status: 400,
          error: true,
          message:
            "Email Address is not found in our database, please sign up to the portal.",
        });
      }
  
      // if user email exists in database generate a one time link for 15mins.
  
      if(user){
  
        // link generating
        const secret = process.env.SECRET + user.password;
        const expiryTime = "1m";
        const token = await generateJwt(user.email, user._id, expiryTime, secret);
        const link = 'http://localhost:3000/reset-password';
  
        // sending email
  
        let response = await send_forget_password_email(user.email, user._id, link);
  
        if (response.error) {
          return res.status(500).json({
            error: true,
            message: "Couldn't send mail. Please try again later.",
          });
        };
  
        // saving token in database
  
        user.resetPasswordToken = token;
        await user.save();
  
        return res.send({
          success: true,
          message:
            "If that email address is in our database, we will send you an email to reset your password",
        });
  
      }
    } catch (error) {
      console.error("forgot-password-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  
  const ResetPassword = async (req, res) => {
    try {
      const { newPassword, confirmPassword, email } = req.body;
  
      if (!email || !newPassword || !confirmPassword) {
        return res.status(403).json({
          error: true,
          message: "Couldn't process request. Please provide all mandatory fields",
        });
      }
  
      const user = await Admin.findOne({
        email: email
      });
  
      const secret = process.env.SECRET + user.password;
      jwt.verify(user.resetPasswordToken, secret, async (err, verifiedJwt) => {
        if(err){
          return res.send({
            error: true,
            message: "Password reset token is invalid or has expired.",
          });
        }else{
          if (newPassword !== confirmPassword) {
            return res.status(400).json({
              error: true,
              message: "Passwords didn't match",
            });
          }
          const hash = await hashPassword(req.body.newPassword);
          user.password = hash;
          user.resetPasswordToken = null;
      
          await user.save();
      
          return res.send({
            success: true,
            message: "Password has been changed",
          });
        }});
    } catch (error) {
      console.error("reset-password-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  
  const Logout = async (req, res) => {
    try {
      const { id } = req.decoded;
  
      let user = await Admin.findOne({ userId: id });
  
      user.accessToken = "";
  
      await user.save();
  
      return res.send({ success: true, message: "User Logged out" });
    } catch (error) {
      console.error("user-logout-error", error);
      return res.stat(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  
  const verifyOtp = async (req, res) => {
    try {
      console.log(req.body);
  
      const userId = req.body.id;
      const body_otp = req.body.otp;
  
      // console.log(userId);
  
      if (!userId && !body_otp) {
        return res.status(500).json({
          status: "failure",
          message: "Empty otp is not allowed",
        });
      }
  
      const userOtpRecords = await otpModel.find({ entityId: userId }).sort({ createdAt: -1 });
  
      if (userOtpRecords.length < 0) {
        res.status(500).json({
          status: "failure",
          message: "Account Record doesnt exist . Please login or signin",
        });
      }
  
      // console.log(userOtpRecords);
  
      const { expiresAt, otp } = userOtpRecords[0];
  
      // if (expiresAt < Date.now()) {
      //   await otpVerificationModel.deleteMany({ entityId: userId });
      //   return res.status(500).json({
      //     status: "failure",
      //     message: "Code has expired . Please request again",
      //   });
      // }
  
      console.log(body_otp, otp);
  
      const validOtp = await bcrypt.compare(body_otp, otp);
  
      console.log(validOtp);
  
      if (!validOtp) {
        return res.status(500).json({
          status: "failure",
          message: "Invalid OTP",
        });
      }
  
      await updateUser({ _id: userId }, { verified: true }, Admin);
  
      await otpModel.deleteMany({ _id: userId });
  
      return res.status(200).json({
        status: "success",
        message: "User is verified",
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const resendOtp = async (req, res) => {
    try {
      const sendCode = await sendOtpEmail(req.body.email, userObj._id);
  
      if (sendCode.error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't send verification email.",
        });
      }
    } catch (error) {}
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
        depEmail: req.body.depEmail,
        subjects: req.body.subjects,
      };
  
      const depObj = await Department.create(depData);
      console.log("Dep Obj", depObj);
  
      const userData = {
        username: req.body.username,
        password: req.body.password,
        role: "admin",
        name: req.body.name,
        email: req.body.email,
        student: null,
        department: depObj._id,
      };
      
      const adminObj = await createUser(userData, Admin);
      console.log("Admin Obj", adminObj);
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

  module.exports = { Signup, Login, AuthController, ForgotPassword, verifyOtp, ResetPassword, AddDepartment };
  