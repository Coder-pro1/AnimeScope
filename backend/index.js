import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


app.get("/", (req, res) => res.json("Backend is running!"));


app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});


app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const qBook = `
    SELECT b.*, IFNULL(AVG(r.rating),0) AS average_rating, COUNT(r.id) AS review_count
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    WHERE b.id = ?
    GROUP BY b.id
  `;
  db.query(qBook, [bookId], (err, bookData) => {
    if (err) return res.status(500).json(err);
    if (!bookData.length) return res.status(404).json("Book not found");

    const book = bookData[0];
    db.query("SELECT * FROM reviews WHERE book_id = ?", [bookId], (err, reviews) => {
      if (err) return res.status(500).json(err);
      book.reviews = reviews || [];
      book.display_rating = parseFloat(book.average_rating).toFixed(1);
      res.json(book);
    });
  });
});


app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover, req.body.price];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json("Book created");
  });
});


app.put("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "UPDATE books SET title=?, description=?, price=?, cover=? WHERE id=?";
  const values = [req.body.title, req.body.description, req.body.price, req.body.cover];
  db.query(q, [...values, bookID], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json("Book updated");
  });
});


app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [bookID], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json("Book deleted");
  });
});


app.post("/books/:id/reviews", (req, res) => {
  const bookID = req.params.id;
  const { reviewer_name, rating, review_text } = req.body;
  const q = "INSERT INTO reviews (book_id, reviewer_name, rating, review_text) VALUES (?, ?, ?, ?)";
  db.query(q, [bookID, reviewer_name, rating, review_text], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json({ id: data.insertId, book_id: bookID, reviewer_name, rating, review_text });
  });
});


app.get("/leaderboard", (req, res) => {
  const q = `
    SELECT b.*, IFNULL(AVG(r.rating),0) AS average_rating, COUNT(r.id) AS review_count
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    GROUP BY b.id
    HAVING review_count > 0
    ORDER BY average_rating DESC, review_count DESC
    LIMIT 10
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    const booksWithDisplay = data.map(b => ({
      ...b,
      display_rating: parseFloat(b.average_rating).toFixed(1)
    }));
    res.json(booksWithDisplay);
  });
});

// Start server
app.listen(8800, () => console.log("Backend running on port 8800"));
