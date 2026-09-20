
const db = require("../config/db");
const bcrypt = require("bcrypt");

const {
  parseUploadedFile,
  validateRows,
} = require("../services/importService");

// ============================================
// Preview Import
// ============================================

const previewImport = async (req, res) => {
  try {
    const { type } = req.body;

    if (type !== "student" && type !== "faculty") {
      return res.status(400).json({
        success: false,
        message: "Import type must be student or faculty.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an Excel or CSV file.",
      });
    }

    const result = parseUploadedFile(req.file);

    const validation = validateRows(
      type,
      result.rows
    );

    return res.json({
      success: true,
      message: "File processed successfully.",

      type,

      file: {
        name: req.file.originalname,
        extension: result.extension,
        size: req.file.size,
      },

      summary: {
        totalRows: result.rows.length,
        previewRows: Math.min(
          result.rows.length,
          10
        ),
        valid: validation.valid,
        errorCount: validation.errors.length,
      },

      columns:
        result.rows.length > 0
          ? Object.keys(result.rows[0])
          : [],

      preview: result.rows.slice(0, 10),

      errors: validation.errors.slice(0, 100),
    });
  } catch (error) {
    console.error(
      "Import preview error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Unable to process the uploaded file.",
    });
  }
};

// ============================================
// Commit Import
// ============================================

const commitImport = async (req, res) => {
  const client = await db.pool.connect();

  try {
    const { type } = req.body;

    // ----------------------------------------
    // Check import type
    // ----------------------------------------

    if (
      type !== "student" &&
      type !== "faculty"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Import type must be student or faculty.",
      });
    }

    // ----------------------------------------
    // Check uploaded file
    // ----------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload an Excel or CSV file.",
      });
    }

    // ----------------------------------------
    // Management institution
    // ----------------------------------------

    const institutionId =
      req.user.institutionId;

    if (!institutionId) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is not linked to an institution.",
      });
    }

    // ----------------------------------------
    // Parse file
    // ----------------------------------------

    const result =
      parseUploadedFile(req.file);

    const validation =
      validateRows(
        type,
        result.rows
      );

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message:
          "Import validation failed.",
        errors: validation.errors,
      });
    }

    // ----------------------------------------
    // Start transaction
    // ----------------------------------------

    await client.query("BEGIN");

    let imported = 0;
    const skipped = [];

    // ----------------------------------------
    // STUDENTS
    // ----------------------------------------

    if (type === "student") {
      for (const row of result.rows) {
        const studentId = String(
          row.student_id
        ).trim();

        const name = String(
          row.name
        ).trim();

        const email = String(
          row.email
        )
          .trim()
          .toLowerCase();

        // Check existing email
        const existingUser =
          await client.query(
            `
            SELECT id
            FROM users
            WHERE LOWER(email) = LOWER($1)
            `,
            [email]
          );

        if (
          existingUser.rows.length > 0
        ) {
          skipped.push({
            row: studentId,
            email,
            reason:
              "Email already exists.",
          });

          continue;
        }

        // Check existing student ID
        const existingStudent =
          await client.query(
            `
            SELECT id
            FROM students
            WHERE institution_id = $1
              AND student_id = $2
            `,
            [
              institutionId,
              studentId,
            ]
          );

        if (
          existingStudent.rows.length > 0
        ) {
          skipped.push({
            row: studentId,
            email,
            reason:
              "Student ID already exists.",
          });

          continue;
        }

        // ------------------------------------
        // Create random temporary password
        // ------------------------------------

        const temporaryPassword =
          `EduNexus@${Math.random()
            .toString(36)
            .slice(-10)}`;

        const passwordHash =
          await bcrypt.hash(
            temporaryPassword,
            12
          );

        // ------------------------------------
        // Create user
        // ------------------------------------

        const userResult =
          await client.query(
            `
            INSERT INTO users (
              name,
              email,
              password_hash,
              role,
              status,
              institution_id,
              email_verified,
              two_factor_enabled
            )
            VALUES (
              $1,
              $2,
              $3,
              'student',
              'pending',
              $4,
              false,
              false
            )
            RETURNING id
            `,
            [
              name,
              email,
              passwordHash,
              institutionId,
            ]
          );

        const userId =
          userResult.rows[0].id;

        // ------------------------------------
        // Create student
        // ------------------------------------

        await client.query(
          `
          INSERT INTO students (
            user_id,
            institution_id,
            student_id,
            course,
            department,
            semester,
            phone,
            date_of_birth
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
          )
          `,
          [
            userId,
            institutionId,
            studentId,
            row.course || null,
            row.department || null,
            row.semester
              ? Number(row.semester)
              : null,
            row.phone || null,
            row.date_of_birth || null,
          ]
        );

        imported++;
      }
    }

    // ----------------------------------------
    // FACULTY
    // ----------------------------------------

    if (type === "faculty") {
      for (const row of result.rows) {
        const employeeId = String(
          row.employee_id
        ).trim();

        const name = String(
          row.name
        ).trim();

        const email = String(
          row.email
        )
          .trim()
          .toLowerCase();

        // Check existing email
        const existingUser =
          await client.query(
            `
            SELECT id
            FROM users
            WHERE LOWER(email) = LOWER($1)
            `,
            [email]
          );

        if (
          existingUser.rows.length > 0
        ) {
          skipped.push({
            row: employeeId,
            email,
            reason:
              "Email already exists.",
          });

          continue;
        }

        // Check employee ID
        const existingFaculty =
          await client.query(
            `
            SELECT id
            FROM faculty
            WHERE institution_id = $1
              AND employee_id = $2
            `,
            [
              institutionId,
              employeeId,
            ]
          );

        if (
          existingFaculty.rows.length > 0
        ) {
          skipped.push({
            row: employeeId,
            email,
            reason:
              "Employee ID already exists.",
          });

          continue;
        }

        // ------------------------------------
        // Temporary password
        // ------------------------------------

        const temporaryPassword =
          `EduNexus@${Math.random()
            .toString(36)
            .slice(-10)}`;

        const passwordHash =
          await bcrypt.hash(
            temporaryPassword,
            12
          );

        // ------------------------------------
        // Create user
        // ------------------------------------

        const userResult =
          await client.query(
            `
            INSERT INTO users (
              name,
              email,
              password_hash,
              role,
              status,
              institution_id,
              email_verified,
              two_factor_enabled
            )
            VALUES (
              $1,
              $2,
              $3,
              'faculty',
              'pending',
              $4,
              false,
              false
            )
            RETURNING id
            `,
            [
              name,
              email,
              passwordHash,
              institutionId,
            ]
          );

        const userId =
          userResult.rows[0].id;

        // ------------------------------------
        // Create faculty
        // ------------------------------------

        await client.query(
          `
          INSERT INTO faculty (
            user_id,
            institution_id,
            employee_id,
            department,
            designation,
            phone,
            date_of_birth
          )
          VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )
          `,
          [
            userId,
            institutionId,
            employeeId,
            row.department || null,
            row.designation || null,
            row.phone || null,
            row.date_of_birth || null,
          ]
        );

        imported++;
      }
    }

    // ----------------------------------------
    // Commit transaction
    // ----------------------------------------

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,

      message:
        "Import completed successfully.",

      type,

      summary: {
        totalRows: result.rows.length,
        imported,
        skipped: skipped.length,
      },

      skipped,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "Import commit error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to import records.",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  previewImport,
  commitImport,
};