-- ============================================
-- EduNexus AI ERP Database
-- ============================================

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('student', 'faculty', 'manager', 'admin')),

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP
);


-- OTPs
CREATE TABLE IF NOT EXISTS otps (
    id SERIAL PRIMARY KEY,

    identifier VARCHAR(150) NOT NULL,

    otp_code VARCHAR(6) NOT NULL,

    purpose VARCHAR(20) NOT NULL
        CHECK (purpose IN ('signup', 'login', 'reset')),

    verify_token VARCHAR(255),

    is_verified BOOLEAN DEFAULT FALSE,

    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP
);


-- USER EMAIL INDEX
CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);


-- USER ROLE INDEX
CREATE INDEX IF NOT EXISTS idx_users_role
ON users(role);


-- OTP IDENTIFIER INDEX
CREATE INDEX IF NOT EXISTS idx_otps_identifier
ON otps(identifier);


-- OTP TOKEN INDEX
CREATE INDEX IF NOT EXISTS idx_otps_token
ON otps(verify_token);