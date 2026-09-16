const express = require("express");
const { registerStudent } = require("../controllers/auth.controller");

const router = express.Router();

// Student registration
router.post("/register/student", registerStudent);

module.exports = router;