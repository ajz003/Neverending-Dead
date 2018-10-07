// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force:true}).then(function () {
  db.Enemy.create({name:"Zombie", img:"https://c1.staticflickr.com/4/3084/2596483147_58d6bae3b1_b.jpg", hp:"100", attack:"20", position:"0"});
  db.Enemy.create({name:"Lich King", img:"https://orig00.deviantart.net/b15b/f/2017/305/5/3/the_lich_king_by_ze_l-dbsdieg.jpg", hp:"1000", attack:"90", position:"1"});
  app.listen(PORT, function () {
    console.log(`\nServer listening on: http://localhost:${PORT}\n`);
  });
});