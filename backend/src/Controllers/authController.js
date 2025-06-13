const jwt = require("jsonwebtoken");
const moment = require("moment");
const { getUserCollection } = require("../config/db");


const login = async (req, res) => {
  const { email } = req.body

  try {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    })

    const userCollection = getUserCollection()

    // Only update lastActive for existing users, don't create new ones
    const result = await userCollection.updateOne(
      { email },
      { $set: { lastActive: Date.now() } },
      // Remove { upsert: true } to prevent creating new users
    )

    if (result.matchedCount === 0) {
      console.log("User not found in database during login:", email)
      // You might want to handle this case differently
      // For now, we'll still set the cookie but log the issue
    }

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).send({ success: false, message: "Login failed" })
  }
}


const logout = (req, res) => {
  res
    .clearCookie("token", {
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
};

const ping = async (req, res) => {
  const userCollection = getUserCollection();
  await userCollection.updateOne(
    { email: req.user.email },
    { $set: { lastActive: Date.now() } }
  );
  res.send({ success: true });
};

module.exports = { login, logout, ping };
