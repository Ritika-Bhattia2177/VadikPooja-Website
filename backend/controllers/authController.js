import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

const { JWT_SECRET = "vaidik-pooja-secret-key" } = process.env;

// ================= REGISTER =================
export function register(req, res) {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    
    if (result.length > 0) {
      const user = result[0];

      bcrypt.compare(password, user.password)
        .then((passwordMatches) => {
          if (!passwordMatches) {
            return res.status(401).json({
              error: "Email already registered. Incorrect password entered.",
            });
          }

          const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET
          );

          return res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        })
        .catch((error) => {
          console.error("Compare Error:", error);
          return res.status(500).json({ error: "Password check failed" });
        });

    } 
    // 🔹 If user does NOT exist → create new user
    else {
      bcrypt.hash(password, 10)
        .then((hashedPassword) => {
          db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            (err, insertResult) => {
              if (err) {
                console.error("Insert Error:", err);
                return res.status(500).json({ error: err.message });
              }

              const token = jwt.sign(
                { id: insertResult.insertId, email },
                JWT_SECRET
              );

              return res.json({
                token,
                user: {
                  id: insertResult.insertId,
                  name,
                  email,
                },
              });
            }
          );
        })
        .catch((error) => {
          console.error("Hash Error:", error);
          return res.status(500).json({ error: "Password hashing failed" });
        });
    }
  });
}

// ================= LOGIN =================
export function login(req, res) {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "User not found. Please register first.",
      });
    }

    const user = result[0];

    bcrypt.compare(password, user.password)
      .then((passwordMatches) => {
        if (!passwordMatches) {
          return res.status(401).json({
            error: "Incorrect password for this email.",
          });
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET
        );

        return res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        console.error("Compare Error:", error);
        return res.status(500).json({ error: "Login failed" });
      });
  });
}