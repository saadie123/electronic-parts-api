const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "{VALUE} is not a valid email address"
    }
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  social: {
    google: {
      googleId: String,
      email: String,
      name: String
    },
    facebook: {
      facebookId: String,
      email: String,
      name: String
    }
  }
});

module.exports = mongoose.model("users", userSchema);
