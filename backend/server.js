// Import the required modules
const express = require("express");
const dbConnection = require("./crowdfunding_db"); // Import the database connection module
const cors = require("cors"); // Import CORS to handle cross-origin requests

// Initialize the Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// GET all active fundraisers with their category
app.get("/api/fundraisers", (req, res) => {
  // SQL query to fetch all active fundraisers and their associated categories
  const query = `
        SELECT F.FUNDRAISER_ID, F.ORGANIZER, F.CAPTION, F.TARGET_FUNDING, 
               F.CURRENT_FUNDING, F.CITY, F.ACTIVE, C.NAME AS CATEGORY
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.ACTIVE = 1
    `;

  // Execute the query to fetch the fundraisers
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching fundraisers:", error); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" }); // Return a 500 error response
    }
    res.json(results); // Return the list of fundraisers as a JSON response
  });
});

// GET fundraisers based on search criteria (e.g., organizer, city, category)
app.get("/api/fundraisers/search", (req, res) => {
  const { organizer, city, category } = req.query; // Extract query parameters from the request

  // Base SQL query to fetch active fundraisers
  let query = `
        SELECT F.FUNDRAISER_ID, F.ORGANIZER, F.CAPTION, F.TARGET_FUNDING, 
               F.CURRENT_FUNDING, F.CITY, F.ACTIVE, C.NAME AS CATEGORY
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.ACTIVE = 1
    `;

  // Array to store query parameters for prepared statements
  const queryParams = [];

  // Append search filters if they exist
  if (organizer) {
    query += " AND F.ORGANIZER LIKE ?";
    queryParams.push(`%${organizer}%`); // Add the organizer filter
  }
  if (city) {
    query += " AND F.CITY LIKE ?";
    queryParams.push(`%${city}%`); // Add the city filter
  }
  if (category) {
    query += " AND C.NAME LIKE ?";
    queryParams.push(`%${category}%`); // Add the category filter
  }

  // Execute the query with the specified filters
  dbConnection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error fetching fundraisers:", error); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" }); // Return a 500 error response
    }
    res.json(results); // Return the filtered list of fundraisers
  });
});

// GET fundraiser details by ID
app.get("/api/fundraisers/:id", (req, res) => {
  const fundraiserId = req.params.id; // Extract the fundraiser ID from the URL parameter

  // SQL query to fetch details of a specific fundraiser by ID
  const query = `
        SELECT F.FUNDRAISER_ID, F.ORGANIZER, F.CAPTION, F.TARGET_FUNDING, 
               F.CURRENT_FUNDING, F.CITY, F.ACTIVE, C.NAME AS CATEGORY
        FROM FUNDRAISER F
        JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
        WHERE F.FUNDRAISER_ID = ?
    `;

  // Execute the query to fetch the fundraiser details
  dbConnection.query(query, [fundraiserId], (error, results) => {
    if (error) {
      console.error("Error fetching fundraiser details:", error); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" }); // Return a 500 error response
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Fundraiser not found" }); // Return a 404 response if not found
    }
    res.json(results[0]); // Return the fundraiser details as a JSON response
  });
});

// GET all categories
app.get("/api/categories", (req, res) => {
  // SQL query to fetch all categories
  const query = "SELECT * FROM CATEGORY";

  // Execute the query to fetch categories
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching categories:", error); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" }); // Return a 500 error response
    }
    res.json(results); // Return the list of categories as a JSON response
  });
});

// Set the port number for the server
const PORT = 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server start message
});
