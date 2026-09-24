const express = require("express");

const {
  getFaculty,
  getFacultyById,
  updateFaculty,
  updateFacultyStatus,
} = require("../controllers/faculty.controller");

const {
  authenticateToken,
  requireRole,
} = require("../middleware/auth.middleware");

const router = express.Router();

// GET ALL FACULTY
router.get(
  "/",
  authenticateToken,
  requireRole("manager", "admin"),
  getFaculty
);

// GET FACULTY BY ID
router.get(
  "/:id",
  authenticateToken,
  requireRole("manager", "admin"),
  getFacultyById
);

// UPDATE FACULTY
router.put(
  "/:id",
  authenticateToken,
  requireRole("manager", "admin"),
  updateFaculty
);

module.exports = router;