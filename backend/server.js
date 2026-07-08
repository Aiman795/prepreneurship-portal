require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const signupRoutes = require("./routes/signups");
const authRoutes = require("./routes/auth");
const { loginLimiter } = require("./middleware/rateLimiter");

const app = express();

// Security headers (sets sensible defaults - hides tech stack fingerprint,
// blocks some common attack vectors). Cheap to add, good default hygiene
// for anything that will eventually hold real personal data.
app.use(helmet());

// CORS: only allow the frontend URLs listed in .env to call this API.
// Configurable via ALLOWED_ORIGINS so it can differ between local dev,
// staging, and production without touching code.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g. curl, Postman) during development
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// Routes
app.use("/api/signups", signupRoutes);
app.use("/api/auth", loginLimiter, authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Prepreneurship portal API is running" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
