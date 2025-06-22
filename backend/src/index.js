const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const onsiteVisitRoutes = require("./routes/onsiteVisitRoutes");

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB().catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/blog", blogRouter);
app.use("/api", bookingRouter);
app.use("/api", onsiteVisitRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("🚀 Network Online Service Server is Running!");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
