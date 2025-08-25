const { ObjectId } = require("mongodb");
const { getImageTextSliderRoutesCollection } = require("../config/db");

const imageSliderCollection = getImageTextSliderRoutesCollection();

// Create a new slider entry
const createSlider = async (req, res) => {
  try {
    const sliderData = req.body;
    console.log(req.body)
    sliderData.createdAt = new Date().toISOString();
    const result = await imageSliderCollection.insertOne(sliderData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create slider error:", error);
    res.status(500).json({ message: "Failed to create slider entry." });
  }
};

// Get all slider entries
const getAllSliders = async (req, res) => {
  try {
    const sliders = await imageSliderCollection.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(sliders);
  } catch (error) {
    console.error("Get sliders error:", error);
    res.status(500).json({ message: "Failed to fetch sliders." });
  }
};

// Delete a slider
const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await imageSliderCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Slider not found" });
    }

    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    console.error("Delete slider error:", error);
    res.status(500).json({ message: "Failed to delete slider." });
  }
};

module.exports = {
  createSlider,
  getAllSliders,
  deleteSlider,
};
