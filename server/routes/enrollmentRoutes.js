const express = require("express");

const router = express.Router();

const Enrollment = require("../models/Enrollment");

const protect = require("../middleware/authMiddleware");

router.post("/enroll", protect, async (req, res) => {
  try {
    const { courseId } = req.body;

    const enrollmentExists = await Enrollment.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (enrollmentExists) {
      return res.status(400).json({
        message: "Already enrolled in this course",
      });
    }

    const enrollment = new Enrollment({
      user: req.user.id,
      course: courseId,
    });

    await enrollment.save();

    res.status(201).json({
      message: "Course Enrolled Successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/my-courses", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.put("/progress/:id", protect, async (req, res) => {
  try {
    const { progress } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    // Update progress
    enrollment.progress = progress;

    await enrollment.save();

    res.json({
      message: "Progress Updated Successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
module.exports = router;