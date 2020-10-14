var path = require("path");
var fs = require("fs");
const { parse } = require("path");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
    fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
        if (err) {
            console.log("error");
        }
        let notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
            if (err) {
                console.log("error");
            }
            res.json(notes);
        });
    });
  })
  app.delete("/api/notes/:id", function(req, res) { 
    let selNote = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
        if (err) {
            console.log("error");
        }
        let notes = JSON.parse(data);
        let newNote = notes.filter(note => note.id !== selNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNote), function (err) {
            if (err) {
                console.log("error");
            }
            res.json(newNote);
        });
    });
  })
};
