

const express = require("express");

const {
  getStudents,
  getStudentById,
  updateStudent,
} = require("../controllers/student.controller");

const {
  authenticateToken,
  requireRole,
} = require("../middleware/auth.middleware");

const router = express.Router();

// ============================================
// GET ALL STUDENTS
// ============================================

router.get(
  "/",
  authenticateToken,
  requireRole("manager", "admin"),
  getStudents
);

// ============================================
// GET SINGLE STUDENT
// ============================================

router.get(
  "/:id",
  authenticateToken,
  requireRole("manager", "admin"),
  getStudentById
);

// ============================================
// UPDATE STUDENT
// ============================================

router.put(
  "/:id",
  authenticateToken,
  requireRole("manager", "admin"),
  updateStudent
);

module.exports = router;