const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());


app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  if (email === "admin@edunexus.com" && password === "123456") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: "EduNexus Admin",
        email: email,
        role: "admin"
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});


const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);



app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to EduNexus AI ERP API",
    version: "1.0.0",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EduNexus AI backend is running",
    status: "healthy",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  // Temporary login test
  if (email === "admin@edunexus.com" && password === "123456") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: "EduNexus Admin",
        email: email,
        role: "admin"
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`EduNexus AI Backend running on http://localhost:${PORT}`);
});