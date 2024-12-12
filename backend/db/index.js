/* jshint esversion: 11 */

require("dotenv").config();
const mysql = require("mysql2");

// MySQL connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL');
});

// (async () => {
//     try {
//       const [results] = await db.query('SELECT * FROM Players');
//       console.log('Test query results:', results);
//     } catch (error) {
//       console.error('Test query failed:', error);
//     }
// })();


module.exports = db;
