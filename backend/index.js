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
    const { description, priority = 'medium' } = req.body; // default value = 'medium'
    const validPriorities = ["low", "medium" , "high"]
    
    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: "Invalid priority value. Must be 'low', 'medium', or 'high' "})
    }
    
    db.run("INSERT INTO todo (description, priority) VALUES (?, ?)", [description, priority], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } else {
            res.json({ id: this.lastID, description, priority });
        }
    });
});

// update todo
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { description, priority } = req.body;
    const validPriorities = ["low", "medium" , "high"]
    
    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: "Invalid priority value. Must be 'low', 'medium', or 'high' "})
    }
    
    db.run("UPDATE todo SET description = ?, priority = ? WHERE todo_id = ?", [description, priority, id], function (err) {
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
