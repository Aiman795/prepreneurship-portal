// Converts an array of Signup documents into a CSV string.
// No external CSV library needed for a field list this simple - just
// careful escaping of commas/quotes/newlines inside values.

const COLUMNS = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone / WhatsApp" },
  { key: "city", label: "City" },
  { key: "currentStatus", label: "Current Status" },
  { key: "institution", label: "Institution" },
  { key: "track", label: "Track" },
  { key: "reason", label: "Why they want to join" },
  { key: "portfolioUrl", label: "Portfolio / LinkedIn / GitHub" },
  { key: "hearAboutUs", label: "How they heard about us" },
  { key: "createdAt", label: "Submitted At" },
];

function escapeCsvValue(value) {
  const str = String(value ?? "");
  // Wrap in quotes (and escape existing quotes) if the value contains a
  // comma, quote, or newline - otherwise CSV parsers will misread columns.
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function signupsToCsv(signups) {
  const header = COLUMNS.map((col) => escapeCsvValue(col.label)).join(",");

  const rows = signups.map((signup) => {
    return COLUMNS.map((col) => {
      let value = signup[col.key];
      if (col.key === "createdAt") {
        value = new Date(signup.createdAt).toISOString();
      }
      return escapeCsvValue(value);
    }).join(",");
  });

  return [header, ...rows].join("\n");
}

module.exports = { signupsToCsv };
