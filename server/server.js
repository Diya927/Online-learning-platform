const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const enrollmentRoutes = require("./routes/enrollmentRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/recommendations", recommendationRoutes);

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);
app.get("/", (req, res) => {
  res.send("Backend API Running");
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});