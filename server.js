var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = 4000;

//read the db.json file and store the content
let notes = require("./db/db.json");

//error/callback function
var errorFn = function(err) {
  if (err) throw err;
};

// Listening the PORT
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//to handle the loading of static files (incl. css file)
app.use(express.static(__dirname + "/public"));

//Routing
// get notes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/notes.html"));
});

// get homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// get notes api
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// post new note, add ID (a random number between 0 and 1000), update the db.json
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  notes.push(newNote);
  newNote.id = Math.floor(Math.random() * 1000);
  fs.writeFile("./db/db.json", JSON.stringify(notes), errorFn);
  return res.json(newNote);
});

//delete a note - get the ID from req header, search for the note in the array and remove that note with .splice
app.delete("/api/notes/:id", function(req, res) {
  var noteID = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (noteID == notes[i].id) {
      notes.splice(i, 1);
      fs.writeFile("./db/db.json", JSON.stringify(notes), errorFn);
      return res.json(notes);
    }
  }
});
