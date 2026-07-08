const express = require("express");
const router = express.Router();
const Signup = require("../models/Signup");
const requireAdmin = require("../middleware/auth");
const { signupLimiter } = require("../middleware/rateLimiter");
const { signupsToCsv } = require("../utils/csv");

// POST /api/signups  (public - anyone can apply)
router.post("/", signupLimiter, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      currentStatus,
      institution,
      track,
      reason,
      portfolioUrl,
      hearAboutUs,
    } = req.body;

    const signup = await Signup.create({
      fullName,
      email,
      phone,
      city,
      currentStatus,
      institution,
      track,
      reason,
      portfolioUrl,
      hearAboutUs,
    });

    res.status(201).json(signup);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// GET /api/signups  (admin only) - list all applicants, newest first
router.get("/", requireAdmin, async (req, res) => {
  try {
    const signups = await Signup.find().sort({ createdAt: -1 });
    res.json(signups);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// GET /api/signups/export  (admin only) - download all applicants as CSV
router.get("/export", requireAdmin, async (req, res) => {
  try {
    const signups = await Signup.find().sort({ createdAt: -1 });
    const csv = signupsToCsv(signups);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="signups-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;
