const bcrypt = require("bcrypt");
const db = require("../config/db");

const {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  getSessionDuration,
} = require("../services/authService");

// ---------------------------------------------------------
// Cookie helpers
// ---------------------------------------------------------

const isProduction = process.env.NODE_ENV === "production";

const getCookieOptions = (rememberMe = false) => {
  const options = [
    "HttpOnly",
    "Path=/",
    `SameSite=${isProduction ? "Strict" : "Lax"}`,
  ];

  if (isProduction) {
    options.push("Secure");
  }

  if (rememberMe) {
    const maxAge = getSessionDuration(true);
    options.push(`Max-Age=${Math.floor(maxAge / 1000)}`);
  }

  return options.join("; ");
};

const setRefreshCookie = (res, refreshToken, rememberMe) => {
  res.setHeader(
    "Set-Cookie",
    `edunexus_refresh=${refreshToken}; ${getCookieOptions(rememberMe)}`
  );
};

const clearRefreshCookie = (res) => {
  res.setHeader(
    "Set-Cookie",
    `edunexus_refresh=; HttpOnly; Path=/; Max-Age=0; SameSite=${
      isProduction ? "Strict" : "Lax"
    }${isProduction ? "; Secure" : ""}`
  );
};

const getRefreshTokenFromRequest = (req) => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return null;
  }

  const cookies = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...valueParts] = cookie.trim().split("=");

    if (name) {
      cookies[name] = valueParts.join("=");
    }
  });

  return cookies.edunexus_refresh || null;
};

// ---------------------------------------------------------
// Audit log
// ---------------------------------------------------------

const createAuditLog = async ({
  userId = null,
  institutionId = null,
  action,
  entityType = null,
  entityId = null,
  req,
  metadata = null,
}) => {
  try {
    await db.query(
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        userId,
        institutionId,
        action,
        entityType,
        entityId,
        req.ip || null,
        req.get("user-agent") || null,
        metadata,
      ]
    );
  } catch (error) {
    // Audit logging should not break authentication.
    console.error("Audit log error:", error.message);
  }
};

