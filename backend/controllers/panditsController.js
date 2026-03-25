import { db } from "../config/db.js";

// ================= GET PANDITS =================
export function getPandits(req, res) {
  db.query("SELECT * FROM pandits", (err, results) => {
    if (err) {
      console.error("Get pandits error:", err);
      return res.status(500).json({ error: err.message });
    }

    // convert languages string → array
    const formatted = results.map(p => ({
      ...p,
      languages: p.languages ? JSON.parse(p.languages) : []
    }));

    return res.json(formatted);
  });
}

// ================= CREATE PANDIT =================
export function createPandit(req, res) {
  const { name, experience, languages, city, image, rating } = req.body;

  if (!name || experience === undefined || !languages || !city) {
    return res.status(400).json({
      error: "name, experience, languages, and city are required",
    });
  }

  const languagesArray = Array.isArray(languages)
    ? languages
    : String(languages).split(",").map(l => l.trim());

  db.query(
    "INSERT INTO pandits (name, experience, languages, city, image, rating) VALUES (?, ?, ?, ?, ?, ?)",
    [name, experience, JSON.stringify(languagesArray), city, image, rating || null],
    (err, result) => {
      if (err) {
        console.error("Create pandit error:", err);
        return res.status(500).json({ error: err.message });
      }

      return res.status(201).json({
        id: result.insertId,
        name,
        experience,
        languages: languagesArray,
        city,
        image,
        rating,
      });
    }
  );
}

// ================= UPDATE PANDIT =================
export function updatePandit(req, res) {
  const { id } = req.params;
  const { name, experience, languages, city, image, rating } = req.body;

  const languagesArray = languages
    ? (Array.isArray(languages)
        ? languages
        : String(languages).split(",").map(l => l.trim()))
    : null;

  db.query(
    "UPDATE pandits SET name=?, experience=?, languages=?, city=?, image=?, rating=? WHERE id=?",
    [
      name,
      experience,
      languagesArray ? JSON.stringify(languagesArray) : null,
      city,
      image,
      rating,
      id
    ],
    (err, result) => {
      if (err) {
        console.error("Update pandit error:", err);
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Pandit not found" });
      }

      return res.json({ success: true });
    }
  );
}

// ================= DELETE PANDIT =================
export function deletePandit(req, res) {
  const { id } = req.params;

  db.query("DELETE FROM pandits WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Delete pandit error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pandit not found" });
    }

    return res.json({ success: true, id });
  });
}