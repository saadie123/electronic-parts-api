const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  },
  location: {
    type: String,
    required: true
  },
  footprint: {
    type: String,
    required: true
  },
  attachments: [
    {
      fileName: String,
      fileExt: String,
      filePath: String,
      fileURL: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = mongoose.model("items", itemSchema);
