const sql = require("./db.js");

// constructor
const Jha = function(jha) {
  this.site = jha.site;
  this.dept = jha.dept;
  this.ap = jha.ap;
  this.br = jha.br;
  this.job = jha.job;
  this.supervisor = jha.supervisor;
  this.prepared = jha.prepared;
  this.date = jha.date;
  this.steps = jha.steps;
  this.training = jha.training;
  this.ppe = jha.ppe;
}

Jha.create = (newJha, result) => {
  sql.query("INSERT INTO jhas SET ?", newJha, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created jha: ", { id: res.insertId, ...newJha });
    result(null, { id: res.insertId, ...newJha });
  });
};

Jha.findById = (id, result) => {
  sql.query(`SELECT * FROM jhas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found jha: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Jha with the id
    result({ kind: "not_found" }, null);
  });
};

Jha.getAll = (result) => {
  let query = "SELECT * FROM jhas";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("jhas: ", res);
    result(null, res);
  });
};

Jha.updateById = (id, jha, result) => {
  sql.query(
    "UPDATE jhas SET site = ?, dept = ?, ap = ?, br = ?, job = ?, supervisor = ?, prepared = ?, date = ?, steps = ?, training = ?, ppe = ? WHERE id = ?",
    [jha.site, jha.dept, jha.ap, jha.br, jha.job, jha.supervisor, jha.prepared, jha.date, jha.steps, jha.training, jha.ppe, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Jha with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated jha: ", { id: id, ...jha });
      result(null, { id: id, ...jha });
    }
  );
};

Jha.remove = (id, result) => {
  sql.query("DELETE FROM jhas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Jha with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted jha with id: ", id);
    result(null, res);
  });
};

module.exports = Jha;
  