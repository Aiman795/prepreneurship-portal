# Prepreneurship — Applicant Portal

Full-stack sign-up + admin portal built for Prepreneurship. Applicants submit
the form; an admin logs in with JWT auth to view and export all submissions.

## Tech stack

- **Frontend:** React (Vite) + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth:** JWT, admin password stored as a bcrypt hash (never plain text)
- **Security:** helmet, rate limiting on public + login routes, CORS locked to
  an allow-list

## Folder structure

```
prepreneurship-portal/
  backend/
    config/db.js                 -> MongoDB connection
    models/Signup.js              -> schema + TRACKS / CURRENT_STATUS_OPTIONS
    routes/signups.js             -> POST /api/signups, GET /api/signups, GET /api/signups/export
    routes/auth.js                -> POST /api/auth/login
    middleware/auth.js            -> JWT check for admin routes
    middleware/rateLimiter.js     -> rate limits for signup + login
    utils/csv.js                  -> CSV export formatting
    scripts/generateAdminHash.js  -> generates the bcrypt hash for .env
    server.js
    .env.example
  frontend/
    src/
      components/ApplicationForm.jsx
      components/AdminLogin.jsx
      components/AdminDashboard.jsx
      api.js
      App.jsx
      index.css
    .env.example
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
- `MONGO_URI` — `mongodb://localhost:27017/prepreneurship-portal` for local MongoDB
- `JWT_SECRET` — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `ADMIN_USERNAME` — whatever you want
- `ADMIN_PASSWORD_HASH` — run `npm run hash-password`, enter your chosen password, paste the printed hash here
- `ALLOWED_ORIGINS` — comma-separated frontend URLs allowed to call this API (defaults to `http://localhost:5173`)

Run it:

```bash
npm run dev
```

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` already defaults to `VITE_API_URL=http://localhost:5000/api` for local dev.

```bash
npm run dev
```

## 3. Try it

1. Go to the frontend URL, submit an application.
2. Go to `/admin`, log in with your admin username + the password you hashed.
3. See the submission in the table, then try **Export CSV**.
