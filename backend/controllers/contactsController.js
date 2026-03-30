import { db } from '../config/db.js';

export function createContact(req, res) {
  const { name, email, phone, preferred_contact_method, request_callback, callback_date, callback_time, subject, message, urgency } = req.body;

  db.query(
    `INSERT INTO contacts (name, email, phone, preferred_contact_method, request_callback, callback_date, callback_time, subject, message, urgency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email || null,
      phone || null,
      preferred_contact_method || null,
      request_callback ? 1 : 0,
      callback_date || null,
      callback_time || null,
      subject || null,
      message || null,
      urgency || 'normal'
    ],
    (err, result) => {
      if (err) {
        console.error('Create contact error:', err);
        return res.status(500).json({ error: err.message });
      }
      return res.json({ id: result.insertId });
    }
  );
}
