import { db } from "../config/db.js";

// ================= GET ALL POOJAS =================
export function getPoojas(req, res) {
  db.query("SELECT * FROM poojas", (err, results) => {
    if (err) {
      console.error("Get poojas error:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.json(results);
  });
}

// ================= GET POOJA BY ID =================
export function getPoojaById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Pooja id is required" });
  }

  db.query("SELECT * FROM poojas WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Get pooja by id error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Pooja not found" });
    }

    return res.json(results[0]);
  });
}

// ================= CREATE NEW POOJA =================
export function createPooja(req, res) {
  const {
    name,
    description,
    image,
    price,
    benefits,
    items,
    religious_philosophy,
    puja_vidhi,
    samagri,
    cultural_acceptance
  } = req.body;

  // ✅ Validation
  if (!name || !description || !image || !price) {
    return res.status(400).json({
      error: "name, description, image, and price are required"
    });
  }

  const sql = `
    INSERT INTO poojas 
    (name, description, image, price, benefits, items, religious_philosophy, puja_vidhi, samagri, cultural_acceptance)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      description,
      image,
      price,
      JSON.stringify(benefits || []), // ✅ FIX
      JSON.stringify(items || []),    // ✅ FIX
      religious_philosophy || "",
      puja_vidhi || "",
      samagri || "",
      cultural_acceptance || ""
    ],
    (err, result) => {
      if (err) {
        console.error("Create pooja error:", err);
        return res.status(500).json({ error: err.message });
      }

      return res.status(201).json({
        message: "Pooja added successfully ✅",
        id: result.insertId
      });
    }
  );
}