const express = require("express");
const router = express.Router();

const { countDepartments, countFaculty, countStudents } = require("../controller/stats");

router.get("/countDepartments", countDepartments);
router.get("/countFaculty", countFaculty);
router.get("/countStudents", countStudents);

module.exports = router;
