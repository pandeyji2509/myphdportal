const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const { Login, ForgotPassword, verifyOtp, ResetPassword } = require("../controller/user");

router.post("/login", Login);

router.post("/forgot-password", ForgotPassword);

router.post("/verifyOtp", verifyOtp);

router.post("/reset-password", ResetPassword);

module.exports = router;
