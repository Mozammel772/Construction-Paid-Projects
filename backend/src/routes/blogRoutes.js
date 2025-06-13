const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
} = require("../Controllers/blogController");
const router = express.Router();

router.post("/blog", createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.delete("/blog/:id", deleteBlog);
router.put("/blog/:id", updateBlog);
module.exports = router;
