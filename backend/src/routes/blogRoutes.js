const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
  acceptBlog,
  rejectBlog,
} = require("../Controllers/blogController");
const router = express.Router();

router.post("/blog", createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", getBlogById);
router.delete("/blog/:id", deleteBlog);
router.put("/blog/:id", updateBlog);
// Admin-only approval routes
router.patch("/blog/accept/:id", acceptBlog);
router.patch("/blog/reject/:id", rejectBlog);
module.exports = router;
