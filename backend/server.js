// Import required modules
const express = require("express");
const dbConnection = require("./crowdfunding_db");
const cors = require("cors");

// Initialize the Express application
const app = express();

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// GET all active fundraisers with their category
app.get("/api/fundraisers", (req, res) => {
  const query = `
        SELECT F.FUNDRAISER_ID, F.ORGANIZER, F.CAPTION, F.TARGET_FUNDING, F.CURRENT_FUNDING, F.CITY, F.ACTIVE, C.NAME AS CATEGORY
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.ACTIVE = 1
    `;

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching fundraisers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// GET fundraisers based on search criteria
app.get("/api/fundraisers/search", (req, res) => {
  const { organizer, city, category } = req.query;

  let query = `
        SELECT F.FUNDRAISER_ID, F.ORGANIZER, F.CAPTION, F.TARGET_FUNDING, F.CURRENT_FUNDING, F.CITY, F.ACTIVE, C.NAME AS CATEGORY
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.ACTIVE = 1
    `;

  // Add search filters if they exist
  const queryParams = [];
  if (organizer) {
    query += " AND F.ORGANIZER LIKE ?";
    queryParams.push(`%${organizer}%`);
  }
  if (city) {
    query += " AND F.CITY LIKE ?";
    queryParams.push(`%${city}%`);
  }
  if (category) {
    query += " AND C.NAME LIKE ?";
    queryParams.push(`%${category}%`);
  }

  dbConnection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error fetching fundraisers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// GET fundraiser details by ID
app.get("/api/fundraisers/:id", (req, res) => {
  const fundraiserId = req.params.id;

  const query = `
        SELECT F.FUNDRAISER_ID, F.ORGANIZER, F.CAPTION, F.TARGET_FUNDING, F.CURRENT_FUNDING, F.CITY, F.ACTIVE, C.NAME AS CATEGORY
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.FUNDRAISER_ID = ?
    `;

  dbConnection.query(query, [fundraiserId], (error, results) => {
    if (error) {
      console.error("Error fetching fundraiser details:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Fundraiser not found" });
    }
    res.json(results[0]);
  });
});

// GET all categories
app.get("/api/categories", (req, res) => {
  const query = "SELECT * FROM CATEGORY";

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Set the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
