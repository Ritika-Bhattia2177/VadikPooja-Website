import { db } from "../config/db.js";

// ================= GET ALL KITS =================
export function getKits(req, res) {
  const { category, sort } = req.query || {};

  let query = "SELECT * FROM kits";
  let values = [];

  // Filtering
  if (category) {
    query += " WHERE category = ?";
    values.push(category);
  }

  // Sorting
  if (sort === "price_low_high") {
    query += " ORDER BY price ASC";
  } else if (sort === "newest") {
    query += " ORDER BY id DESC";
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Get kits error:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.json({
      success: true,
      count: results.length,
      data: results,
    });
  });
}

// ================= CREATE KIT =================
export function createKit(req, res) {
  let { name, description, price, category, image, itemsIncluded, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required fields" });
  }

  // Fix values
  price = Number(price);
  stock = Number(stock) || 0;

  if (Array.isArray(itemsIncluded)) {
    itemsIncluded = itemsIncluded.join(", ");
  }

  // 🔥 FIX: replace undefined with null
  description = description ?? null;
  category = category ?? null;
  image = image ?? null;
  itemsIncluded = itemsIncluded ?? null;

  const sql = `
    INSERT INTO kits 
    (name, description, price, category, image, itemsIncluded, stock)
    VALUES (
      ${db.escape(name)},
      ${db.escape(description)},
      ${price},
      ${db.escape(category)},
      ${db.escape(image)},
      ${db.escape(itemsIncluded)},
      ${stock}
    )
  `;

  console.log("FINAL SQL:", sql);

  db.query(sql, (err, result) => {
    if (err) {
      console.error("FINAL ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.status(201).json({
      success: true,
      message: "Kit created successfully",
      data: result
    });
  });
}

// ================= GET KIT BY ID =================
export function getKitById(req, res) {
  const { id } = req.params;

  db.query("SELECT * FROM kits WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Get kit error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Ritual Kit not found",
      });
    }

    return res.json({
      success: true,
      data: result[0],
    });
  });
}

// ================= UPDATE KIT =================
export function updateKit(req, res) {
  const { id } = req.params;
  const { name, description, price, category, image, itemsIncluded, stock } = req.body;

  db.query(
    "UPDATE kits SET name=?, description=?, price=?, category=?, image=?, itemsIncluded=?, stock=? WHERE id=?",
    [
      name || null,
      description || null,
      price || null,
      category || null,
      image || null,
      itemsIncluded ? JSON.stringify(itemsIncluded) : null,
      stock || 0,
      id
    ],
    (err, result) => {
      if (err) {
        console.error("Update kit error:", err);
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Ritual Kit not found",
        });
      }

      return res.json({
        success: true,
        message: "Ritual Kit updated successfully",
      });
    }
  );
}

// ================= DELETE KIT =================
export function deleteKit(req, res) {
  const { id } = req.params;

  db.query("DELETE FROM kits WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Delete kit error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Ritual Kit not found",
      });
    }

    return res.json({
      success: true,
      message: "Ritual Kit deleted successfully",
    });
  });
}