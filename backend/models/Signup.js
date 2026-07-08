const mongoose = require("mongoose");

// NOTE on `track`: using Prepreneurship's published track list from their site
// as a placeholder. Shafaat mentioned he'll send the confirmed list -
// update the enum array below once he does. Keeping it as an enum (rather
// than free text) avoids typos/duplicates in the data ("Web Dev" vs "Web
// Development" vs "web development" all becoming separate values).
const TRACKS = [
  "Web Development",
  "AI Productivity Tools",
  "Digital Marketing",
  "Graphic Design",
  "Video Editing",
  "E-Commerce",
];

const CURRENT_STATUS_OPTIONS = ["Student", "Graduate", "Professional"];

const signupSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone / WhatsApp number is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    currentStatus: {
      type: String,
      required: true,
      enum: CURRENT_STATUS_OPTIONS,
    },
    institution: {
      type: String, // university name, employer, etc - free text
      trim: true,
      default: "",
    },
    track: {
      type: String,
      required: true,
      enum: TRACKS,
    },
    reason: {
      type: String, // "Why do you want to join?"
      required: [true, "Please share why you want to join"],
      trim: true,
      maxlength: [1000, "Please keep this under 1000 characters"],
    },
    portfolioUrl: {
      type: String, // optional - portfolio / LinkedIn / GitHub
      trim: true,
      default: "",
    },
    hearAboutUs: {
      type: String, // optional
      trim: true,
      default: "",
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model("Signup", signupSchema);
module.exports.TRACKS = TRACKS;
module.exports.CURRENT_STATUS_OPTIONS = CURRENT_STATUS_OPTIONS;
