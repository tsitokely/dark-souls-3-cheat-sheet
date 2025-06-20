const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const app = express();

// Initialize SQLite database
const db = new sqlite3.Database('./progress.db');

// Middleware
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.json());

// Create table if not exists
db.run('CREATE TABLE IF NOT EXISTS progress (id TEXT PRIMARY KEY, checked INTEGER)');

// Get progress
app.get('/progress', (req, res) => {
  db.all('SELECT * FROM progress', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

// Update progress
app.post('/progress', (req, res) => {
  const { id, checked } = req.body;
  db.run(
    'INSERT OR REPLACE INTO progress (id, checked) VALUES (?, ?)',
    [id, checked ? 1 : 0],
    err => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

app.listen(3001, () => console.log('Server running on port 3001'));