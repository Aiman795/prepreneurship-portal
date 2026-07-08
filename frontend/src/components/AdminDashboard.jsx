import { useEffect, useState } from "react";
import { fetchSignups, downloadSignupsCsv } from "../api.js";

export default function AdminDashboard({ token, onLogout }) {
  const [signups, setSignups] = useState([]);
  const [status, setStatus] = useState({ state: "loading", message: "" });
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchSignups(token)
      .then((data) => {
        setSignups(data);
        setStatus({ state: "success", message: "" });
      })
      .catch((err) => setStatus({ state: "error", message: err.message }));
  }, [token]);

  async function handleExport() {
    setExporting(true);
    try {
      await downloadSignupsCsv(token);
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="card dashboard-card">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Applications ({signups.length})</h1>
        </div>
        <div className="dashboard-actions">
          <button className="btn-secondary" onClick={handleExport} disabled={exporting || signups.length === 0}>
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
          <button className="btn-secondary" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>

      {status.state === "loading" && <p className="subtitle">Loading applications...</p>}
      {status.state === "error" && <p className="msg error">{status.message}</p>}

      {status.state === "success" && signups.length === 0 && (
        <p className="subtitle">No applications yet.</p>
      )}

      {status.state === "success" && signups.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
                <th>Track</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {signups.map((s) => (
                <tr key={s._id}>
                  <td>{s.fullName}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.city}</td>
                  <td>{s.currentStatus}</td>
                  <td><span className="pill">{s.track}</span></td>
                  <td>{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
