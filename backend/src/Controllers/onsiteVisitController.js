const { ObjectId } = require("mongodb");
const { getOnSiteVisitCollection } = require("../config/db");

const createOnSiteVisit = async (req, res) => {
  try {
    const { date, time, message, email, name, image } = req.body;

    const bookingDateTime = new Date(`${date}T${time}`);

    const visit = {
      bookingDateTime,
      message,
      email,
      name,
      image: image || "",
      status: "unsolved",  // ডিফল্ট স্টেটাস
      createdAt: new Date(),
    };

    const collection = getOnSiteVisitCollection();
    await collection.insertOne(visit);

    res.status(201).json({ message: "On-site visit request submitted successfully." });
  } catch (err) {
    console.error("Error creating on-site visit:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOnSiteVisits = async (req, res) => {
  try {
    const collection = getOnSiteVisitCollection();

    const visits = await collection
      .find({})
      .sort({ bookingDateTime: -1 })
      .toArray();

    res.status(200).json(visits);
  } catch (err) {
    console.error("Error fetching on-site visits:", err);
    res.status(500).json({ message: "Failed to fetch on-site visits" });
  }
};

const updateOnSiteVisitStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const collection = getOnSiteVisitCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Status updated successfully." });
    } else {
      res.status(404).json({ message: "Request not found." });
    }
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

module.exports = {
  createOnSiteVisit,
  getAllOnSiteVisits,
  updateOnSiteVisitStatus,
};
