module.exports = app => {
const router = require('express').Router();
const jhas = require("../controllers/controller.js");

// Create a new Jha
router.post("/", jhas.create);

// Retrieve all Jhas
router.get("/", jhas.findAll);

// Retrieve a single Jha with id
router.get("/:id", jhas.findOne);

// Update a Jha with id
router.put("/:id", jhas.update);

// Delete a Jha with id
router.delete("/:id", jhas.delete);

app.use('/api/jhas', router);
};