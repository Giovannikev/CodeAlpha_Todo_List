const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require("./db");

// Middleware
app.use(cors());
app.use(express.json());


// get all todo
app.get("/todos", (req, res) => {
    db.all("SELECT * FROM todo", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json(rows);
        }
    });
});

// get a todo
app.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM todo WHERE todo_id = ?", [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json(row);
        }
    });
});

// create a todo
app.post("/todos", (req, res) => {
    const { description } = req.body;
    db.run("INSERT INTO todo (description) VALUES (?)", [description], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json({ id: this.lastID, description });
        }
    });
});

// update todo
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    db.run("UPDATE todo SET description = ? WHERE todo_id = ?", [description, id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json("Todo updated");
        }
    });
});

// delete todo
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM todo WHERE todo_id = ?", [id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json("Todo deleted");
        }
    });
});

app.listen(port, () => {
    console.log(`The server is running on port : ${port}`);
});
