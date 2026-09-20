

const express = require("express");
const multer = require("multer");

const {
  previewImport,
  commitImport,
} = require("../controllers/import.controller");

const {
  authenticateToken,
  requireRole,
} = require("../middleware/auth.middleware");

const router = express.Router();

// ============================================
// Multer configuration
// ============================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".xlsx",
      ".csv",
    ];

    const originalName =
      file.originalname.toLowerCase();

    const isAllowed =
      allowedExtensions.some(
        (extension) =>
          originalName.endsWith(
            extension
          )
      );

    if (!isAllowed) {
      return cb(
        new Error(
          "Only .xlsx and .csv files are allowed."
        )
      );
    }

    cb(null, true);
  },
});

// ============================================
// Preview
// ============================================

router.post(
  "/preview",
  authenticateToken,
  requireRole("manager", "admin"),
  upload.single("file"),
  previewImport
);

// ============================================
// Confirm / Commit
// ============================================

router.post(
  "/commit",
  authenticateToken,
  requireRole("manager", "admin"),
  upload.single("file"),
  commitImport
);

module.exports = router;