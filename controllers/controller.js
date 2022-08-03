const Jha = require("../models/jha.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Jha
  const jha = new Jha({
    site: req.body.site,
    dept: req.body.dept,
    ap: req.body.ap,
    br: req.body.br,
    job: req.body.job,
    supervisor: req.body.supervisor,
    prepared: req.body.prepared,
    date: req.body.date,
    steps: req.body.steps,
    training: req.body.training,
    ppe: req.body.ppe
  });

  // Save Jha in the database
  Jha.create(jha, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Jha."
      });
    else res.send(data);
  });
};

// Retrieve all Jhas from the database
exports.findAll = (req, res) => {

  Jha.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jhas."
      });
    else res.send(data);
  });
};

// Find a single Jha by Id
exports.findOne = (req, res) => {
  Jha.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Jha with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Jha with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Jha identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Jha.updateById(
    req.params.id,
    new Jha(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Jha with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Jha with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Jha with the specified id in the request
exports.delete = (req, res) => {
  Jha.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Jha with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Jha with id " + req.params.id
        });
      }
    } else res.send({ message: `Jha was deleted successfully!` });
  });
};