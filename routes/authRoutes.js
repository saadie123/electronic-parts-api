const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerValidation = require("../validaton/register");

const router = express.Router();

router.post("/register", async function(req, res) {
  try {
    const { errors, isValid } = registerValidation(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errors });
    }
    const dbUser = await User.findOne({ username: req.body.username });
    if (dbUser) {
      return res.status(400).json({ error: "Username is already in use" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: hash
    });
    const user = await newUser.save();
    const response = {
      username: user.username,
      email: user.email,
      name: user.name
    };
    return res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
