const express = require("express");
const db = require("../../data/helpers/actionModel");

const route = express.Router();

route.post("/", (req, res) => {
  
});

route.get("/", (req, res) => {
  try {
    db.get().then(data => {
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.delete("/:id", (req, res) => {});

route.put("/:id", (req, res) => {});

module.exports = route;
