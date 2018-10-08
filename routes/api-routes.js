// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var connection = require("../config/connection.js");
var Sequelize = require('sequelize');
// Routes
// =============================================================
module.exports = function (app) {

  app.get("/api/enemy/count", function (req, res) {
    db.Enemy.count()
    .then(function (count) {
        res.json(count);
      });
  });

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
    let insertPosition = req.body.position - 1;

    db.Enemy.update({
        position: Sequelize.literal('position + 1'),
      }, {
        where: {
          position: {
            $gte: insertPosition
          }
        }
      }).then(function () {
        db.Enemy.create({
          name: "Zombie " + req.body.name,
          img: req.body.img,
          hp: req.body.hp,
          attack: req.body.attack,
          position: req.body.position - 1
        })
      })
      .then(function (newEnemy) {
        res.json(newEnemy);
      })

  })

}