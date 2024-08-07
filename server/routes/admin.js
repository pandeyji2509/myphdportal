const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/validateToken");

const { AuthController, AddDepartment, sendCredentials, sendMeetInvite, raiseObjection, getObjections, removeObjection, approveDui, feeRequest } = require("../controller/admin");

//router.post("/login", Login);

//router.post("/forgot-password", ForgotPassword);

router.post("/addDep", AddDepartment);

//router.post("/verifyOtp", verifyOtp);

//router.post("/reset-password", ResetPassword);

router.get("/getUserData", validateToken, AuthController);

// router.patch("/reset",  AuthController.ResetPassword);

// router.get("/logout", validateToken, AuthController.Logout);

router.post("/sendCredentials", sendCredentials);

router.post("/feeRequest", feeRequest);

router.post("/sendMeetInvite", sendMeetInvite );

router.put("/raiseObj/:studentId", raiseObjection);

router.put("/removeObj/:studentId", removeObjection);

router.put("/approveDui/:studentId", approveDui);

router.get("/getObjections/:studentId", getObjections);

module.exports = router;
