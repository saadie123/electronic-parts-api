const fs = require("fs");
const path = require("path");

fs.unlink(
  path.join(
    __dirname,
    "..",
    "/attachments/pdf/Course Outline - Web Systems and Technologies (CS-305).pdf"
  ),
  err => {
    if (err) console.log(err);
  }
);
