const db = require("../config/db");

const getStudents = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;

    const { rows } = await db.query(
      `SELECT
         s.id,
         s.student_id,
         s.course,
         s.department,
         s.semester,
         s.phone,
         s.date_of_birth,
         u.name,
         u.email,
         u.status,
         u.email_verified
       FROM students s
       JOIN users u ON u.id = s.user_id
       WHERE s.institution_id = $1
       ORDER BY s.created_at DESC`,
      [institutionId]
    );

    return res.json({ success: true, students: rows });
  } catch (error) {
    console.error("getStudents error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch students.",
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;
    const { id } = req.params;

    const { rows } = await db.query(
      `SELECT
         s.*,
         u.name, u.email, u.status, u.email_verified
       FROM students s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = $1 AND s.institution_id = $2`,
      [id, institutionId]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.json({ success: true, student: rows[0] });
  } catch (error) {
    console.error("getStudentById error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch student.",
    });
  }
};

const updateStudent = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const institutionId = req.user.institutionId;
    const { id } = req.params;
    const { name, email, student_id, phone, course, department, semester, date_of_birth } = req.body;

    await client.query("BEGIN");

    // Verify the student belongs to this institution
    const owner = await client.query(
      `SELECT user_id FROM students WHERE id = $1 AND institution_id = $2`,
      [id, institutionId]
    );

    if (!owner.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const userId = owner.rows[0].user_id;

    // Update users table
    await client.query(
      `UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3`,
      [name, email, userId]
    );

    // Update students table
    await client.query(
      `UPDATE students
          SET student_id = $1,
              phone = $2,
              course = $3,
              department = $4,
              semester = $5,
              date_of_birth = $6,
              updated_at = NOW()
        WHERE id = $7 AND institution_id = $8`,
      [student_id, phone, course, department, semester, date_of_birth, id, institutionId]
    );

    await client.query("COMMIT");

    // Return updated row
    const { rows } = await db.query(
      `SELECT s.*, u.name, u.email, u.status, u.email_verified
         FROM students s JOIN users u ON u.id = s.user_id
        WHERE s.id = $1`,
      [id]
    );

    return res.json({ success: true, student: rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("updateStudent error:", error);
    return res.status(500).json({ success: false, message: "Unable to update student." });
  } finally {
    client.release();
  }
};

module.exports = { getStudents, getStudentById, updateStudent };