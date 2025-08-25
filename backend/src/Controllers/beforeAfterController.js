const { ObjectId } = require("mongodb");
const { getBeforeafterimageCollection } = require("../config/db");

const blogsCollection = getBeforeafterimageCollection();

// Create before-after blog
const createBeforeAfter = async (req, res) => {
  try {
    const data = req.body;
    data.createdAt = new Date().toISOString();

    const result = await blogsCollection.insertOne(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Failed to create before/after blog." });
  }
};

// Get all before-after blogs
const getBeforeAfterAll = async (req, res) => {
  try {
    const blogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch before/after blogs." });
  }
};

// Delete blog by ID
const deleteBeforeAfter = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete blog." });
  }
};

module.exports = {
  createBeforeAfter,
  getBeforeAfterAll,
  deleteBeforeAfter,
};
