const db = require("../models/db");

// Get all active fundraisers
exports.getAllActiveFundraisers = (req, res) => {
  const query = "SELECT * FROM fundraiser WHERE ACTIVE = 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log the detailed error
      return res
        .status(500)
        .json({ error: "Database query error", details: err.message });
    }
    res.json(results);
  });
};

// Get all categories
exports.getAllCategories = (req, res) => {
  const query = "SELECT * FROM category";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log the detailed error
      return res
        .status(500)
        .json({ error: "Database query error", details: err.message });
    }
    res.json(results);
  });
};

// Search fundraisers by criteria
exports.searchFundraisers = (req, res) => {
  const { caption, category } = req.query;
  let query = "SELECT * FROM fundraiser WHERE ACTIVE = 1";

  if (caption) {
    query += ` AND caption LIKE '%${caption}%'`;
  }
  if (category) {
    query += ` AND category_id = '${category}'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log the detailed error
      return res
        .status(500)
        .json({ error: "Database query error", details: err.message });
    }
    res.json(results);
  });
};

// Get fundraiser by ID
exports.getFundraiserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM fundraiser WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log the detailed error
      return res
        .status(500)
        .json({ error: "Database query error", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Fundraiser not found" });
    }
    res.json(results[0]);
  });
};
