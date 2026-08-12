import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import cors from "cors";
import fs from "fs";
import path from "path";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

// Path to JSON file that stores site text overrides
const DB_PATH = path.resolve(process.env.DB_PATH || "./site-texts.json");

function loadTexts() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function saveTexts(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware: verify JWT
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Не авторизован" });
  }
  const token = authHeader.slice(7);
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return res.status(500).json({ error: "Сервер не настроен" });
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== "admin") return res.status(403).json({ error: "Нет доступа" });
    req.adminEmail = payload.email;
    next();
  } catch {
    return res.status(401).json({ error: "Токен недействителен" });
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email и пароль обязательны" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPasswordHash || !jwtSecret) {
    return res.status(500).json({ error: "Сервер не настроен" });
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return res.status(401).json({ error: "Неверный email или пароль" });
  }

  try {
    const valid = await argon2.verify(adminPasswordHash, password);
    if (!valid) return res.status(401).json({ error: "Неверный email или пароль" });
  } catch {
    return res.status(500).json({ error: "Ошибка проверки пароля" });
  }

  const token = jwt.sign({ role: "admin", email }, jwtSecret, { expiresIn: "8h" });
  return res.json({ token });
});

// GET /api/auth/verify
app.get("/api/auth/verify", requireAdmin, (req, res) => {
  return res.json({ valid: true, email: req.adminEmail });
});

// ── Site Texts ────────────────────────────────────────────────────────────────

// GET /api/site-texts/:locale  (public — used by SiteTextsProvider on the frontend)
app.get("/api/site-texts/:locale", (req, res) => {
  const db = loadTexts();
  const locale = req.params.locale;
  return res.json(db[locale] ?? {});
});

// POST /api/site-texts  (admin only)
app.post("/api/site-texts", requireAdmin, (req, res) => {
  const { locale, key, value } = req.body;
  if (!locale || !key) {
    return res.status(400).json({ error: "locale и key обязательны" });
  }
  const db = loadTexts();
  if (!db[locale]) db[locale] = {};
  if (value === "" || value == null) {
    delete db[locale][key];
  } else {
    db[locale][key] = value;
  }
  saveTexts(db);
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Admin API server running on port ${PORT}`);
});
