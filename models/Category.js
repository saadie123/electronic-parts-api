const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  sub: {
    type: Boolean,
    default: false
  }
});

let autoPopulateChildren = function(next) {
  this.populate("subCategories");
  next();
};

categorySchema.pre("find", autoPopulateChildren);
categorySchema.pre("findOne", autoPopulateChildren);
module.exports = mongoose.model("categories", categorySchema);
