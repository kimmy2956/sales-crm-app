const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./sales.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    title TEXT,
    amount REAL,
    status TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  )`);
});

// Routes
app.get("/customers", (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/customers", (req, res) => {
  const { name, email } = req.body;
  db.run("INSERT INTO customers (name, email) VALUES (?, ?)", [name, email], function (err) {
    res.json({ id: this.lastID });
  });
});

// เพิ่ม: GET/POST/PUT/DELETE สำหรับ deals

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
