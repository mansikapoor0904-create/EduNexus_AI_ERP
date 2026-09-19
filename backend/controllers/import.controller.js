// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");

// const db = require("../config/db");

// const {
//   parseUploadedFile,
//   validateRows,
// } = require("../services/importService");

// const {
//   hashToken,
// } = require("../services/authService");

// // ============================================
// // PREVIEW IMPORT
// // ============================================

// const previewImport = async (req, res) => {
//   try {
//     const { type } = req.body;

//     if (
//       type !== "student" &&
//       type !== "faculty"
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Import type must be student or faculty.",
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please upload an Excel or CSV file.",
//       });
//     }

//     const result = parseUploadedFile(req.file);

//     const validation = validateRows(
//       type,
//       result.rows
//     );

//     return res.json({
//       success: true,
//       message: "File processed successfully.",

//       type,

//       file: {
//         name: req.file.originalname,
//         extension: result.extension,
//         size: req.file.size,
//       },

//       summary: {
//         totalRows: result.rows.length,
//         previewRows: Math.min(
//           result.rows.length,
//           10
//         ),
//         valid: validation.valid,
//         errorCount: validation.errors.length,
//       },

//       columns:
//         result.rows.length > 0
//           ? Object.keys(result.rows[0])
//           : [],

//       preview: result.rows.slice(0, 10),

//       errors:
//         validation.errors.slice(0, 100),
//     });
//   } catch (error) {
//     console.error(
//       "Import preview error:",
//       error
//     );

//     return res.status(400).json({
//       success: false,
//       message:
//         error.message ||
//         "Unable to process the uploaded file.",
//     });
//   }
// };

// // ============================================
// // COMMIT IMPORT
// // ============================================

// const commitImport = async (req, res) => {
//   const client = await db.pool.connect();

//   try {
//     const { type } = req.body;

//     // ----------------------------------------
//     // Validate type
//     // ----------------------------------------

//     if (
//       type !== "student" &&
//       type !== "faculty"
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Import type must be student or faculty.",
//       });
//     }

//     // ----------------------------------------
//     // File required
//     // ----------------------------------------

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please upload the file again to confirm import.",
//       });
//     }

//     // ----------------------------------------
//     // Management must have institution
//     // ----------------------------------------

//     const institutionId =
//       req.user?.institutionId;

//     if (!institutionId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Your management account is not linked to an institution.",
//       });
//     }

//     // ----------------------------------------
//     // Check institution
//     // ----------------------------------------

//     const institutionResult =
//       await client.query(
//         `
//         SELECT id
//         FROM institutions
//         WHERE id = $1
//           AND status = 'active'
//         `,
//         [institutionId]
//       );

//     if (institutionResult.rowCount === 0) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Institution not found or inactive.",
//       });
//     }

//     // ----------------------------------------
//     // Parse file again
//     // Never trust frontend preview
//     // ----------------------------------------

//     const result = parseUploadedFile(
//       req.file
//     );

//     const validation = validateRows(
//       type,
//       result.rows
//     );

//     if (!validation.valid) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Import validation failed. Please correct the file.",
//         errors:
//           validation.errors.slice(0, 100),
//       });
//     }

//     // ----------------------------------------
//     // Start transaction
//     // ----------------------------------------

//     await client.query("BEGIN");

//     let importedCount = 0;

//     for (const row of result.rows) {
//       const email = String(
//         row.email || ""
//       )
//         .trim()
//         .toLowerCase();

//       const name = String(
//         row.name || ""
//       ).trim();

//       // --------------------------------------
//       // Check duplicate email
//       // --------------------------------------

//       const existingUser =
//         await client.query(
//           `
//           SELECT id
//           FROM users
//           WHERE LOWER(email) = LOWER($1)
//           `,
//           [email]
//         );

//       if (existingUser.rowCount > 0) {
//         throw new Error(
//           `Email already exists: ${email}`
//         );
//       }

//       // --------------------------------------
//       // STUDENT
//       // --------------------------------------

//       if (type === "student") {
//         const studentId = String(
//           row.student_id || ""
//         ).trim();

//         // Check student ID inside institution
//         const existingStudent =
//           await client.query(
//             `
//             SELECT id
//             FROM students
//             WHERE institution_id = $1
//               AND student_id = $2
//             `,
//             [
//               institutionId,
//               studentId,
//             ]
//           );

//         if (
//           existingStudent.rowCount > 0
//         ) {
//           throw new Error(
//             `Student ID already exists: ${studentId}`
//           );
//         }

//         // ------------------------------------
//         // Random temporary password
//         // User does not receive this password
//         // ------------------------------------

//         const temporaryPassword =
//           crypto.randomBytes(32).toString(
//             "hex"
//           );

//         const passwordHash =
//           await bcrypt.hash(
//             temporaryPassword,
//             12
//           );

//         // ------------------------------------
//         // Create user
//         // ------------------------------------

//         const userResult =
//           await client.query(
//             `
//             INSERT INTO users (
//               name,
//               email,
//               password_hash,
//               role,
//               status,
//               institution_id,
//               email_verified,
//               two_factor_enabled,
//               password_changed_at
//             )
//             VALUES (
//               $1,
//               $2,
//               $3,
//               'student',
//               'pending',
//               $4,
//               FALSE,
//               FALSE,
//               NULL
//             )
//             RETURNING id
//             `,
//             [
//               name,
//               email,
//               passwordHash,
//               institutionId,
//             ]
//           );

//         const userId =
//           userResult.rows[0].id;

//         // ------------------------------------
//         // Create student profile
//         // ------------------------------------

