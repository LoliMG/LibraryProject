import React, { useEffect, useState, } from 'react';
import './style.css';
import axios from 'axios';
import { StatsPage } from './pages/statsPage/StatsPage';
import { BrowserRouter, Routes, Route } from 'react-router';

import { LateralBar } from './components/LateralBar/LateralBar';
import { BooksPage } from './pages/booksPage/BooksPage';
import { AllBooks } from './pages/allBooks/AllBooks';
import { Reading } from './pages/reading/Reading';
import { Completed } from './pages/completed/Completed';
import { Pending } from './pages/pending/Pending';
import { OneBook } from './pages/oneBook/OneBook';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

export const Library = () => {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState([]);
  const [author, setAuthor] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/library/alldata');
        setBooks(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/library/counts');
        setStatus(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/library/author');
        setAuthor(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/library/genre');
        setGenre(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  return (
    <BrowserRouter>
      <div className='common grid almendra-regular'>
        <LateralBar />
        <Routes>
          <Route
            path='/'
            element={
              <BooksPage
                books={books}
                status={status}
                genre={genre}
                author={author}
              />}
          >
            <Route index element={<AllBooks books={books} />}></Route>
            <Route path='reading' element={<Reading books={books} />}></Route>
            <Route path='completed' element={<Completed books={books} />}></Route>
            <Route path='pending' element={<Pending books={books} />}></Route>
          </Route>

          <Route path='/book/:id' element={<OneBook books={books} />}></Route>
          <Route path='/stats' element={<StatsPage books={books} status={status} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}