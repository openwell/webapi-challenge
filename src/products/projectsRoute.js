const express = require("express");
const db = require("../../data/helpers/projectModel");

const route = express.Router();

route.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing project data"
    });
  } else if (!name || !description) {
    return res.status(400).json({
      message: "invalid project name or description"
    });
  }
  try {
    db.insert(req.body).then(data => {
      return res.status(200).json({
        data: data
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
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

route.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (!req.body) {
    return res.status(400).json({
      message: "missing project data"
    });
  } else if (!name || !description) {
    return res.status(400).json({
      message: "invalid project name or description"
    });
  } else if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "invalid id"
    });
  }
  try {
    db.update(id, req.body).then(data => {
      if (data === null) {
        return res.status(200).json({
          message: "invalid id"
        });
      }
      return res.status(200).json({
        data: data
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = route;