// ---------------------------------------------------------
// Student Registration
// ---------------------------------------------------------

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

  if (!name || !email || !password || !institutionCode || !studentId) {
    return res.status(400).json({
      success: false,
      message:
        "Name, email, password, institution code and student ID are required.",
    });
  }

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

    if (institution.status !== "active") {
      return res.status(403).json({
        success: false,
        message:
          "This institution is not currently active. Please contact your institution administrator.",
      });
    }

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

    const passwordHash = await bcrypt.hash(password, 12);

    client = await db.pool.connect();

    try {
      await client.query("BEGIN");

      const userResult = await client.query(
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
          FALSE,
          FALSE
        )
        RETURNING id, name, email, role, status, institution_id
        `,
        [
          name.trim(),
          normalizedEmail,
          passwordHash,
          institution.id,
        ]
      );

      const user = userResult.rows[0];

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

      await client.query("COMMIT");

      await createAuditLog({
        userId: user.id,
        institutionId: institution.id,
        action: "STUDENT_REGISTERED",
        entityType: "student",
        entityId: String(user.id),
        req,
      });

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

// ---------------------------------------------------------
// LOGIN
// ---------------------------------------------------------

const login = async (req, res) => {
  const {
    identifier,
    email,
    password,
    role,
    rememberMe = false,
  } = req.body;

  const loginIdentifier = String(
    identifier || email || ""
  )
    .trim()
    .toLowerCase();

  const normalizedRole = String(role || "")
    .trim()
    .toLowerCase();

  const allowedRoles = ["student", "faculty", "management", "manager", "admin"];

  if (!loginIdentifier || !password || !normalizedRole) {
    return res.status(400).json({
      success: false,
      message: "Login identifier, password and role are required.",
    });
  }

  if (!allowedRoles.includes(normalizedRole)) {
    return res.status(400).json({
      success: false,
      message: "Invalid login role.",
    });
  }

  // UI calls Management; database uses manager.
  const databaseRole =
    normalizedRole === "management"
      ? "manager"
      : normalizedRole;

  try {
    /*
     * Search by:
     * 1. Email
     * 2. Student ID
     * 3. Employee ID
     *
     * IDs are institution-specific. If multiple records have
     * the same ID, login will fail safely and the user should
     * use their institutional email.
     */
    const result = await db.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.password_hash,
        u.role,
        u.status,
        u.institution_id,
        u.email_verified,
        u.two_factor_enabled,
        u.last_login_at,

        i.name AS institution_name,
        i.institution_code,

        s.student_id,
        f.employee_id

      FROM users u

      LEFT JOIN institutions i
        ON i.id = u.institution_id

      LEFT JOIN students s
        ON s.user_id = u.id

      LEFT JOIN faculty f
        ON f.user_id = u.id

      WHERE
        LOWER(u.email) = $1
        OR LOWER(s.student_id) = $1
        OR LOWER(f.employee_id) = $1
      `,
      [loginIdentifier]
    );

    // No account found
    if (result.rows.length === 0) {
      await db.query(
        `
        INSERT INTO login_attempts (
          identifier,
          ip_address,
          successful,
          failure_reason
        )
        VALUES ($1, $2, FALSE, $3)
        `,
        [
          loginIdentifier,
          req.ip || null,
          "ACCOUNT_NOT_FOUND",
        ]
      );

      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Ambiguous Student/Employee ID
    if (result.rows.length > 1) {
      await db.query(
        `
        INSERT INTO login_attempts (
          identifier,
          ip_address,
          successful,
          failure_reason
        )
        VALUES ($1, $2, FALSE, $3)
        `,
        [
          loginIdentifier,
          req.ip || null,
          "AMBIGUOUS_IDENTIFIER",
        ]
      );

      return res.status(401).json({
        success: false,
        message:
          "This ID is associated with multiple accounts. Please use your institutional email.",
      });
    }

    const user = result.rows[0];

    // Role mismatch
    if (user.role !== databaseRole) {
      await db.query(
        `
        INSERT INTO login_attempts (
          identifier,
          user_id,
          ip_address,
          successful,
          failure_reason
        )
        VALUES ($1, $2, $3, FALSE, $4)
        `,
        [
          loginIdentifier,
          user.id,
          req.ip || null,
          "ROLE_MISMATCH",
        ]
      );

      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Password verification
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      await db.query(
        `
        INSERT INTO login_attempts (
          identifier,
          user_id,
          ip_address,
          successful,
          failure_reason
        )
        VALUES ($1, $2, $3, FALSE, $4)
        `,
        [
          loginIdentifier,
          user.id,
          req.ip || null,
          "INVALID_PASSWORD",
        ]
      );

      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Account status
    if (user.status !== "active") {
      await db.query(
        `
        INSERT INTO login_attempts (
          identifier,
          user_id,
          ip_address,
          successful,
          failure_reason
        )
        VALUES ($1, $2, $3, FALSE, $4)
        `,
        [
          loginIdentifier,
          user.id,
          req.ip || null,
          `ACCOUNT_${String(user.status).toUpperCase()}`,
        ]
      );

      let message =
        "Your account is not currently active.";

      if (user.status === "pending") {
        message =
          "Your account is pending activation or email verification.";
      }

      if (user.status === "suspended") {
        message =
          "Your account has been suspended. Please contact your institution administrator.";
      }

      if (user.status === "inactive") {
        message =
          "Your account is inactive. Please contact your institution administrator.";
      }

      return res.status(403).json({
        success: false,
        message,
      });
    }

    /*
     * Email verification will be implemented in the OTP phase.
     * For now, existing active accounts can proceed.
     */

    const remember =
      rememberMe === true ||
      rememberMe === "true";

    // Create session
    const sessionId = cryptoRandomUUID();

    const refreshToken = generateRefreshToken();
    const refreshTokenHash = hashToken(refreshToken);

    const sessionDuration =
      getSessionDuration(remember);

    const expiresAt = new Date(
      Date.now() + sessionDuration
    );

    await db.query(
      `
      INSERT INTO sessions (
        id,
        user_id,
        refresh_token_hash,
        user_agent,
        ip_address,
        remember_me,
        expires_at,
        last_used_at
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        CURRENT_TIMESTAMP
      )
      `,
      [
        sessionId,
        user.id,
        refreshTokenHash,
        req.get("user-agent") || null,
        req.ip || null,
        remember,
        expiresAt,
      ]
    );

    // Update last login
    await db.query(
      `
      UPDATE users
      SET
        last_login_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [user.id]
    );

    // Log successful login
    await db.query(
      `
      INSERT INTO login_attempts (
        identifier,
        user_id,
        ip_address,
        successful,
        failure_reason
      )
      VALUES ($1, $2, $3, TRUE, NULL)
      `,
      [
        loginIdentifier,
        user.id,
        req.ip || null,
      ]
    );

    await createAuditLog({
      userId: user.id,
      institutionId: user.institution_id,
      action: "LOGIN_SUCCESS",
      entityType: "session",
      entityId: sessionId,
      req,
      metadata: {
        rememberMe: remember,
      },
    });

    // Set secure HttpOnly refresh cookie
    setRefreshCookie(
      res,
      refreshToken,
      remember
    );

    // Short-lived access token
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
      sessionId,
      institutionId: user.institution_id,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      accessToken,
      expiresIn:
        process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        institutionId: user.institution_id,
        institutionName: user.institution_name,
        institutionCode: user.institution_code,
        emailVerified: user.email_verified,
        twoFactorEnabled: user.two_factor_enabled,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process login.",
    });
  }
};

// ---------------------------------------------------------
// REFRESH ACCESS TOKEN
// ---------------------------------------------------------

const refresh = async (req, res) => {
  const refreshToken =
    getRefreshTokenFromRequest(req);

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh session not found.",
      code: "REFRESH_TOKEN_MISSING",
    });
  }

  try {
    const refreshTokenHash =
      hashToken(refreshToken);

    const result = await db.query(
      `
      SELECT
        s.id,
        s.user_id,
        s.remember_me,
        s.expires_at,
        u.name,
        u.email,
        u.role,
        u.status,
        u.institution_id,
        u.email_verified,
        u.two_factor_enabled
      FROM sessions s
      INNER JOIN users u
        ON u.id = s.user_id
      WHERE s.refresh_token_hash = $1
        AND s.revoked_at IS NULL
        AND s.expires_at > CURRENT_TIMESTAMP
      LIMIT 1
      `,
      [refreshTokenHash]
    );

    if (result.rows.length === 0) {
      clearRefreshCookie(res);

      return res.status(401).json({
        success: false,
        message: "Refresh session is invalid or expired.",
        code: "REFRESH_TOKEN_INVALID",
      });
    }

    const session = result.rows[0];

    if (session.status !== "active") {
      await db.query(
        `
        UPDATE sessions
        SET revoked_at = CURRENT_TIMESTAMP
        WHERE id = $1
        `,
        [session.id]
      );

      clearRefreshCookie(res);

      return res.status(403).json({
        success: false,
        message: "Your account is no longer active.",
      });
    }

    /*
     * Rotate refresh token.
     */
    const newRefreshToken =
      generateRefreshToken();

    const newRefreshTokenHash =
      hashToken(newRefreshToken);

    await db.query(
      `
      UPDATE sessions
      SET
        refresh_token_hash = $1,
        last_used_at = CURRENT_TIMESTAMP
      WHERE id = $2
      `,
      [
        newRefreshTokenHash,
        session.id,
      ]
    );

    setRefreshCookie(
      res,
      newRefreshToken,
      session.remember_me
    );

    const accessToken =
      generateAccessToken({
        userId: session.user_id,
        role: session.role,
        sessionId: session.id,
        institutionId: session.institution_id,
      });

    return res.status(200).json({
      success: true,
      accessToken,
      expiresIn:
        process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
      user: {
        id: session.user_id,
        name: session.name,
        email: session.email,
        role: session.role,
        status: session.status,
        institutionId: session.institution_id,
        emailVerified: session.email_verified,
        twoFactorEnabled: session.two_factor_enabled,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to refresh authentication session.",
    });
  }
};

// ---------------------------------------------------------
// LOGOUT CURRENT DEVICE
// ---------------------------------------------------------

const logout = async (req, res) => {
  const refreshToken =
    getRefreshTokenFromRequest(req);

  try {
    if (refreshToken) {
      const refreshTokenHash =
        hashToken(refreshToken);

      const result = await db.query(
        `
        UPDATE sessions
        SET revoked_at = CURRENT_TIMESTAMP
        WHERE refresh_token_hash = $1
        RETURNING id, user_id
        `,
        [refreshTokenHash]
      );

      if (result.rows.length > 0) {
        await createAuditLog({
          userId: result.rows[0].user_id,
          action: "LOGOUT",
          entityType: "session",
          entityId: result.rows[0].id,
          req,
        });
      }
    }

    clearRefreshCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Logout error:", error);

    clearRefreshCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  }
};

// ---------------------------------------------------------
// LOGOUT ALL DEVICES
// ---------------------------------------------------------

const logoutAll = async (req, res) => {
  try {
    await db.query(
      `
      UPDATE sessions
      SET revoked_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
        AND revoked_at IS NULL
      `,
      [req.user.id]
    );

    await createAuditLog({
      userId: req.user.id,
      institutionId: req.user.institutionId,
      action: "LOGOUT_ALL_DEVICES",
      req,
    });

    clearRefreshCookie(res);

    return res.status(200).json({
      success: true,
      message: "All active sessions have been logged out.",
    });
  } catch (error) {
    console.error("Logout all error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to log out all sessions.",
    });
  }
};

// ---------------------------------------------------------
// CURRENT USER
// ---------------------------------------------------------

const me = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.status,
        u.institution_id,
        u.email_verified,
        u.two_factor_enabled,
        u.last_login_at,

        i.name AS institution_name,
        i.institution_code,

        s.student_id,
        f.employee_id,
        f.department AS faculty_department,
        f.designation AS faculty_designation,
        s.course AS student_course,
        s.department AS student_department,
        s.semester AS student_semester

      FROM users u

      LEFT JOIN institutions i
        ON i.id = u.institution_id

      LEFT JOIN students s
        ON s.user_id = u.id

      LEFT JOIN faculty f
        ON f.user_id = u.id

      WHERE u.id = $1
      LIMIT 1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const user = result.rows[0];

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        institutionId: user.institution_id,
        institutionName: user.institution_name,
        institutionCode: user.institution_code,
        emailVerified: user.email_verified,
        twoFactorEnabled: user.two_factor_enabled,
        lastLoginAt: user.last_login_at,

        student: user.student_id
          ? {
              studentId: user.student_id,
              course: user.student_course,
              department: user.student_department,
              semester: user.student_semester,
            }
          : null,

        faculty: user.employee_id
          ? {
              employeeId: user.employee_id,
              department: user.faculty_department,
              designation: user.faculty_designation,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve user information.",
    });
  }
};

// ---------------------------------------------------------
// UUID helper
// ---------------------------------------------------------

const cryptoRandomUUID = () => {
  const crypto = require("crypto");
  return crypto.randomUUID();
};

// ---------------------------------------------------------
// Exports
// ---------------------------------------------------------

module.exports = {
  registerStudent,
  login,
  refresh,
  logout,
  logoutAll,
  me,
};