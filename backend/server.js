require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const db = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();


// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
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

app.get("/api/health", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT current_database() AS database, NOW() AS server_time"
    );

    res.json({
      success: true,
      message: "EduNexus AI ERP backend is healthy.",
      status: "OK",
      database: result.rows[0].database,
      databaseConnected: true,
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Backend is running, but database connection failed.",
      databaseConnected: false,
    });
  }
});


// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);


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