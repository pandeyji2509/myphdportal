const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { generateJwt } = require("../utils/generateJwt");
const { hashPassword, comparePassword } = require("../utils/bycrpt");
const { createUser, updateUser } = require("../services/user");

const log_in = async (body, User, res) => {
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
  
      const accessToken = await generateJwt(user.username, user._id, expiryTime, secret);
  
      const refreshToken = await generateJwt(user.username, user._id, expiryTime, secret);
  
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

  module.exports = {
    log_in,
};