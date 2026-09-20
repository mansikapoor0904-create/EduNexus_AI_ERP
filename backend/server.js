

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const db = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const importRoutes = require("./routes/import.routes");
const studentRoutes = require("./routes/student.routes");
const facultyRoutes = require("./routes/faculty.routes");

const app = express();

/* =========================================================
   CORS
========================================================= */

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

/* =========================================================
   Body Parsers
========================================================= */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================================================
   API Rate Limiting
========================================================= */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 200,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

/* =========================================================
   Root Route
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "EduNexus AI ERP backend is running.",
  });
});

/* =========================================================
   Health Check
========================================================= */

app.get("/api/health", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT current_database() AS database, NOW() AS server_time"
    );

    res.json({
      success: true,

      message:
        "EduNexus AI ERP backend is healthy.",

      status: "OK",

      database:
        result.rows[0].database,

      databaseConnected: true,

      serverTime:
        result.rows[0].server_time,
    });
  } catch (error) {
    console.error(
      "Database health check failed:",
      error.message
    );

    res.status(500).json({
      success: false,

      message:
        "Backend is running, but database connection failed.",

      databaseConnected: false,
    });
  }
});

/* =========================================================
   Authentication Routes
========================================================= */

app.use(
  "/api/auth",
  authRoutes
);

/* =========================================================
   Management Import Routes
========================================================= */

app.use(
  "/api/management/import",
  importRoutes
);

app.use(
  "/api/management/students",
  studentRoutes
);

app.use(
  "/api/management/faculty",
  facultyRoutes
);

/* =========================================================
   404 Handler
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

/* =========================================================
   Global Error Handler
========================================================= */

app.use(
  (error, req, res, next) => {
    console.error(
      "Server error:",
      error
    );

    if (res.headersSent) {
      return next(error);
    }

    res.status(
      error.status || 500
    ).json({
      success: false,

      message:
        error.message ||
        "Internal server error.",
    });
  }
);

/* =========================================================
   Start Server
========================================================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `EduNexus AI ERP backend running on http://localhost:${PORT}`
  );
});