const mysql = require("mysql2");

// Create connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nomelase123",
  database: "crowfunding_db",
});

// connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the crowdfunding_db.");
});

//Query example (retrieve all fundraisers)
connection.query("SELECT * FROM FUNDRAISER", (err, results) => {
  if (err) {
    console.error("Error executing query:", err);
    return;
  }
  console.log("fundraisers:", results);
});

connection.end();
