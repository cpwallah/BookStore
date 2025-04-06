import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jojo017@",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("this is backend");
});

// Get all books
app.get("/boooks", (req, res) => {
  const q = "SELECT * FROM boooks";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Create a new book
app.post("/boooks", (req, res) => {
  const q = "INSERT INTO boooks (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Delete a book
app.delete("/boooks/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM boooks WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Book has been deleted successfully");
  });
});

// Update a book
app.put("/boooks/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE boooks SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Book has been updated successfully");
  });
});

app.listen(8080, () => {
  console.log("connected to backend");
});
