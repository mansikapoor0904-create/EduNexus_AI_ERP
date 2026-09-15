require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();


// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    credentials: true,
  })
);


// ==========================================
// JSON BODY PARSER
// ==========================================

app.use(express.json());


// ==========================================
// URL ENCODED DATA
// ==========================================

app.use(express.urlencoded({ extended: true }));


// ==========================================
// RATE LIMITING
// ==========================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);


// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EduNexus AI ERP backend is running.",
  });
});


// ==========================================
// HEALTH CHECK API
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EduNexus AI ERP backend is healthy.",
    status: "OK",
  });
});


// ==========================================
// 404 ROUTE
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});


// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `EduNexus AI ERP backend running on http://localhost:${PORT}`
  );
});