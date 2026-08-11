import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

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
    if (!valid) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }
  } catch {
    return res.status(500).json({ error: "Ошибка проверки пароля" });
  }

  const token = jwt.sign({ role: "admin", email }, jwtSecret, {
    expiresIn: "8h",
  });

  return res.json({ token });
});

// GET /api/auth/verify
app.get("/api/auth/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.slice(7);
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ valid: false });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const { role, email } = payload;
    if (role !== "admin") return res.status(403).json({ valid: false });
    return res.json({ valid: true, email });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`Admin API server running on port ${PORT}`);
});
