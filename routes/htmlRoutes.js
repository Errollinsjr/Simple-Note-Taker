
const fs = require('fs');

// DEPENDENCIES
// We need to include the path package to get the correct file path for our html

const path = require('path');

// ROUTING

module.exports = (app) => {

    fs.readFile("../Simple-Note-Taker/db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API ROUTES
        // ========================================================
    
        // Setup the /api/notes get route
        app.get("/api/notes", function(req, res) {
            // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
        });

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("New Note: " + newNote.title);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Note with id of "+ req.params.id + " deleted");
        });

        // => HTML GET Requests
        // Below code handles when users "visit" a page.
        // In each of the below cases the user is shown an HTML page of content

        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // If no matching route is found default to home
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        app.get('/', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDb() {
            fs.writeFile("../Simple-Note-Taker/db/db.json", JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}
