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
app.use(express.static("assets"));

// Routes
// =============================================================
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function () {
  // db.Enemy.create({name:"Naked Zombie", hp:"100", attack:"20", position:"0", boss: "0"});
  // db.Enemy.create({name:"King of the Undead", hp:"10000", attack:"200", position:"1", boss:"1"});
  app.listen(PORT, function () {
    console.log(`\nServer listening on: http://localhost:${PORT}\n`);
  });
});