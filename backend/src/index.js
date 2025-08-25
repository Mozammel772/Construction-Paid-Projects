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
const tokenRoutes = require("./routes/tokenRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const beforeAfterRoutes = require("./routes/beforeAfterRoutes")
const imageTextSliderRoutes = require("./routes/imageTextSliderRoutes")

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin); // reflect the request origin
    },
    credentials: true,
  })
);

app.use(cookieParser());

// Connect to MongoDB
connectDB().catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/blog", blogRouter);
app.use("/api", bookingRouter);
app.use("/api", onsiteVisitRoutes);
app.use("/token", tokenRoutes);
app.use("/review", reviewRoutes);
app.use("/beforeafterimage", beforeAfterRoutes);
app.use("/imagetextslider", imageTextSliderRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("🚀 Network Online Service Server is Running!");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
