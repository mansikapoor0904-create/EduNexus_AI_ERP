

const db = require("../config/db");

// ============================================
// GET ALL STUDENTS
// ============================================

const getStudents = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;

    if (!institutionId) {
      return res.status(400).json({
        success: false,
        message: "Institution information is missing.",
      });
    }

    const result = await db.query(
      `
      SELECT
        s.id,
        s.student_id,
        s.course,
        s.department,
        s.semester,
        s.phone,
        s.date_of_birth,
        s.created_at,

        u.id AS user_id,
        u.name,
        u.email,
        u.status,
        u.email_verified,
        u.created_at AS user_created_at

      FROM students s

      INNER JOIN users u
        ON u.id = s.user_id

      WHERE s.institution_id = $1
        AND u.role = 'student'

      ORDER BY s.created_at DESC
      `,
      [institutionId]
    );

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      students: result.rows,
    });
  } catch (error) {
    console.error(
      "Get students error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch students.",
    });
  }
};

// ============================================
// GET SINGLE STUDENT
// ============================================

const getStudentById = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;
    const studentId = req.params.id;

    const result = await db.query(
      `
      SELECT
        s.id,
        s.student_id,
        s.course,
        s.department,
        s.semester,
        s.phone,
        s.date_of_birth,

        u.id AS user_id,
        u.name,
        u.email,
        u.status,
        u.email_verified,
        u.created_at

      FROM students s

      INNER JOIN users u
        ON u.id = s.user_id

      WHERE s.id = $1
        AND s.institution_id = $2
        AND u.role = 'student'
      `,
      [studentId, institutionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(200).json({
      success: true,
      student: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Get student error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch student.",
    });
  }
};

// ============================================
// UPDATE STUDENT
// ============================================

const updateStudent = async (req, res) => {
  const client = await db.pool.connect();

  try {
    const institutionId = req.user.institutionId;
    const studentId = req.params.id;

    const {
      name,
      email,
      student_id,
      phone,
      course,
      department,
      semester,
      date_of_birth,
    } = req.body;

    if (!institutionId) {
      return res.status(400).json({
        success: false,
        message: "Institution information is missing.",
      });
    }

    // -------- VALIDATION --------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student email is required.",
      });
    }

    if (!student_id || !student_id.trim()) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Semester validation
    let normalizedSemester = null;

    if (
      semester !== null &&
      semester !== undefined &&
      semester !== ""
    ) {
      normalizedSemester = Number(semester);

      if (
        !Number.isInteger(normalizedSemester) ||
        normalizedSemester <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Semester must be a positive whole number.",
        });
      }
    }

    await client.query("BEGIN");

    // -------- FIND STUDENT --------

    const studentResult = await client.query(
      `
      SELECT
        s.id,
        s.user_id,
        s.student_id,
        u.email
      FROM students s
      INNER JOIN users u
        ON u.id = s.user_id
      WHERE s.id = $1
        AND s.institution_id = $2
        AND u.role = 'student'
      FOR UPDATE
      `,
      [studentId, institutionId]
    );

    if (studentResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const existingStudent =
      studentResult.rows[0];

    // -------- CHECK DUPLICATE STUDENT ID --------

    const duplicateStudentId =
      await client.query(
        `
        SELECT id
        FROM students
        WHERE institution_id = $1
          AND student_id = $2
          AND id <> $3
        LIMIT 1
        `,
        [
          institutionId,
          student_id.trim(),
          studentId,
        ]
      );

    if (duplicateStudentId.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        message:
          "This Student ID is already used by another student.",
      });
    }

    // -------- CHECK DUPLICATE EMAIL --------

    const duplicateEmail =
      await client.query(
        `
        SELECT id
        FROM users
        WHERE LOWER(email) = LOWER($1)
          AND id <> $2
        LIMIT 1
        `,
        [
          email.trim(),
          existingStudent.user_id,
        ]
      );

    if (duplicateEmail.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        message:
          "This email address is already used by another account.",
      });
    }

    // -------- UPDATE USER --------

    await client.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      `,
      [
        name.trim(),
        email.trim().toLowerCase(),
        existingStudent.user_id,
      ]
    );

    // -------- UPDATE STUDENT --------

    await client.query(
      `
      UPDATE students
      SET
        student_id = $1,
        phone = $2,
        course = $3,
        department = $4,
        semester = $5,
        date_of_birth = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
        AND institution_id = $8
      `,
      [
        student_id.trim(),
        phone?.trim() || null,
        course?.trim() || null,
        department?.trim() || null,
        normalizedSemester,
        date_of_birth || null,
        studentId,
        institutionId,
      ]
    );

    // -------- AUDIT LOG --------

    await client.query(
      `
      INSERT INTO audit_logs (
        user_id,
        institution_id,
        action,
        entity_type,
        entity_id,
        ip_address,
        user_agent,
        metadata
      )
      VALUES (
        $1,
        $2,
        'update_student',
        'student',
        $3,
        $4,
        $5,
        $6
      )
      `,
      [
        req.user.id,
        institutionId,
        studentId,
        req.ip || null,
        req.get("user-agent") || null,
        JSON.stringify({
          studentId: student_id.trim(),
          email: email.trim().toLowerCase(),
        }),
      ]
    );

    await client.query("COMMIT");

    // -------- RETURN UPDATED STUDENT --------

    const updatedStudent =
      await db.query(
        `
        SELECT
          s.id,
          s.student_id,
          s.course,
          s.department,
          s.semester,
          s.phone,
          s.date_of_birth,

          u.id AS user_id,
          u.name,
          u.email,
          u.status,
          u.email_verified,
          u.created_at

        FROM students s

        INNER JOIN users u
          ON u.id = s.user_id

        WHERE s.id = $1
          AND s.institution_id = $2
          AND u.role = 'student'
        `,
        [studentId, institutionId]
      );

    return res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      student: updatedStudent.rows[0],
    });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error(
        "Rollback error:",
        rollbackError
      );
    }

    console.error(
      "Update student error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update student.",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
};