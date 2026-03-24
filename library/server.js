import express from 'express';
import connection from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.DB_PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/library/counts', async (req, res) => {
  const sql = `
  SELECT 
  SUM(book.status = 'leyendo') as leyendo, 
  SUM(book.status = 'completado') as completado,  
  SUM(book.status = 'pendiente') as pendiente,
  COUNT(book_id) as total,
  SUM(book.category = 'romantasy') as romantasy,
  SUM(book.category = 'romance') as romance,
  SUM(book.category = 'fantasia') as fantasia,
  SUM(book.category = 'ciencia ficcion') as cienciaficcion,
  SUM(book.category = 'Zombies') as zombies,
  SUM(book.category = 'novela histórica') as historica,
  SUM(book.category = 'terror') as terror
  FROM book
  `;
  try {
    const [rows] = await connection.query(sql);
    res.status(200).json(rows[0] || { leyendo: 0, completado: 0 });
  } catch (error) {
    console.error('Error en /api/library:', error);
    res.status(500).json(error);
  }
});

app.get('/api/library/author', async (req, res) => {
  const sql = `
   SELECT MIN(author.author_id) AS author_id, author.name AS authorname
    FROM author
    GROUP BY author.name
    ORDER BY author.name ASC
  `;
  try {
    const [rows] = await connection.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/library/genre', async (req, res) => {
  const sql = `
  SELECT DISTINCT(book.category) AS bookgenre
  FROM book
  ORDER BY category ASC
  `;
  try {
    const [rows] = await connection.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/library/alldata', async (req, res) => {
  const sql = `
  SELECT book.*
  FROM book
  LEFT JOIN author ON author.author_id = book.author_id
  `;
  try {
    const result = await connection.query(sql);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/addBook', async (req, res) => {
  const { img, title, pages, rating, category, status, series, seriesPosition, comment, author_id } = req.body;
  try {
    const sql = `INSERT INTO book (img, title, pages, rating, category, status, series, seriesPosition, comment, author_id) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const values = [img, title, pages, rating, category, status, series, seriesPosition, comment, author_id];
    await connection.query(sql, values);
    res.status(200).json('Data sent correctly.');
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/api/addAuthor', async (req, res) => {
  const { name } = req.body;
  try {
    const sql = `INSERT INTO author (name) VALUES (?)`;
    const values = [name];
    await connection.query(sql, values);
    res.status(200).json('Data sent correctly.');
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/api/editBook', async (req, res) => {
  const { book_id, img, title, pages, rating, category, status, series, seriesPosition, comment, author_id } = req.body;
  try {
    const sql = `UPDATE book SET img=?, title=?, pages=?, rating=?, category=?, status=?, series=?, seriesPosition=?, comment=?, author_id=? WHERE book_id = ?`;
    const values = [img, title, pages, rating, category, status, series, seriesPosition, comment, author_id, book_id];
    await connection.query(sql, values);
    res.status(200).json('Book updated correctly.');
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json(error);
  }
});

export default app;

if (!process.env.VERCEL) {
  app.listen(port, () => console.log('Corriendo por el ' + port));
}
