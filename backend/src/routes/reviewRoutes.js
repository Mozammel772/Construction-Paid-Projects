const express = require("express");
const { createReview, getAllReviews, getReviewById, updateReview, deleteReview, acceptReview, rejectReview } = require("../Controllers/review.controller");


const router = express.Router();

// User
router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

// Admin
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.patch("/:id/accept", acceptReview);
router.patch("/:id/reject", rejectReview);

module.exports = router;
