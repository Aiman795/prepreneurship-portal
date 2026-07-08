const rateLimit = require("express-rate-limit");

// Limits how many sign-up submissions a single IP can make in a window.
// Protects the public endpoint from being spammed/abused, since it will
// eventually hold real applicant data with no login required to submit.
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 submissions per IP per window
  message: { message: "Too many submissions from this device. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Slightly stricter limiter for the login endpoint, to slow down
// brute-force password guessing against the admin account.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { signupLimiter, loginLimiter };
