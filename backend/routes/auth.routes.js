const express = require("express");

const {
  registerStudent,
  login,
  refresh,
  logout,
  logoutAll,
  me,
} = require("../controllers/auth.controller");

const {
  authenticateToken,
} = require("../middleware/auth.middleware");

const router = express.Router();

// ---------------------------------------------------------
// Public authentication routes
// ---------------------------------------------------------

router.post("/register/student", registerStudent);

router.post("/login", login);

router.post("/refresh", refresh);

router.post("/logout", logout);

// ---------------------------------------------------------
// Protected authentication routes
// ---------------------------------------------------------

router.post(
  "/logout-all",
  authenticateToken,
  logoutAll
);

router.get(
  "/me",
  authenticateToken,
  me
);

module.exports = router;