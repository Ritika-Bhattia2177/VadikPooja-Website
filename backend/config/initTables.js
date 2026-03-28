import { query } from './db.js';

const queries = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(512) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS kits (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(512),
    itemsIncluded TEXT,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS pandits (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    experience INT DEFAULT 0,
    languages TEXT,
    city VARCHAR(255),
    image VARCHAR(512),
    rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS bookings (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    panditId INT UNSIGNED NOT NULL,
    poojaType VARCHAR(255),
    date DATETIME,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    items TEXT NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS poojas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(512),
    price DECIMAL(10,2),
    benefits TEXT,
    items TEXT,
    religious_philosophy TEXT,
    puja_vidhi TEXT,
    samagri TEXT,
    cultural_acceptance TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;`
];

export default async function initTables() {
  // Create tables
  for (const q of queries) {
    try {
      await query(q);
    } catch (err) {
      console.error('Error creating table:', err?.message || err);
    }
  }

  // Add columns safely (for older DB)
  const alterQueries = [
    `ALTER TABLE poojas ADD COLUMN IF NOT EXISTS religious_philosophy TEXT;`,
    `ALTER TABLE poojas ADD COLUMN IF NOT EXISTS puja_vidhi TEXT;`,
    `ALTER TABLE poojas ADD COLUMN IF NOT EXISTS samagri TEXT;`,
    `ALTER TABLE poojas ADD COLUMN IF NOT EXISTS cultural_acceptance TEXT;`
  ];

  for (const q of alterQueries) {
    try {
      await query(q);
    } catch (err) {
      if (err?.message?.includes('Duplicate column')) continue;
      console.error('Error altering table:', err?.message || err);
    }
  }

  // ✅ FIXED SEED QUERY (IMPORTANT)
  try {
    await query(
      `INSERT INTO poojas 
      (name, description, image, price, benefits, items, religious_philosophy, puja_vidhi, samagri, cultural_acceptance)
      SELECT ?,?,?,?,?,?,?,?,?,?
      WHERE NOT EXISTS (SELECT 1 FROM poojas LIMIT 1);`,
      [
        'Griha Pravesh',
        'A traditional house-warming pooja to invite prosperity and well-being into your new home.',
        'https://via.placeholder.com/1200x800?text=Griha+Pravesh',
        1500.00,
        JSON.stringify(['Peace', 'Prosperity', 'Blessings']),
        JSON.stringify(['Kalash', 'Flowers', 'Rice']),
        'This pooja symbolizes purification and inviting divine energy into the home.',
        'Steps include Ganesh Puja, Kalash Sthapana, Vastu Shanti, and Havan.',
        'Kalash, coconut, flowers, rice, ghee, incense sticks.',
        'Widely practiced across India during housewarming ceremonies.'
      ]
    );
  } catch (err) {
    console.error('Error seeding poojas:', err?.message || err);
  }

  console.log('Table initialization queries executed (if not exist).');
}