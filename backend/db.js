const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error while connecting to sqlite", err.message);
    } else {
        console.log("Connected to SQLite");
    }
});

// Création de la table si elle n'existe pas déjà
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todo (
            todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL
        )
    `);
});

module.exports = db;
