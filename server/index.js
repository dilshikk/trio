import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load .env from the same directory as this file, regardless of cwd
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3001;

// Path to JSON file that stores site text overrides
const DB_PATH = path.resolve(process.env.DB_PATH || path.join(__dirname, "site-texts.json"));

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
    return res.status(401).json({ error: "\u041d\u0435 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u043d" });
  }
  const token = authHeader.slice(7);
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return res.status(500).json({ error: "\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d" });
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== "admin") return res.status(403).json({ error: "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430" });
    req.adminEmail = payload.email;
    next();
  } catch {
    return res.status(401).json({ error: "\u0422\u043e\u043a\u0435\u043d \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u0435\u043d" });
  }
}

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email \u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  console.log("[login] ADMIN_EMAIL:", adminEmail ? "set" : "NOT SET");
  console.log("[login] ADMIN_PASSWORD_HASH:", adminPasswordHash ? "set" : "NOT SET");
  console.log("[login] JWT_SECRET:", jwtSecret ? "set" : "NOT SET");

  if (!adminEmail || !adminPasswordHash || !jwtSecret) {
    return res.status(500).json({ error: "\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d" });
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return res.status(401).json({ error: "\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c" });
  }

  try {
    const valid = await argon2.verify(adminPasswordHash, password);
    if (!valid) return res.status(401).json({ error: "\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c" });
  } catch {
    return res.status(500).json({ error: "\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u043f\u0430\u0440\u043e\u043b\u044f" });
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
  if (!locale || !key) {
    return res.status(400).json({ error: "locale \u0438 key \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b" });
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
  console.log(`Loading .env from: ${path.join(__dirname, ".env")}`);
  console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL ? "set" : "NOT SET"}`);
});
