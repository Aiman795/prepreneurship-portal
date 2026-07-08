// Base URL comes from an environment variable, never hardcoded, so the
// same build can point at local/staging/production just by changing .env.
const API_BASE = import.meta.env.VITE_API_URL;

export async function createSignup(payload) {
  const res = await fetch(`${API_BASE}/signups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit application");
  return data;
}

export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function fetchSignups(token) {
  const res = await fetch(`${API_BASE}/signups`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load applicants");
  return data;
}

// Downloads the CSV export by fetching it as a blob (since it needs the
// Authorization header, a plain <a href> link to the API URL won't work)
// and triggering a browser download via a temporary object URL.
export async function downloadSignupsCsv(token) {
  const res = await fetch(`${API_BASE}/signups/export`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to export CSV");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `prepreneurship-signups-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
