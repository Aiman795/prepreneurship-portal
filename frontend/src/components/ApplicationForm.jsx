import { useState } from "react";
import { createSignup } from "../api.js";

// NOTE: placeholder track list from Prepreneurship's public site - swap in
// the confirmed list once Shafaat sends it. Keep this in sync with the
// `TRACKS` enum in backend/models/Signup.js.
const TRACKS = [
  "Web Development",
  "AI Productivity Tools",
  "Digital Marketing",
  "Graphic Design",
  "Video Editing",
  "E-Commerce",
];

const STATUS_OPTIONS = ["Student", "Graduate", "Professional"];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  currentStatus: STATUS_OPTIONS[0],
  institution: "",
  track: TRACKS[0],
  reason: "",
  portfolioUrl: "",
  hearAboutUs: "",
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      await createSignup(form);
      setStatus({ state: "success", message: "Application received. We'll be in touch." });
      setForm(initialForm);
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <div className="card form-card">
      <p className="eyebrow">01 — Apply</p>
      <h1>Begin your application</h1>
      <p className="subtitle">Tell us who you are and what you want to build.</p>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <label>
            Full name
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>

        <div className="grid-2">
          <label>
            Phone / WhatsApp
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <label>
            City
            <input type="text" name="city" value={form.city} onChange={handleChange} required />
          </label>
        </div>

        <div className="grid-2">
          <label>
            Current status
            <select name="currentStatus" value={form.currentStatus} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Institution / employer <span className="optional">(optional)</span>
            <input type="text" name="institution" value={form.institution} onChange={handleChange} />
          </label>
        </div>

        <label>
          Track applying for
          <select name="track" value={form.track} onChange={handleChange}>
            {TRACKS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          Why do you want to join?
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={3}
            maxLength={1000}
            required
          />
        </label>

        <div className="grid-2">
          <label>
            Portfolio / LinkedIn / GitHub <span className="optional">(optional)</span>
            <input type="text" name="portfolioUrl" value={form.portfolioUrl} onChange={handleChange} />
          </label>
          <label>
            How did you hear about us? <span className="optional">(optional)</span>
            <input type="text" name="hearAboutUs" value={form.hearAboutUs} onChange={handleChange} />
          </label>
        </div>

        <button type="submit" className="btn-primary" disabled={status.state === "loading"}>
          {status.state === "loading" ? "Submitting..." : "Submit application"}
        </button>

        {status.state === "success" && <p className="msg success">{status.message}</p>}
        {status.state === "error" && <p className="msg error">{status.message}</p>}
      </form>
    </div>
  );
}