//         await client.query(
//           `
//           INSERT INTO students (
//             user_id,
//             institution_id,
//             student_id,
//             course,
//             department,
//             semester,
//             phone
//           )
//           VALUES (
//             $1,
//             $2,
//             $3,
//             $4,
//             $5,
//             $6,
//             $7
//           )
//           `,
//           [
//             userId,
//             institutionId,
//             studentId,
//             row.course || null,
//             row.department || null,
//             row.semester
//               ? Number(row.semester)
//               : null,
//             row.phone || null,
//           ]
//         );

//         // ------------------------------------
//         // Create invitation
//         // ------------------------------------

//         const invitationToken =
//           crypto.randomBytes(32).toString(
//             "hex"
//           );

//         const invitationHash =
//           hashToken(
//             invitationToken
//           );

//         await client.query(
//           `
//           INSERT INTO invitations (
//             id,
//             institution_id,
//             email,
//             role,
//             reference_id,
//             token_hash,
//             expires_at,
//             created_by
//           )
//           VALUES (
//             $1,
//             $2,
//             $3,
//             'student',
//             $4,
//             $5,
//             CURRENT_TIMESTAMP + INTERVAL '7 days',
//             $6
//           )
//           `,
//           [
//             crypto.randomUUID(),
//             institutionId,
//             email,
//             studentId,
//             invitationHash,
//             req.user.id,
//           ]
//         );
//       }

//       // --------------------------------------
//       // FACULTY
//       // --------------------------------------

//       if (type === "faculty") {
//         const employeeId = String(
//           row.employee_id || ""
//         ).trim();

//         const existingFaculty =
//           await client.query(
//             `
//             SELECT id
//             FROM faculty
//             WHERE institution_id = $1
//               AND employee_id = $2
//             `,
//             [
//               institutionId,
//               employeeId,
//             ]
//           );

//         if (
//           existingFaculty.rowCount > 0
//         ) {
//           throw new Error(
//             `Employee ID already exists: ${employeeId}`
//           );
//         }

//         const temporaryPassword =
//           crypto.randomBytes(32).toString(
//             "hex"
//           );

//         const passwordHash =
//           await bcrypt.hash(
//             temporaryPassword,
//             12
//           );

//         // ------------------------------------
//         // Create user
//         // ------------------------------------

//         const userResult =
//           await client.query(
//             `
//             INSERT INTO users (
//               name,
//               email,
//               password_hash,
//               role,
//               status,
//               institution_id,
//               email_verified,
//               two_factor_enabled,
//               password_changed_at
//             )
//             VALUES (
//               $1,
//               $2,
//               $3,
//               'faculty',
//               'pending',
//               $4,
//               FALSE,
//               FALSE,
//               NULL
//             )
//             RETURNING id
//             `,
//             [
//               name,
//               email,
//               passwordHash,
//               institutionId,
//             ]
//           );

//         const userId =
//           userResult.rows[0].id;

//         // ------------------------------------
//         // Create faculty profile
//         // ------------------------------------

//         await client.query(
//           `
//           INSERT INTO faculty (
//             user_id,
//             institution_id,
//             employee_id,
//             department,
//             designation,
//             phone
//           )
//           VALUES (
//             $1,
//             $2,
//             $3,
//             $4,
//             $5,
//             $6
//           )
//           `,
//           [
//             userId,
//             institutionId,
//             employeeId,
//             row.department || null,
//             row.designation || null,
//             row.phone || null,
//           ]
//         );

//         // ------------------------------------
//         // Create invitation
//         // ------------------------------------

//         const invitationToken =
//           crypto.randomBytes(32).toString(
//             "hex"
//           );

//         const invitationHash =
//           hashToken(
//             invitationToken
//           );

//         await client.query(
//           `
//           INSERT INTO invitations (
//             id,
//             institution_id,
//             email,
//             role,
//             reference_id,
//             token_hash,
//             expires_at,
//             created_by
//           )
//           VALUES (
//             $1,
//             $2,
//             $3,
//             'faculty',
//             $4,
//             $5,
//             CURRENT_TIMESTAMP + INTERVAL '7 days',
//             $6
//           )
//           `,
//           [
//             crypto.randomUUID(),
//             institutionId,
//             email,
//             employeeId,
//             invitationHash,
//             req.user.id,
//           ]
//         );
//       }

//       importedCount++;
//     }

//     // ----------------------------------------
//     // Audit log
//     // ----------------------------------------

//     await client.query(
//       `
//       INSERT INTO audit_logs (
//         user_id,
//         institution_id,
//         action,
//         entity_type,
//         metadata,
//         ip_address,
//         user_agent
//       )
//       VALUES (
//         $1,
//         $2,
//         $3,
//         $4,
//         $5,
//         $6,
//         $7
//       )
//       `,
//       [
//         req.user.id,
//         institutionId,
//         "data_import",
//         type,
//         JSON.stringify({
//           importedCount,
//           filename:
//             req.file.originalname,
//         }),
//         req.ip,
//         req.get("user-agent") || null,
//       ]
//     );

//     // ----------------------------------------
//     // Commit transaction
//     // ----------------------------------------

//     await client.query("COMMIT");

//     return res.status(201).json({
//       success: true,
//       message:
//         `${importedCount} ${type} records imported successfully.`,
//       importedCount,
//       type,
//     });
//   } catch (error) {
//     // ----------------------------------------
//     // Rollback
//     // ----------------------------------------

//     await client.query("ROLLBACK");

//     console.error(
//       "Import commit error:",
//       error
//     );

//     return res.status(400).json({
//       success: false,
//       message:
//         error.message ||
//         "Import failed. No records were imported.",
//     });
//   } finally {
//     client.release();
//   }
// };

// module.exports = {
//   previewImport,
//   commitImport,
// };
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