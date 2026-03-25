import { db } from "../config/db.js";

// CREATE BOOKING
export function createBooking(req, res) {
  const { userId, panditId, poojaType, date, location } = req.body;

  db.query(
    "INSERT INTO bookings (userId, panditId, poojaType, date, location) VALUES (?, ?, ?, ?, ?)",
    [userId, panditId, poojaType, date, location],
    (err, result) => {
      if (err) {
        console.error("Booking Error:", err);
        return res.status(500).json({ error: err.message });
      }

      return res.json({
        id: result.insertId
      });
    }
  );
}
