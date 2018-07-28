const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const config = require("../config/config");
const User = require("../models/User");

const registerValidation = require("../validaton/register");
const loginValidation = require("../validaton/login");

const router = express.Router();

// Route: /api/auth/login
// Method: POST
// Request Body: username, password
router.post("/login", async function(req, res) {
  try {
    const { errors, isValid } = loginValidation(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errors });
    }
    const username = req.body.username;
    const password = req.body.password;
    const dbUser = await User.findOne({ username });
    if (!dbUser) {
      return res.status(404).json({ error: "Incorrect username" });
    }
    const matched = await bcrypt.compare(password, dbUser.password);
    if (!matched) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const payload = {
      id: dbUser.id,
      name: dbUser.name,
      username: dbUser.username,
      email: dbUser.email
    };
    const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Route: /api/auth/google
// Method: POST
// Request Body: access_token
router.post("/google", function(req, res) {
  const token = req.body.access_token;
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
    )
    .then(async response => {
      const data = response.data;
      const user = await User.findOne({
        $or: [{ email: data.email }, { "social.google.googleId": data.id }]
      });
      if (!user) {
        const newUser = new User({
          name: data.name,
          username: data.email,
          email: data.email,
          social: {
            google: {
              googleId: data.id,
              email: data.email,
              name: data.name
            }
          }
        });
        const savedUser = await newUser.save();
        const payload = {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
          name: savedUser.name
        };
        const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
        return res.status(200).json({ token });
      }
      user.social.google = {
        googleId: data.id,
        email: data.email,
        name: data.name
      };
      const savedUser = await user.save();
      const payload = {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        name: savedUser.name
      };
      const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
      return res.status(200).json({ token });
    })
    .catch(error => {
      res.status(401).json({ error: "Invalid access token" });
    });
});

// Route: /api/auth/facebook
// Method: POST
// Request Body: access_token
router.post("/facebook", function(req, res) {
  const token = req.body.access_token;
  axios
    .get(
      `https://graph.facebook.com/me?fields=name,email&access_token=${token}`
    )
    .then(async response => {
      const data = response.data;
      const user = await User.findOne({
        $or: [{ email: data.email }, { "social.facebook.facebookId": data.id }]
      });
      if (!user) {
        const newUser = new User({
          name: data.name,
          username: data.email,
          email: data.email,
          social: {
            facebook: {
              facebookId: data.id,
              email: data.email,
              name: data.name
            }
          }
        });
        const savedUser = await newUser.save();
        const payload = {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
          name: savedUser.name
        };
        const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
        return res.status(200).json({ token });
      }
      user.social.facebook = {
        facebookId: data.id,
        email: data.email,
        name: data.name
      };
      const savedUser = await user.save();
      const payload = {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        name: savedUser.name
      };
      const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
      return res.status(200).json({ token });
    })
    .catch(error => {
      res.status(401).json({ error: "Invalid access token" });
    });
});

// Route: /api/auth/register
// Method: POST
// Request Body: name, username, email, password
router.post("/register", async function(req, res) {
  try {
    const { errors, isValid } = registerValidation(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errors });
    }
    const dbUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    if (dbUser) {
      return res.status(400).json({ error: "User already exist" });
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
