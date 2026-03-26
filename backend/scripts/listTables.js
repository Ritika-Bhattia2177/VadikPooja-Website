import { db } from '../config/db.js';

db.query('SHOW TABLES', (err, results) => {
  if (err) {
    console.error('Error listing tables:', err.message);
    process.exit(1);
  }

  console.log('Tables in database:');
  console.log(results);
  process.exit(0);
});
