import express from 'express';
import connection from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import {fileURLToPath} from 'url';
import {dirname} from 'path';

/* IMPORTS */
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.DB_PORT;
const app = express();

//Middleware para permitir cors
app.use(cors());

//da permiso para recibir json de fuera
app.use(express.json());

/* Recuentos */
app.get("/api/library/counts", async (req, res) => {
  let sql = `
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
    let [rows] = await connection.query(sql);
    res.status(200).json(rows[0] || { leyendo: 0, completado: 0 });
  }
  catch (error) {
     console.error('Error en /api/library:', error);
    res.status(500).json(error);
  }
});

/* Datos de autores */
app.get("/api/library/author", async (req, res) => {
  let sql = `
   SELECT MIN(author.author_id) AS author_id, author.name AS authorname
    FROM author
    GROUP BY author.name
    ORDER BY author.name ASC
  `; 
  try {
    let [rows] = await connection.query(sql);
    res.status(200).json(rows);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* Para select de género */
app.get("/api/library/genre", async (req, res) => {
  let sql = `
  SELECT DISTINCT(book.category) AS bookgenre
  FROM book
  ORDER BY category ASC
  `; 
  try {
    let [rows] = await connection.query(sql);
    res.status(200).json(rows);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* Genérico */
app.get("/api/library/alldata", async (req, res) => {
  let sql = `
  SELECT book.*
  FROM book
  LEFT JOIN author ON author.author_id = book.author_id
  `;
  try {
    let result = await connection.query(sql);
    res.status(200).json(result[0]);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* Citas */
app.get("/api/library/quotes", async (req, res) => {
  let sql = `
  SELECT quote.quote_id, quote.quote_text, book.title, book.author_id, author.name
  FROM quote
    LEFT JOIN book ON quote.book_id = book.book_id
    LEFT JOIN author ON book.author_id = author.author_id`;
  try {
    let [rows] = await connection.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
})

/* Insert data from front to database */
app.post('/api/addBook', async(req, res) => {
  const {img, title, pages, rating, category, status, series, seriesPosition, comment, author_id} = req.body;  
  try {
    let sql = `INSERT INTO book (img, title, pages, rating, category, status, series, seriesPosition, comment, author_id) VALUES (?,?,?,?,?,?,?,?,?,?)`;   
    let values = [img, title, pages, rating, category, status, series, seriesPosition, comment, author_id];   
    let result = await connection.query(sql, values);
    res.status(200).json("Data sent correctly.");
  }
  catch(error) {
    res.status(500).json(error);
  }
})

app.post('/api/addAuthor', async(req, res) => {
  const {name} = req.body;
  try {
    let sql = `INSERT INTO author (name) VALUES (?)`;
    let values = [name];
    let result = await connection.query(sql, values);
    res.status(200).json("Data sent correctly.");
  } catch (error) {
    res.status(500).json(error);
  }
})

app.post('/api/addQuote', async(req, res) => {
  const {text, book_id} = req.body;
try {
  let sql = 'INSERT INTO quote (text, book_id) VAULES (?,?)';
  let values = [text, book_id];
  let result = await connection.query(sql, values);
  res.status(200).json(error);
} catch (error) {
  res.status(500).json(error);
}
})

/* Edit data from front to database */
app.post('/api/editBook', async(req, res) => {
  const {book_id, img, title, pages, rating, category, status, series, seriesPosition, comment, author_id} = req.body;
  try {
    let sql = `UPDATE book SET img=?, title=?, pages=?, rating=?, category=?, status=?, series=?, seriesPosition=?, comment=?, author_id=? WHERE book_id = ?`;
    let values = [img, title, pages, rating, category, status, series, seriesPosition, comment, author_id, book_id];   
    let result = await connection.query(sql, values);
    res.status(200).json("Book updated correctly.");
  }
  catch(error) {
    console.error('Error updating book:', error);
    res.status(500).json(error);
  }
})

app.post('/api/editQuote', async(req, res) => {
  const {text, book_id} = req.body;
  try {
    let sql = 'UPDATE quote SET text=?, book_id=?';
    let values = [text, book_id];
    res.status(200).json("Quote updated correctly.");
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json(error);
  }
})

app.use(express.static(__dirname + "/public"));

app.listen(port, ()=>console.log("Corriendo por el " + port));