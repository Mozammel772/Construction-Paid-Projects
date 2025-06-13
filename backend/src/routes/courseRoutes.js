const express = require("express")
const {
    getAllCourse,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addContent,
    updateContent,
    deleteContent,
    bulkAddContent,
    reorderContents,
    enrollStudent,
} = require("../Controllers/courseController")
const router = express.Router()

// Middleware to verify admin status (placeholder - implement your actual auth logic)
const verifyAdmin = (req, res, next) => {
    // In a real implementation, you would check JWT token, session, etc.
    // Example: if (req.user && req.user.role === 'admin')

    // For now, we'll just continue
    next()

    // If not admin, you would return:
    // return res.status(403).json({ success: false, message: "Unauthorized. Admin access required." });
}

// Existing route (keep for backward compatibility)
router.get("/get-all-course", getAllCourse)

// New admin API routes
router.get("/courses", verifyAdmin, getAllCourse)
router.get("/courses/:id", verifyAdmin, getCourse)
router.post("/courses", verifyAdmin, createCourse)
router.put("/courses/:id", verifyAdmin, updateCourse)
router.delete("/courses/:id", verifyAdmin, deleteCourse)

// Content management routes
router.post("/courses/:id/contents", verifyAdmin, addContent)
router.put("/courses/:courseId/contents/:contentId", verifyAdmin, updateContent)
router.delete("/courses/:courseId/contents/:contentId", verifyAdmin, deleteContent)
router.post("/courses/:id/contents/bulk", verifyAdmin, bulkAddContent)
router.put("/courses/:id/contents/reorder", verifyAdmin, reorderContents)

// Student enrollment route
router.post("/enroll", enrollStudent)
module.exports = router
