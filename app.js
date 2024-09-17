const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Import routes
const fundraiserRoutes = require("./routes/fundraiserRoutes");

// Use routes
app.use("/api/fundraisers", fundraiserRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
