const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'KAYkay230.',
  database: 'farm_market_tracker',
  port: 3306 // Ensure this matches your MySQL configuration
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});


module.exports = db;
