const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, interest } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        interest,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    interest: user.interest
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login Successful",
  token,
  user,
});
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.get("/profile", protect, async (req, res) => {
  res.json({
    message: "Protected Profile Access Granted",
    user: req.user,
  });
});
router.get("/debug-user", protect, (req, res) => {
  res.json(req.user);
});
module.exports = router;