const moment = require("moment");
const { getUserCollection } = require("../config/db");
const { ObjectId } = require("mongodb");
const userCollection = getUserCollection();
const admin = require("../config/firebaseAdmin");

const registerUser = async (req, res) => {
  const user = req.body;

  try {
    // Check if user already exists (including partial records)
    const existingUser = await userCollection.findOne({ email: user.email });

    if (existingUser) {
      console.log("Existing user found:", existingUser);

      // If it's a partial record (only email and lastActive), update it
      if (!existingUser.name && !existingUser.phone) {
        console.log("Updating partial user record with complete information");

        const totalUsers = await userCollection.estimatedDocumentCount();
        const role = totalUsers === 1 ? "admin" : "user"; // Adjust logic as needed

        const updatedUser = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          instituteName: user.instituteName || "",
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          role,
          imgUrl: "https://i.ibb.co/4Vg7qxJ/4042356.png",
          lastActive: Date.now(),
        };

        const result = await userCollection.updateOne(
          { email: user.email },
          { $set: updatedUser }
        );

        console.log("User updated successfully:", result);
        return res.send({
          success: true,
          message: "User registration completed",
        });
      } else {
        // Complete user already exists
        console.log("Complete user already exists");
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      }
    }

    // No existing user, create new one
    const totalUsers = await userCollection.estimatedDocumentCount();
    const role = totalUsers === 0 ? "admin" : "user";

    const newUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      ProjectsName: user.ProjectsName || "",
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      role,
      imageUrl: "https://i.ibb.co/4Vg7qxJ/4042356.png",
      lastActive: Date.now(),
    };

    const result = await userCollection.insertOne(newUser);
    console.log("New user created successfully:", result.insertedId);
    res.send({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    res.status(500).send({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

const getUserRole = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ role: "user" });
    }
    res.json({ role: user.role });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await userCollection.countDocuments();
    const users = await userCollection.find().skip(skip).limit(limit).toArray();

    res.json({
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Delete from Firebase (by email)
    const firebaseUser = await admin.auth().getUserByEmail(user.email);
    await admin.auth().deleteUser(firebaseUser.uid);

    // Delete from MongoDB
    await userCollection.deleteOne({ _id: new ObjectId(id) });

    res.send({
      success: true,
      message: "User deleted from both Firebase and MongoDB",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
const updateUserProfile = async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  try {
    // Find the user by email
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Optional: Prevent changing email
    if (updatedData.email && updatedData.email !== email) {
      return res
        .status(400)
        .send({ success: false, message: "Email cannot be changed" });
    }

    updatedData.lastActive = Date.now();

    const result = await userCollection.updateOne(
      { email },
      { $set: updatedData }
    );

    if (result.modifiedCount > 0) {
      res.send({ success: true, message: "User profile updated successfully" });
    } else {
      res.send({ success: false, message: "No changes were made" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserRole,
  getAllUsers,
  getUserByEmail,
  updateUserProfile,
  deleteUser,
};
