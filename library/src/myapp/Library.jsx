import { useEffect, useState, } from 'react';
import '../App.css'
import axios from 'axios';
import { apiUrl } from '../apiBase';
import { StatsPage } from './pages/statsPage/StatsPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LateralBar } from './components/LateralBar/LateralBar';
import { BooksPage } from './pages/booksPage/BooksPage';
import { AllBooks } from './pages/allBooks/AllBooks';
import { OneBook } from './pages/oneBook/OneBook';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { OneAuthor } from './pages/oneAuthor/OneAuthor';
import { AllAuthors } from './pages/allAuthors/AllAuthors';
import { Quotes } from './pages/quotesPage/Quotes';

const initialValue = {
  img: "",
  title: "",
  pages: null,
  rating: null,
  category: "",
  status: "",
  series: "",
  seriesPosition: null,
  comment: "",
  author_id: ""
};

export const Library = () => {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState([]);
  const [author, setAuthor] = useState([]);
  const [genre, setGenre] = useState([]);
  const [quote, setQuote] = useState([]);
  const [newBook, setNewBook] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl('/api/library/alldata'));
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
        const res = await axios.get(apiUrl('/api/library/counts'));
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
        const res = await axios.get(apiUrl('/api/library/author'));
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
        const res = await axios.get(apiUrl('/api/library/genre'));
        setGenre(res.data);
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
        const res = await axios.get('http://localhost:4000/api/library/quotes');
        setQuote(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className='common grid almendra-regular'>
        <LateralBar />
        <div className='main'>
          <Routes>
            <Route
              path='/'
              element={<BooksPage
                books={books}
                status={status}
                genre={genre}
                author={author}
                newBook={newBook}
                setNewBook={setNewBook}
              />
              }>
              <Route index element={<AllBooks />}></Route>
            </Route>

            <Route path='/book/:id' element={
              <OneBook
                books={books}
                author={author}
                newBook={newBook}
                setNewBook={setNewBook}
              />}></Route>
            <Route
              path='/stats'
              element={
                <StatsPage
                  books={books}
                  status={status}
                  author={author}
                />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path='/oneAuthor/:id' element={<OneAuthor
              books={books}
              author={author}
            />} />

            <Route path='/allAuthors' element={<AllAuthors
              books={books}
              author={author}
            />} />

            <Route path='/quotes' element={<Quotes
              author={author}
              quote={quote}
            />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}