const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const { generateJwt } = require("../utils/generateJwt");
const { hashPassword, comparePassword } = require("../utils/bycrpt");
const { sendOtpEmail } = require("../utils/mailer");
const User = require("../models/user");
const { createUser, updateUser } = require("../services/user");
const { otpModel } = require("../models/Otp");

const Signup = async (req, res) => {
  try {
    console.log(req.body);
    //Check if the email has been already registered.
    var user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(500).json({
        error: true,
        message: "Email is already in use",
      });
    }

    const hash = await hashPassword(req.body.password);

    let code = Math.floor(100000 + Math.random() * 900000);

    let expiry = Date.now() + 60 * 1000 * 15; //15 mins in ms

    const userObj = await createUser(req.body);

    const sendCode = await sendOtpEmail(req.body.email, userObj._id);

    if (sendCode.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send verification email.",
      });
    }

    const refreshToken = await generateJwt(req.body.email, userObj._id);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const accessToken = await generateJwt(req.body.email, userObj._id);
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
      return res.status(400).json({
        error: true,
        message: "Cannot authorize user.",
      });
    }

    //1. Find if any account with that email exists in DB
    const user = await User.findOne({ email: email });

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
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
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    //Generate Access token

    const accessToken = await generateJwt(user.email, user._id);

    const refreshToken = await generateJwt(user.email, user._id);

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

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        status: 400,
        error: true,
        message: "Cannot be processed",
      });
    }
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.send({
        success: true,
        message:
          "If that email address is in our database, we will send you an email to reset your password",
      });
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    let response = await sendEmail(user.email, code);

    if (response.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send mail. Please try again later.",
      });
    }

    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expiry; // 15 minutes

    await user.save();

    return res.send({
      success: true,
      message:
        "If that email address is in our database, we will send you an email to reset your password",
    });
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
    const { token, newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword) {
      return res.status(403).json({
        error: true,
        message: "Couldn't process request. Please provide all mandatory fields",
      });
    }
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.send({
        error: true,
        message: "Password reset token is invalid or has expired.",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Passwords didn't match",
      });
    }
    const hash = await User.hashPassword(req.body.newPassword);
    user.password = hash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = "";

    await user.save();

    return res.send({
      success: true,
      message: "Password has been changed",
    });
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

    let user = await User.findOne({ userId: id });

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

    await updateUser({ _id: userId }, { verified: true });

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
module.exports = { Signup, Login, ForgotPassword, verifyOtp };
