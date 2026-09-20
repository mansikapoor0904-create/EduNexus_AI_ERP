const db = require("../config/db");

// ==========================================
// GET ALL FACULTY
// ==========================================

const getFaculty = async (req, res) => {
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
        f.id,
        f.employee_id,
        f.department,
        f.designation,
        f.phone,
        f.date_of_birth,
        f.created_at,

        u.id AS user_id,
        u.name,
        u.email,
        u.status,
        u.email_verified,
        u.created_at AS user_created_at

      FROM faculty f

      INNER JOIN users u
        ON u.id = f.user_id

      WHERE f.institution_id = $1
        AND u.role = 'faculty'

      ORDER BY f.created_at DESC
      `,
      [institutionId]
    );

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      faculty: result.rows,
    });
  } catch (error) {
    console.error(
      "Get faculty error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch faculty.",
    });
  }
};

// ==========================================
// GET FACULTY BY ID
// ==========================================

const getFacultyById = async (req, res) => {
  try {
    const institutionId =
      req.user.institutionId;

    const facultyId = req.params.id;

    if (!institutionId) {
      return res.status(400).json({
        success: false,
        message: "Institution information is missing.",
      });
    }

    const result = await db.query(
      `
      SELECT
        f.id,
        f.employee_id,
        f.department,
        f.designation,
        f.phone,
        f.date_of_birth,

        u.id AS user_id,
        u.name,
        u.email,
        u.status,
        u.email_verified,
        u.created_at

      FROM faculty f

      INNER JOIN users u
        ON u.id = f.user_id

      WHERE f.id = $1
        AND f.institution_id = $2
        AND u.role = 'faculty'
      `,
      [facultyId, institutionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Faculty member not found.",
      });
    }

    return res.status(200).json({
      success: true,
      faculty: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Get faculty by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch faculty member.",
    });
  }
};

// ==========================================
// UPDATE FACULTY
// ==========================================

const updateFaculty = async (req, res) => {
  const client = await db.pool.connect();

  try {
    const institutionId =
      req.user.institutionId;

    const facultyId = req.params.id;

    const {
      name,
      email,
      employee_id,
      department,
      designation,
      phone,
      date_of_birth,
    } = req.body;

    if (!institutionId) {
      return res.status(400).json({
        success: false,
        message: "Institution information is missing.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Faculty name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Faculty email is required.",
      });
    }

    if (!employee_id || !employee_id.trim()) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required.",
      });
    }

    await client.query("BEGIN");

    // ------------------------------------------
    // Find faculty
    // ------------------------------------------

    const facultyResult = await client.query(
      `
      SELECT
        f.id,
        f.user_id
      FROM faculty f

      INNER JOIN users u
        ON u.id = f.user_id

      WHERE f.id = $1
        AND f.institution_id = $2
        AND u.role = 'faculty'
      `,
      [facultyId, institutionId]
    );

    if (facultyResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Faculty member not found.",
      });
    }

    const userId =
      facultyResult.rows[0].user_id;

    // ------------------------------------------
    // Check duplicate email
    // ------------------------------------------

    const emailCheck = await client.query(
      `
      SELECT id
      FROM users
      WHERE LOWER(email) = LOWER($1)
        AND id <> $2
      `,
      [
        email.trim().toLowerCase(),
        userId,
      ]
    );

    if (emailCheck.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        message:
          "This email address is already registered.",
      });
    }

    // ------------------------------------------
    // Check duplicate employee ID
    // ------------------------------------------

    const employeeCheck =
      await client.query(
        `
        SELECT id
        FROM faculty
        WHERE institution_id = $1
          AND LOWER(employee_id) =
              LOWER($2)
          AND id <> $3
        `,
        [
          institutionId,
          employee_id.trim(),
          facultyId,
        ]
      );

    if (employeeCheck.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(409).json({
        success: false,
        message:
          "This Employee ID already exists.",
      });
    }

    // ------------------------------------------
    // Update users table
    // ------------------------------------------

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
        userId,
      ]
    );

    // ------------------------------------------
    // Update faculty table
    // ------------------------------------------

    await client.query(
      `
      UPDATE faculty
      SET
        employee_id = $1,
        department = $2,
        designation = $3,
        phone = $4,
        date_of_birth = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
        AND institution_id = $7
      `,
      [
        employee_id.trim(),
        department?.trim() || null,
        designation?.trim() || null,
        phone?.trim() || null,
        date_of_birth || null,
        facultyId,
        institutionId,
      ]
    );

    // ------------------------------------------
    // Return updated faculty
    // ------------------------------------------

    const updatedResult =
      await client.query(
        `
        SELECT
          f.id,
          f.employee_id,
          f.department,
          f.designation,
          f.phone,
          f.date_of_birth,

          u.id AS user_id,
          u.name,
          u.email,
          u.status,
          u.email_verified,
          u.created_at

        FROM faculty f

        INNER JOIN users u
          ON u.id = f.user_id

        WHERE f.id = $1
          AND f.institution_id = $2
        `,
        [facultyId, institutionId]
      );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Faculty updated successfully.",
      faculty: updatedResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "Update faculty error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update faculty.",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getFaculty,
  getFacultyById,
  updateFaculty,
};