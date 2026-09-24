const db = require("../config/db");

// GET /api/management/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const institutionId = req.user.institutionId;

    if (!institutionId) {
      return res.status(400).json({
        success: false,
        message: "Your account is not linked to an institution.",
      });
    }

    const sql = `
      SELECT
        (SELECT COUNT(*) FROM students
          WHERE institution_id = $1) AS total_students,

        (SELECT COUNT(*) FROM faculty
          WHERE institution_id = $1) AS total_faculty,

        (SELECT COUNT(*) FROM students
          WHERE institution_id = $1 AND user_id IN (
            SELECT id FROM users WHERE status = 'active'
          )) AS active_students,

        (SELECT COUNT(*) FROM faculty
          WHERE institution_id = $1 AND user_id IN (
            SELECT id FROM users WHERE status = 'active'
          )) AS active_faculty,

        (SELECT COUNT(DISTINCT department) FROM students
          WHERE institution_id = $1 AND department IS NOT NULL) AS total_departments
    `;

    const { rows } = await db.query(sql, [institutionId]);
    const stats = rows[0];

    // Department breakdown for the dashboard chart
    const deptRes = await db.query(
      `SELECT department, COUNT(*)::int AS count
         FROM students
        WHERE institution_id = $1 AND department IS NOT NULL
        GROUP BY department
        ORDER BY count DESC
        LIMIT 10`,
      [institutionId]
    );

    // Recent imports/activity placeholder — counts only (extend later)
    const recentRes = await db.query(
      `SELECT
         (SELECT COUNT(*) FROM students
           WHERE institution_id = $1
             AND created_at > NOW() - INTERVAL '7 days') AS new_students_7d,
         (SELECT COUNT(*) FROM faculty
           WHERE institution_id = $1
             AND created_at > NOW() - INTERVAL '7 days') AS new_faculty_7d`,
      [institutionId]
    );

    return res.json({
      success: true,
      data: {
        totalStudents: Number(stats.total_students),
        totalFaculty: Number(stats.total_faculty),
        activeStudents: Number(stats.active_students),
        activeFaculty: Number(stats.active_faculty),
        totalDepartments: Number(stats.total_departments),
        newStudents7d: Number(recentRes.rows[0].new_students_7d),
        newFaculty7d: Number(recentRes.rows[0].new_faculty_7d),
        departmentBreakdown: deptRes.rows,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard statistics.",
    });
  }
};

module.exports = { getDashboardStats };