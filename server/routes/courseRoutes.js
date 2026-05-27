const express = require("express");

const router = express.Router();

const Course = require("../models/Course");

router.post("/add", async (req, res) => {
  try {
    const { title, description, category, level, duration, tags } = req.body;

    const newCourse = new Course({
      title,
      description,
      category,
      level,
      duration,
      tags,
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course Added Successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log("COURSE ADD ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;