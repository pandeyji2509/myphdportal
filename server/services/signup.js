const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { generateJwt } = require("../utils/generateJwt");
const { createUser } = require("../services/user");

const sign_up = async (body, User) => {
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

module.exports = {
    sign_up
};