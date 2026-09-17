-- ============================================================
-- EduNexus AI ERP
-- Authentication + Institution Database
-- Development Schema
-- ============================================================

-- ============================================================
-- RESET DEVELOPMENT TABLES
-- ============================================================

DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS login_attempts CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS invitations CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS otps CASCADE;
DROP TABLE IF EXISTS faculty CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;


-- ============================================================
-- INSTITUTIONS
-- ============================================================

CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,

    name VARCHAR(200) NOT NULL,

    institution_code VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(150),

    phone VARCHAR(30),

    address TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (
            status IN (
                'active',
                'inactive',
                'suspended'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (
            role IN (
                'student',
                'faculty',
                'manager',
                'admin'
            )
        ),

    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'active',
                'inactive',
                'suspended'
            )
        ),

    institution_id INTEGER
        REFERENCES institutions(id)
        ON DELETE SET NULL,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    last_login_at TIMESTAMPTZ,

    password_changed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- STUDENTS
-- ============================================================

CREATE TABLE students (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    institution_id INTEGER NOT NULL
        REFERENCES institutions(id)
        ON DELETE CASCADE,

    student_id VARCHAR(100) NOT NULL,

    course VARCHAR(150),

    department VARCHAR(150),

    semester INTEGER,

    phone VARCHAR(30),

    date_of_birth DATE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        institution_id,
        student_id
    )
);


-- ============================================================
-- FACULTY
-- ============================================================

CREATE TABLE faculty (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL UNIQUE
        REFERENCES users(id)
        ON DELETE CASCADE,

    institution_id INTEGER NOT NULL
        REFERENCES institutions(id)
        ON DELETE CASCADE,

    employee_id VARCHAR(100) NOT NULL,

    department VARCHAR(150),

    designation VARCHAR(150),

    phone VARCHAR(30),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        institution_id,
        employee_id
    )
);


-- ============================================================
-- OTP
-- ============================================================

CREATE TABLE otps (
    id SERIAL PRIMARY KEY,

    user_id INTEGER
        REFERENCES users(id)
        ON DELETE CASCADE,

    identifier VARCHAR(150) NOT NULL,

    otp_hash VARCHAR(255) NOT NULL,

    purpose VARCHAR(30) NOT NULL
        CHECK (
            purpose IN (
                'signup',
                'login',
                'reset',
                'email_verification',
                'change_email'
            )
        ),

    attempts INTEGER NOT NULL DEFAULT 0,

    max_attempts INTEGER NOT NULL DEFAULT 5,

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    expires_at TIMESTAMPTZ NOT NULL,

    verified_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- SESSIONS
-- ============================================================

CREATE TABLE sessions (
    id UUID PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    refresh_token_hash VARCHAR(255) NOT NULL,

    user_agent TEXT,

    ip_address INET,

    remember_me BOOLEAN NOT NULL DEFAULT FALSE,

    expires_at TIMESTAMPTZ NOT NULL,

    revoked_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    last_used_at TIMESTAMPTZ
);


-- ============================================================
-- ACCOUNT INVITATIONS
-- ============================================================

CREATE TABLE invitations (
    id UUID PRIMARY KEY,

    institution_id INTEGER NOT NULL
        REFERENCES institutions(id)
        ON DELETE CASCADE,

    email VARCHAR(150) NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (
            role IN (
                'student',
                'faculty',
                'manager'
            )
        ),

    reference_id VARCHAR(100),

    token_hash VARCHAR(255) NOT NULL UNIQUE,

    expires_at TIMESTAMPTZ NOT NULL,

    accepted_at TIMESTAMPTZ,

    created_by INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- PASSWORD RESET TOKENS
-- ============================================================

CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    token_hash VARCHAR(255) NOT NULL UNIQUE,

    expires_at TIMESTAMPTZ NOT NULL,

    used_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- LOGIN ATTEMPTS
-- ============================================================

CREATE TABLE login_attempts (
    id SERIAL PRIMARY KEY,

    identifier VARCHAR(150) NOT NULL,

    user_id INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,

    ip_address INET,

    successful BOOLEAN NOT NULL DEFAULT FALSE,

    failure_reason VARCHAR(100),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- AUDIT LOGS
-- ============================================================

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,

    user_id INTEGER
        REFERENCES users(id)
        ON DELETE SET NULL,

    institution_id INTEGER
        REFERENCES institutions(id)
        ON DELETE SET NULL,

    action VARCHAR(100) NOT NULL,

    entity_type VARCHAR(100),

    entity_id VARCHAR(100),

    ip_address INET,

    user_agent TEXT,

    metadata JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_users_institution
ON users(institution_id);

CREATE INDEX idx_users_status
ON users(status);


CREATE INDEX idx_students_user
ON students(user_id);

CREATE INDEX idx_students_institution
ON students(institution_id);

CREATE INDEX idx_students_student_id
ON students(student_id);


CREATE INDEX idx_faculty_user
ON faculty(user_id);

CREATE INDEX idx_faculty_institution
ON faculty(institution_id);

CREATE INDEX idx_faculty_employee_id
ON faculty(employee_id);


CREATE INDEX idx_otps_identifier
ON otps(identifier);

CREATE INDEX idx_otps_user
ON otps(user_id);

CREATE INDEX idx_otps_purpose
ON otps(purpose);

CREATE INDEX idx_otps_expires
ON otps(expires_at);


CREATE INDEX idx_sessions_user
ON sessions(user_id);

CREATE INDEX idx_sessions_expires
ON sessions(expires_at);

CREATE INDEX idx_sessions_revoked
ON sessions(revoked_at);


CREATE INDEX idx_invitations_email
ON invitations(email);

CREATE INDEX idx_invitations_institution
ON invitations(institution_id);

CREATE INDEX idx_invitations_expires
ON invitations(expires_at);


CREATE INDEX idx_password_reset_user
ON password_reset_tokens(user_id);

CREATE INDEX idx_password_reset_expires
ON password_reset_tokens(expires_at);


CREATE INDEX idx_login_attempts_identifier
ON login_attempts(identifier);

CREATE INDEX idx_login_attempts_user
ON login_attempts(user_id);

CREATE INDEX idx_login_attempts_created
ON login_attempts(created_at);


CREATE INDEX idx_audit_logs_user
ON audit_logs(user_id);

CREATE INDEX idx_audit_logs_institution
ON audit_logs(institution_id);

CREATE INDEX idx_audit_logs_created
ON audit_logs(created_at);