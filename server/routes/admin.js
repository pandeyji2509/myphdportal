const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const { Signup, Login, AuthController, ForgotPassword, verifyOtp, ResetPassword, AddDepartment, sendCredentials } = require("../controller/admin");

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/forgot-password", ForgotPassword);

router.post("/addDep", AddDepartment);

router.post("/verifyOtp", verifyOtp);

router.post("/reset-password", ResetPassword);

router.get("/getUserData", validateToken, AuthController);

// router.patch("/reset",  AuthController.ResetPassword);

// router.get("/logout", validateToken, AuthController.Logout);

router.post("/sendCredentials", sendCredentials);

module.exports = router;
