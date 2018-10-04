// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../../models");
var connection = require("../../config/connection.js");
// Routes
// =============================================================
module.exports = function (app) {



  // Get route for retrieving a single enemy
  app.get("/api/enemy/:position", function (req, res) {
    db.Enemy.findOne({
        where: {
          position: req.params.position
        }
      })
      .then(function (enemy) {
        res.json(enemy);
      });
  });

  // POST route for saving a new enemy
  app.post("/api/enemy", function (req, res) {
    console.log(req.body.position);
    let queryString = "UPDATE enemies SET position = position + 1 where position >= 1";
    db.sequelize.query(queryString, function (err, result) {
      if(err) {throw err;}
      console.log(result);

    });

    db.Enemy.create({
        name: req.body.name,
        img: req.body.img,
        hp: req.body.hp,
        attack: req.body.attack,
        position: req.body.position - 1
      })
      .then(function (newEnemy) {
        res.json(newEnemy);
      });
  });



};