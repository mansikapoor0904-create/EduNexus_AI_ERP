const bcrypt = require("bcrypt");
const db = require("../config/db");

const registerStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    institutionCode,
    studentId,
    course,
    department,
    semester,
    phone,
    dateOfBirth,
  } = req.body;

  // 1. Validate required fields
  if (!name || !email || !password || !institutionCode || !studentId) {
    return res.status(400).json({
      success: false,
      message:
        "Name, email, password, institution code and student ID are required.",
    });
  }

  // 2. Validate password
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedInstitutionCode = institutionCode.trim().toUpperCase();
  const normalizedStudentId = studentId.trim();

  let client;

  try {
    // 3. Find institution
    const institutionResult = await db.query(
      `
      SELECT id, name, status
      FROM institutions
      WHERE institution_code = $1
      `,
      [normalizedInstitutionCode]
    );

    if (institutionResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Institution code is not valid.",
      });
    }

    const institution = institutionResult.rows[0];

    // Only active institutions can accept student registrations
    if (institution.status !== "active") {
      return res.status(403).json({
        success: false,
        message:
          "This institution is not currently active. Please contact your institution administrator.",
      });
    }

    // 4. Check whether email already exists
    const emailResult = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [normalizedEmail]
    );

    if (emailResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // 5. Check whether Student ID already exists
    const studentResult = await db.query(
      `
      SELECT id
      FROM students
      WHERE institution_id = $1
      AND student_id = $2
      `,
      [institution.id, normalizedStudentId]
    );

    if (studentResult.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This student ID is already registered.",
      });
    }

    // 6. Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // 7. Start transaction
    client = await db.pool.connect();

    try {
      await client.query("BEGIN");

      // 8. Create user
      const userResult = await client.query(
        `
        INSERT INTO users (
          name,
          email,
          password_hash,
          role,
          status,
          email_verified,
          two_factor_enabled
        )
        VALUES (
          $1,
          $2,
          $3,
          'student',
          'pending',
          FALSE,
          FALSE
        )
        RETURNING id, name, email, role, status
        `,
        [name.trim(), normalizedEmail, passwordHash]
      );

      const user = userResult.rows[0];

      // 9. Create student profile
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          user.id,
          institution.id,
          normalizedStudentId,
          course || null,
          department || null,
          semester || null,
          phone || null,
          dateOfBirth || null,
        ]
      );

      // 10. Commit transaction
      await client.query("COMMIT");

      return res.status(201).json({
        success: true,
        message:
          "Student account created successfully. Email verification is required.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
        institution: {
          id: institution.id,
          name: institution.name,
        },
      });
    } catch (transactionError) {
      await client.query("ROLLBACK");
      throw transactionError;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Student registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create student account.",
    });
  }
};

module.exports = {
  registerStudent,
};