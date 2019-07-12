const express = require("express");
const db = require("../../data/helpers/actionModel");

const route = express.Router();

route.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing project data"
    });
  } else if (!project_id || !description || !notes || !completed) {
    return res.status(400).json({
      message: "Missing project_id/description/notes/completed"
    });
  }
  try {
    db.get(project_id).then(data => {
      if (Object.keys(data).length >= 1) {
        db.insert(req.body).then(data => {
          return res.status(200).json({
            data: data
          });
        });
      } else {
        return res.status(400).json({
          message: "Invalid Project_id"
        });
      }
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
  const { project_id, description, notes, completed } = req.body;
  const { id } = req.params;
  if (!req.body) {
    return res.status(400).json({
      message: "missing actions data"
    });
  } else if (!project_id || !description || !notes || !completed) {
    return res.status(400).json({
      message: "Missing project_id/description/notes/completed"
    });
  } else if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "invalid id"
    });
  }
  try {
    db.get(id).then(data => {
      if (Object.keys(data).length >= 1) {
        db.update(id, req.body).then(data => {
          return res.status(200).json({
            data: data
          });
        });
      } else {
        return res.status(400).json({
          message: "Invalid Action id"
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = route;
