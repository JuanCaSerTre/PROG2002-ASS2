// Import mysql2 library
const mysql = require("mysql2");

// Create connection to the database
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nomelase123",
  database: "crowfunding_db", // Ensure the database name is correct
});

// Connect to MySQL
dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the crowdfunding_db database.");
});

// Export the database connection
module.exports = dbConnection;
