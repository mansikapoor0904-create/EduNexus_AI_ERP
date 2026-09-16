const express = require("express");
const { registerStudent } = require("../controllers/auth.controller");

const router = express.Router();

// ==========================================
// STUDENT REGISTRATION
// ==========================================

router.post("/register/student", registerStudent);

module.exports = router;