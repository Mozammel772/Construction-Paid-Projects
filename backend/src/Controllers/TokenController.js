const { getTokenCollection } = require("../config/db");
const { generate10DigitToken } = require("../utils/generate10DigitToken");


const admingenerateToken = async (req, res) => {
  try {
    const db = getTokenCollection();
    const token = generate10DigitToken();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 30 * 60 * 1000); // 30 minutes

    await db.insertOne({
      token,
      createdAt,
      expiresAt,
      used: false,
    });

    res.status(201).json({
      message: "Token generated successfully",
      token,
      expiresAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Token generation failed", error: error.message });
  }
};

module.exports = { admingenerateToken };
