const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/management.controller");

const {
  getStudents,
  getStudentById,
  updateStudent,
} = require("../controllers/student.controller");

const {
  getFaculty,
  getFacultyById,
  updateFaculty,
} = require("../controllers/faculty.controller");

const {
  authenticateToken,
  requireRole,
} = require("../middleware/auth.middleware");

// All management routes require an authenticated manager/admin
router.use(authenticateToken, requireRole("manager", "admin"));

// Dashboard
router.get("/dashboard", getDashboardStats);

// Students
router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);

// Faculty
router.get("/faculty", getFaculty);
router.get("/faculty/:id", getFacultyById);
router.put("/faculty/:id", updateFaculty);

module.exports = router;