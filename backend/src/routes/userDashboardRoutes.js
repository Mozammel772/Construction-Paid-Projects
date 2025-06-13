const express = require("express")
const router = express.Router()
const { getUserDashboard, updateUserProgress } = require("../Controllers/userDashboardController")
const { verifyToken } = require("../middleware/authMiddleware")

// Get user dashboard data (requires authentication)
router.get("/dashboard/:email", getUserDashboard)

// Update user progress for a course
router.put("/progress/:email", updateUserProgress)

module.exports = router
