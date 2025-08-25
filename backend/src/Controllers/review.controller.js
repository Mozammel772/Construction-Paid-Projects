const { ObjectId } = require("mongodb");
const { getReviewsCollection } = require("../config/db");

const reviewsCollection = getReviewsCollection();

// Create a review (default status: pending)
const createReview = async (req, res) => {
  try {
    const reviewData = req.body;
    reviewData.createdAt = new Date().toISOString();
    reviewData.status = "pending"; // default status

    const result = await reviewsCollection.insertOne(reviewData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Review create error:", error);
    res.status(500).json({ message: "Failed to create review." });
  }
};

// Get all reviews (filter by status/email optional)
const getAllReviews = async (req, res) => {
  try {
    const { email, status } = req.query;

    const filter = {};
    if (email) filter.email = email;
    if (status) filter.status = status;

    const reviews = await reviewsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
};

// Get a single review by ID
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Get review by ID error:", error);
    res.status(500).json({ message: "Failed to fetch review." });
  }
};

// Update review content (admin/edit)
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: "Failed to update review." });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Failed to delete review." });
  }
};

// Accept review (status -> accepted)
const acceptReview = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "accepted" } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review accepted successfully" });
  } catch (error) {
    console.error("Accept review error:", error);
    res.status(500).json({ message: "Failed to accept review." });
  }
};

// Reject review (status -> rejected)
const rejectReview = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "rejected" } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review rejected successfully" });
  } catch (error) {
    console.error("Reject review error:", error);
    res.status(500).json({ message: "Failed to reject review." });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  acceptReview,
  rejectReview,
};
