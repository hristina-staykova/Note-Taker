const express = require("express");
var path = require("path");
var app = express();
var PORT = 4000;

let notes = [];

// Listening the PORT
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing
// get notes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// get homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// get notes api
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// post new note and get notes api
app.post("/api/notes", function(req, res) {
  req.body = push(notes);
  return res.json(notes);
});
