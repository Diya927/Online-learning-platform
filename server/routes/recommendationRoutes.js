const express = require("express");

const router = express.Router();

const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  try {
    console.log("USER:", req.user);

    const courses = await Course.find();

    const userInterest = req.user.interest?.toLowerCase();

    // SAFE fallback if interest missing
    if (!userInterest) {
      return res.json(courses);
    }

    // 🔥 STEP 2 ADDITION: get enrolled courses
    const enrollments = await Enrollment.find({ user: req.user.id });

    const enrolledIds = enrollments.map((e) =>
      e.course.toString()
    );

    // 🔥 filter recommendations
    const recommended = courses.filter((course) => {
      const category = course.category?.toLowerCase() || "";

      return (
        category.includes(userInterest) &&
        !enrolledIds.includes(course._id.toString())
      );
    });

    // fallback
    if (recommended.length === 0) {
      return res.json(courses);
    }

    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;