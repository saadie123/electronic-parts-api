const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.username, { min: 6, max: 15 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
