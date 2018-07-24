const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
