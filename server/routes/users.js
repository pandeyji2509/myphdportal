const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const { Signup, Login, ForgotPassword, verifyOtp } = require("../controller/user");

router.post("/signup", Signup);

router.post("/login", Login);

router.patch("/forgot", ForgotPassword);

router.post("/verifyOtp", verifyOtp);

// router.patch("/reset",  AuthController.ResetPassword);

// router.get("/logout", validateToken, AuthController.Logout);

module.exports = router;
