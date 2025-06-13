const { ObjectId } = require("mongodb");
const { getBlogsCollection } = require("../config/db");


const blogsCollection = getBlogsCollection();
// Create a blog post
const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    blogData.createdAt = new Date().toISOString();

    const result = await blogsCollection.insertOne(blogData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Blog create error:", error);
    res.status(500).json({ message: "Failed to create blog post." });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({ message: "Failed to fetch blogs." });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Get blog by ID error:", error);
    res.status(500).json({ message: "Failed to fetch blog." });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Failed to delete blog." });
  }
};
// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ message: "Failed to update blog." });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  updateBlog
};
