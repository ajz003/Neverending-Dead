// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../../models");

// Routes
// =============================================================
module.exports = function(app) {



  // Get route for retrieving a single enemy
  app.get("/api/enemy/:position", function(req, res) {
    db.Enemy.findOne({
      where: {
        position: req.params.position
      }
    })
      .then(function(enemy) {
        res.json(enemy);
      });
  });

  // POST route for saving a new enemy
  app.post("/api/enemy", function(req, res) {
    console.log(req.body);
    db.Enemy.create({
      name: req.body.name,
      img: req.body.img,
      hp: req.body.hp,
      attack: req.body.hp,
      position:req.body.position
    })
      .then(function(newEnemy) {
        res.json(newEnemy);
      });
  });

  // // DELETE route for deleting posts
  // app.delete("/api/enemy/:id", function(req, res) {
  //   db.Enemy.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(enemy) {
  //       res.json(enemy);
  //     });
  // });

};
