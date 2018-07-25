const express = require("express");
const passport = require("passport");
const Category = require("../models/Category");

const router = express.Router();

// Route: /api/categories
// Method: GET
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const categories = await Category.find({ user: req.user.id });
      res.json(categories);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/categories/:id
// Method: GET
// Route Params: id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const id = req.params.id;
      const categories = await Category.findOne({ _id: id, user: req.user.id });
      if (!categories) {
        return res.status(404).json({ error: "No category was found" });
      }
      res.json(categories);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/categories
// Method: POST
// Request Body: name, description, parentCategory(ObjectId:optional)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      let parentCategory = req.body.parentCategory;
      let newCategory = new Category({
        name: req.body.name,
        description: req.body.description,
        user: req.user.id
      });
      let category = await newCategory.save();
      if (parentCategory) {
        let updatedCategory = await Category.findByIdAndUpdate(
          parentCategory,
          { $push: { subCategories: category.id } },
          { new: true }
        );
        return res.json(updatedCategory);
      }
      res.json(category);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/categories/:id
// Method: PUT
// Route Params: id
// Request Body: name, description
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const id = req.params.id;
      const payload = {
        name: req.body.name,
        description: req.body.description
      };
      const category = await Category.findOneAndUpdate(
        { _id: id, user: req.user.id },
        { $set: payload },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ error: "Category was not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/categories/:id
// Method: DELETE
// Route Params: id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.findOneAndRemove({
        _id: id,
        user: req.user.id
      });
      if (!category) {
        return res.status(404).json({ error: "Category was not found" });
      }
      await Category.findOneAndUpdate(
        { subCategories: { $in: [category.id] } },
        { $pull: { subCategories: category.id } }
      );
      res.json(category);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = router;
