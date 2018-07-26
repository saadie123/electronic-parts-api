const express = require("express");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const fs = require("fs");
const Item = require("../models/Item");

const router = express.Router();

// Route: /api/items
// Method: GET
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const items = await Item.find({ user: req.user.id }).populate("category");
      if (items.length === 0) {
        return res.status(404).json({ error: "No items were found" });
      }
      res.status(200).json(items);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/items/category/:categoryId
// Method: GET
// Route Params: categoryId
router.get(
  "/category/:categoryId",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const items = await Item.find({
        category: categoryId,
        user: req.user.id
      }).populate("category");
      if (items.length === 0) {
        return res.status(404).json({ error: "No items were found" });
      }
      res.json(items);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/items
// Method: GET
// Route Params: id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const id = req.params.id;
      const item = await Item.findOne({ _id: id, user: req.user.id }).populate(
        "category"
      );
      if (!item) {
        return res.status(404).json({ error: "No items was found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/items/:id/attachment/:fileExt
// Method: GET
// Route Params: id(itemId), fileName
router.get(
  "/:id/attachment/:fileName",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const id = req.params.id;
      const fileName = req.params.fileName;
      const item = await Item.findOne({ _id: id, user: req.user.id });
      if (!item) {
        return res.status(404).json({ error: "No item was found" });
      }
      let attachment = item.attachments.find(file => {
        return file.fileName === fileName;
      });
      res.sendFile(path.join(__dirname, "..", attachment.filePath));
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let directory = "./attachments/other/";
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      directory = "./attachments/images/";
    }
    if (file.mimetype === "application/pdf") {
      directory = "./attachments/pdf/";
    }
    cb(null, directory);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Route: /api/items
// Method: POST
// Request Body: name,quantity, description,category(ObjectId),location,footprint, attachments(files:optional)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.array("attachments"),
  async function(req, res) {
    try {
      const oldItem = await Item.findOne({ name: req.body.name });
      if (oldItem) {
        let file = oldItem.attachments.find(item => {
          let found = false;
          for (let file of req.files) {
            if (item.fileName === file.originalname) {
              found = true;
            }
          }
          return found;
        });
        if (!file) {
          req.files.forEach(file => {
            fs.unlink(path.join(__dirname, "..", file.path), err => {
              if (err) return res.status(400).json(err);
            });
          });
        }
        return res.status(400).json({ error: "You already have this item" });
      }
      const newItem = new Item({
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        footprint: req.body.footprint,
        user: req.user.id
      });
      const item = await newItem.save();
      let attachments = null;
      if (req.files.length > 0) {
        attachments = req.files.map(file => {
          let filenameArray = file.filename.split(".");
          let fileExt = filenameArray[filenameArray.length - 1];
          return {
            fileName: file.originalname,
            fileExt: fileExt,
            filePath: file.path,
            fileURL: `${req.headers.host}/api/items/${item.id}/attachment/${
              file.originalname
            }`
          };
        });
      }
      item.attachments = attachments;
      await item.save();
      res.json(item);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/items
// Method: PUT
// Route Params: id
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.array("attachments"),
  async function(req, res) {
    try {
      const id = req.params.id;
      const payload = req.body;
      const updatedItem = await Item.findOneAndUpdate(
        { _id: id, user: req.user.id },
        { $set: payload },
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ error: "Item was not found" });
      }
      if (req.files.length > 0) {
        let attachments;
        attachments = req.files.map(file => {
          let filenameArray = file.filename.split(".");
          let fileExt = filenameArray[filenameArray.length - 1];
          return {
            fileName: file.originalname,
            fileExt: fileExt,
            filePath: file.path,
            fileURL: `${req.headers.host}/api/items/${
              updatedItem.id
            }/attachment/${file.originalname}`
          };
        });
        updatedItem.attachments.forEach(item => {
          let file = attachments.find(file => file.fileName === item.fileName);
          if (!file) {
            fs.unlink(path.join(__dirname, "..", item.filePath), err => {
              if (err) return res.status(400).json(err);
            });
          }
        });
        updatedItem.attachments = attachments;
        await updatedItem.save();
      }
      return res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

// Route: /api/items
// Method: DELETE
// Route Params: id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function(req, res) {
    try {
      const id = req.params.id;
      const item = await Item.findOneAndRemove({ _id: id, user: req.user.id });
      if (!item) {
        return res.status(404).json({ error: "Item was not found" });
      }
      if (item.attachments.length > 0) {
        for (let file of item.attachments) {
          if (fs.existsSync(path.join(__dirname, "..", file.filePath))) {
            fs.unlink(path.join(__dirname, "..", file.filePath), err => {
              if (err) return res.status(400).json(err);
            });
          }
        }
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
module.exports = router;
