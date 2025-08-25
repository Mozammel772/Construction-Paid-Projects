const express = require("express");
const { getAllSliders, createSlider, deleteSlider } = require("../Controllers/imageTextSliderController");
const router = express.Router();


// Get all sliders
router.get("/", getAllSliders);

// Create a new slider
router.post("/", createSlider);

// Delete a slider
router.delete("/:id", deleteSlider);

module.exports = router;
