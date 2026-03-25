import { db } from "../config/db.js";

// ================= GET PRODUCTS =================
export function getProducts(req, res) {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Get products error:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.json(results);
  });
}

// ================= CREATE PRODUCT =================
export function createProduct(req, res) {
  const { name, image, price, description = "", category } = req.body;

  if (!name || !image || !price || !category) {
    return res.status(400).json({
      error: "name, image, price, and category are required",
    });
  }

  db.query(
    "INSERT INTO products (name, image, price, description, category) VALUES (?, ?, ?, ?, ?)",
    [name, image, price, description, category],
    (err, result) => {
      if (err) {
        console.error("Create product error:", err);
        return res.status(500).json({ error: err.message });
      }

      return res.status(201).json({
        id: result.insertId,
        name,
        image,
        price,
        description,
        category,
      });
    }
  );
}