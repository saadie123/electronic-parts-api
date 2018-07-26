const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

const server = express();
mongoose.connect(
  config.mongoDbURL,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

require("./config/passport")(passport);

server.use("/api/auth", authRoutes);
server.use("/api/categories", categoryRoutes);
server.use("/api/items", itemRoutes);

const port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
