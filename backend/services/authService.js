const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRES_IN =
  process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";

const generateAccessToken = ({
  userId,
  role,
  sessionId,
  institutionId,
}) => {
  return jwt.sign(
    {
      sub: userId,
      role,
      sessionId,
      institutionId: institutionId || null,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

const generateRefreshToken = () => {
  return crypto.randomBytes(48).toString("hex");
};

const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const getSessionDuration = (rememberMe) => {
  if (rememberMe) {
    const days =
      Number(process.env.REMEMBER_ME_DAYS) || 30;

    return days * 24 * 60 * 60 * 1000;
  }

  const hours =
    Number(process.env.SESSION_EXPIRES_HOURS) || 8;

  return hours * 60 * 60 * 1000;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  generateOtp,
  getSessionDuration,
};