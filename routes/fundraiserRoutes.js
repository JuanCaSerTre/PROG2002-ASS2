const express = require("express");
const router = express.Router();
const fundraiserController = require("../controllers/fundraiserController");

// Route to fetch all active fundraisers
router.get("/", fundraiserController.getAllActiveFundraisers);

// Route to fetch all categories
router.get("/categories", fundraiserController.getAllCategories);

// Route to fetch fundraisers by search criteria
router.get("/search", fundraiserController.searchFundraisers);

// Route to fetch a fundraiser by ID
router.get("/:id", fundraiserController.getFundraiserById);

module.exports = router;
