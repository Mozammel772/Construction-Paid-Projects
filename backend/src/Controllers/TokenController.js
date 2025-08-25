const { getTokenCollection } = require("../config/db");
const { generate10DigitToken } = require("../utils/generate10DigitToken");

const admingenerateToken = async (req, res) => {
  try {
    const db = getTokenCollection();
    const token = generate10DigitToken();
    const createdAt = new Date();

    // expiresAt বাদ দেয়া হলো, token কখনো expire হবে না
    await db.insertOne({
      token,
      createdAt,
      used: false,
    });

    res.status(201).json({
      message: "Token generated successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Token generation failed", error: error.message });
  }
};

module.exports = { admingenerateToken };
