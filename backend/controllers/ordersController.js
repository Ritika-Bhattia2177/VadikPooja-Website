import { db } from "../config/db.js";

// ================= CREATE ORDER =================
export function createOrder(req, res) {
  const { userId, items, totalPrice } = req.body;

  // convert items array/object to string
  const itemsString = JSON.stringify(items);

  db.query(
    "INSERT INTO orders (userId, items, total_price) VALUES (?, ?, ?)",
    [userId, itemsString, totalPrice],
    (err, result) => {
      if (err) {
        console.error("Create order error:", err);
        return res.status(500).json({ error: err.message });
      }

      return res.json({
        id: result.insertId
      });
    }
  );
}

// ================= GET ORDERS =================
export function getOrders(req, res) {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM orders WHERE userId = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Get orders error:", err);
        return res.status(500).json({ error: err.message });
      }

      // convert items back to JSON
      const formatted = results.map(order => ({
        ...order,
        items: JSON.parse(order.items)
      }));

      return res.json(formatted);
    }
  );
}