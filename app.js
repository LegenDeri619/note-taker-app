const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path(__dirname, "public", "index.html"));
    console.log("Index page!");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("Notes Page!");
});


app.get("/api/notes", (req, res) => {
    let newNote;
    try {
        newNote = fs.readFileSync("db/db.json", "utf8");
        newNote = JSON.parse(newNote);
        console.log(newNote);
    }
    catch (err){
        console.log("Error in GET notes catch block: ")
        console.log(err);
    }

    res.json(newNote);
});


app.post("/api/notes", (req, res) => {
    try{
        newNote = fs.readFileSync("db/db.json", "utf8");
        newNote = JSON.parse(newNote);
        newNote.push(req.body);
        newNote = JSON.stringify(newNote);

        fs.writeFile("db/db.json", newNote, "utf8", function(err){
            if (err) throw err;
        });
        console.log(newNote);
    }
    catch (err){
        console.log("Error in POST notes catch block: ")
        console.log(err);
    }

    res.json(newNote);
});


app.delete("/api/notes/:id", (req, res) => {
    let newNote = [];

    newNote.splice(req.params.id);
    fs.writeFile("db/db.json", JSON.stringify(newNote), "utf8", function(err){
        console.log(" Error in DELETE notes: ");
        console.log(err);
    });
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});
