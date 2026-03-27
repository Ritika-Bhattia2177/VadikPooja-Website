import { db } from "../config/db.js";

// ================= GET PANDITS =================
export function getPandits(req, res) {
  db.query("SELECT * FROM pandits", (err, results) => {
    if (err) {
      console.error("Get pandits error:", err);
      return res.status(500).json({ error: err.message });
    }

    const formatted = results.map(p => ({
      ...p,
      languages: p.languages ? JSON.parse(p.languages) : [],
      specialization: p.specialization ? JSON.parse(p.specialization) : [],
      poojaTypes: p.poojaTypes ? JSON.parse(p.poojaTypes) : [] // ✅ NEW
    }));

    return res.json(formatted);
  });
}

// ================= CREATE PANDIT =================
export function createPandit(req, res) {
  console.log("BODY:", req.body);

  const {
    name,
    experience,
    languages,
    city,
    image,
    rating,
    specialization,
    poojaTypes, // ✅ NEW
    price,
    availability,
    description,
    totalReviews
  } = req.body;

  // ✅ Validation
  if (!name || experience === undefined || !languages || !city) {
    return res.status(400).json({
      error: "name, experience, languages, and city are required",
    });
  }

  // ✅ Convert languages
  const languagesArray = Array.isArray(languages)
    ? languages
    : String(languages).split(",").map(l => l.trim());

  // ✅ Convert specialization
  const specializationArray = specialization
    ? (Array.isArray(specialization)
        ? specialization
        : String(specialization).split(",").map(s => s.trim()))
    : [];

  // ✅ Convert poojaTypes
  const poojaArray = poojaTypes
    ? (Array.isArray(poojaTypes)
        ? poojaTypes
        : String(poojaTypes).split(",").map(p => p.trim()))
    : [];

  // ✅ Insert Query
  db.query(
    `INSERT INTO pandits 
    (name, experience, languages, city, image, rating, specialization, poojaTypes, price, availability, description, totalReviews) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      experience,
      JSON.stringify(languagesArray),
      city,
      image || null,
      rating || null,
      JSON.stringify(specializationArray),
      JSON.stringify(poojaArray), // ✅ NEW
      price || null,
      availability || null,
      description || null,
      totalReviews || null
    ],
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
        specialization: specializationArray,
        poojaTypes: poojaArray, // ✅ NEW
        price,
        availability,
        description,
        totalReviews
      });
    }
  );
}

// ================= UPDATE PANDIT =================
export function updatePandit(req, res) {
  const { id } = req.params;

  const {
    name,
    experience,
    languages,
    city,
    image,
    rating,
    specialization,
    poojaTypes, // ✅ NEW
    price,
    availability,
    description,
    totalReviews
  } = req.body;

  const languagesArray = languages
    ? (Array.isArray(languages)
        ? languages
        : String(languages).split(",").map(l => l.trim()))
    : null;

  const specializationArray = specialization
    ? (Array.isArray(specialization)
        ? specialization
        : String(specialization).split(",").map(s => s.trim()))
    : null;

  const poojaArray = poojaTypes
    ? (Array.isArray(poojaTypes)
        ? poojaTypes
        : String(poojaTypes).split(",").map(p => p.trim()))
    : null;

  db.query(
    `UPDATE pandits 
     SET name=?, experience=?, languages=?, city=?, image=?, rating=?, specialization=?, poojaTypes=?, price=?, availability=?, description=?, totalReviews=? 
     WHERE id=?`,
    [
      name,
      experience,
      languagesArray ? JSON.stringify(languagesArray) : null,
      city,
      image,
      rating,
      specializationArray ? JSON.stringify(specializationArray) : null,
      poojaArray ? JSON.stringify(poojaArray) : null, // ✅ NEW
      price,
      availability,
      description,
      totalReviews,
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