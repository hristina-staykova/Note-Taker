var express = require("express");
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

// post new note and get notes api & add ID (a random number between 0 and 1000)
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  notes.push(newNote);
  newNote.id = Math.floor(Math.random() * 1000);
  console.log(newNote.id + " from post note");
  return res.json(newNote);
});

//delete a note
app.delete("/api/notes/:id", function(req, res) {
  var noteID = req.params.id;
  console.log(noteID + " getting id");
  for (var i = 0; i < notes.length; i++) {
    if (noteID == notes[i].id) {
      notes.splice(i, 1);
      return res.json(notes);
    }
  }
});
