const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const { Signup, Login, AuthController, ForgotPassword, verifyOtp, ResetPassword, getStudentsByDepartment, getScores, updateScores } = require("../controller/student");

const { uploadFiles, getListFiles, download } = require("../controller/upload");

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/forgot-password", ForgotPassword);

router.post("/verifyOtp", verifyOtp);

router.post("/reset-password", ResetPassword);

router.get("/getUserData", validateToken, AuthController);

router.get("/getStudentByDep", getStudentsByDepartment);

router.get('/scores/:studentId', getScores);

router.put('/scores/:studentId', updateScores);

// router.patch("/reset",  AuthController.ResetPassword);

// router.get("/logout", validateToken, AuthController.Logout);

router.post("/upload", uploadFiles);
router.get("/files", getListFiles);
router.get("/files/:name", download);

module.exports = router;
