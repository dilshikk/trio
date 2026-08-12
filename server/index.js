import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.resolve(process.env.DB_PATH || path.join(__dirname, "site-texts.json"));
const SUBMISSIONS_PATH = path.join(__dirname, "submissions.json");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored.includes(":")) return stored === password;
  const [salt, hash] = stored.split(":");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"));
}

function loadTexts() {
  try { return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")); }
  catch { return {}; }
}

function saveTexts(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function loadSubmissions() {
  try { return JSON.parse(fs.readFileSync(SUBMISSIONS_PATH, "utf-8")); }
  catch { return []; }
}

function saveSubmissions(data) {
  fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "\u041d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d" });
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return res.status(500).json({ error: "\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d" });
  try {
    const payload = jwt.verify(authHeader.slice(7), jwtSecret);
    if (payload.role !== "admin") return res.status(403).json({ error: "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430" });
    req.adminEmail = payload.email;
    next();
  } catch {
    return res.status(401).json({ error: "\u0422\u043e\u043a\u0435\u043d \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u0435\u043d" });
  }
}

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email \u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b" });
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;
  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({ error: "\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d" });
  }
  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return res.status(401).json({ error: "\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c" });
  }
  if (!verifyPassword(password, adminPassword)) {
    return res.status(401).json({ error: "\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c" });
  }
  const token = jwt.sign({ role: "admin", email }, jwtSecret, { expiresIn: "8h" });
  return res.json({ token });
});

// GET /api/auth/verify
app.get("/api/auth/verify", requireAdmin, (req, res) => {
  return res.json({ valid: true, email: req.adminEmail });
});

// GET /api/site-texts/:locale
app.get("/api/site-texts/:locale", (req, res) => {
  const db = loadTexts();
  return res.json(db[req.params.locale] ?? {});
});

// POST /api/site-texts
app.post("/api/site-texts", requireAdmin, (req, res) => {
  const { locale, key, value } = req.body;
  if (!locale || !key) return res.status(400).json({ error: "locale \u0438 key \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b" });
  const db = loadTexts();
  if (!db[locale]) db[locale] = {};
  if (value === "" || value == null) { delete db[locale][key]; }
  else { db[locale][key] = value; }
  saveTexts(db);
  return res.json({ ok: true });
});

// POST /api/submissions — public, saves a new contact form submission
app.post("/api/submissions", (req, res) => {
  const { name, company, email, message, service } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043b\u044f: name, email, message" });
  }
  const submissions = loadSubmissions();
  const entry = {
    id: crypto.randomUUID(),
    name,
    company: company || "",
    email,
    message,
    service: service || "",
    read: false,
    createdAt: new Date().toISOString(),
  };
  submissions.unshift(entry);
  saveSubmissions(submissions);
  return res.json({ ok: true });
});

// GET /api/submissions — admin only, list all
app.get("/api/submissions", requireAdmin, (req, res) => {
  return res.json(loadSubmissions());
});

// PATCH /api/submissions/:id/read — mark as read
app.patch("/api/submissions/:id/read", requireAdmin, (req, res) => {
  const submissions = loadSubmissions();
  const item = submissions.find((s) => s.id === req.params.id);
  if (!item) return res.status(404).json({ error: "\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e" });
  item.read = true;
  saveSubmissions(submissions);
  return res.json({ ok: true });
});

// DELETE /api/submissions/:id
app.delete("/api/submissions/:id", requireAdmin, (req, res) => {
  const submissions = loadSubmissions();
  const idx = submissions.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e" });
  submissions.splice(idx, 1);
  saveSubmissions(submissions);
  return res.json({ ok: true });
});

// GET /api/stats — admin only
app.get("/api/stats", requireAdmin, (req, res) => {
  const submissions = loadSubmissions();
  const texts = loadTexts();
  const locales = Object.keys(texts);
  const totalOverrides = locales.reduce((sum, l) => sum + Object.keys(texts[l]).length, 0);
  return res.json({
    totalSubmissions: submissions.length,
    unreadSubmissions: submissions.filter((s) => !s.read).length,
    totalTextOverrides: totalOverrides,
    localesEdited: locales,
  });
});

app.get("/api/hash/:password", (req, res) => {
  if (process.env.JWT_SECRET) return res.status(403).json({ error: "forbidden" });
  return res.json({ hash: hashPassword(req.params.password) });
});

app.listen(PORT, () => {
  console.log(`Admin API running on port ${PORT}`);
  console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL ? "set" : "NOT SET"}`);
  console.log(`ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? "set" : "NOT SET"}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? "set" : "NOT SET"}`);
});
