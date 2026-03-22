import './one.css';
import { Link, useParams, } from 'react-router';
import { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { EditForm } from '../../components/editForm/EditForm.jsx';

export const OneBook = ({ books, author, newBook }) => {
  const [editForm, setEditForm] = useState(false);
  const { id } = useParams();
  const thisID = Number(id);
  const maxRecommendBooks = 6;

  const book = books.find(e => e.book_id === thisID);

  const authorData = author ? author.find(a => a.author_id === book.author_id) : null;

  if (!book) {
    return <div className='loading'>Cargando o libro no encontrado.</div>;
  }
  const stars = '⭐'.repeat(book.rating);

  const miniBooks = books.filter(e =>
    e.category.toLowerCase().trim() === book.category.toLowerCase().trim())
    .sort(() => Math.random() - 0.5)
    .slice(0, maxRecommendBooks);

  // Sort books by book_id for navigation
  const sortedBooks = [...books].sort((a, b) => a.book_id - b.book_id);
  const currentIndex = sortedBooks.findIndex(e => e.book_id === thisID);
  const prevBook = sortedBooks[currentIndex > 0 ? currentIndex - 1 : sortedBooks.length - 1];
  const nextBook = sortedBooks[currentIndex < sortedBooks.length - 1 ? currentIndex + 1 : 0];

  return (
    <div>
      <div>
        {editForm == true ? <EditForm
          setEditForm={setEditForm}
          newBook={newBook}
          author={author}
          book={book}
        /> : ""}
      </div>
      <div className='gridOneBook'>
        <div>
          <img src={`/public/images/books/${book.img}`} alt="" />
        </div>
        <div className='px-2 position-relative'>
          <h1 className='title fs-1 pt-2'> {book.title} </h1>
          <h4>{book.series != "" ? `Saga ${book.series}, libro ${book.seriesPosition}` : ""} </h4>
          <h4 className='violetText'> {book.name} </h4>

          <div className='d-flex flex-row gap-2'>
            <p className='genre'> {book.category} </p>
            <h6 className={`
          ${book.status == 'leyendo' ? 'onRead' : ''}
          ${book.status == 'completado' ? 'completed' : ''}
          ${book.status == 'pendiente' ? 'pending' : ''}
          `}
            > {book.status}
            </h6>

          </div>
          <Link
            to={`/OneAuthor/${authorData.author_id}`}
            state={{ fromBook: book.book_id }}
            style={{ textDecoration: 'none' }}          >
            <h5 className='linkAuthor title'> {authorData?.authorname}</h5>
          </Link>
          <h6>{book.pages} páginas</h6>

          {book.rating != undefined ?
            <div>
              <p>{stars} <span className='text-warning fs-5 px-2'> {stars.length} / 5 </span> </p>
            </div> : ""}

          {book.comment != "" && book.comment != undefined ?
            <div>
              <h5> Comentario: </h5>
              <p className='commentBox'> {book.comment}  </p>
            </div>
            : ""}

          <Button className='buttonOrange position-absolute bottom-0'
            onClick={() => setEditForm(true)}
          >Editar libro
          </Button>
        </div>
      </div>

      <div className='text-center pt-4'>
        <div>
          <Link className='buttonLilac'
            to={`/`}
          >Volver
          </Link>
          <Link className='buttonLilac'
            to={`/book/${prevBook.book_id}`}
          >Anterior
          </Link>
          <Link className='buttonLilac'
            to={`/book/${nextBook.book_id}`}
          >Siguiente
          </Link>
        </div>
      </div>

      <div className='miniPhotos text-center'>
        <Row className='d-flex flex-wrap gap-4 pt-4'>
          {miniBooks?.map((elem, idx) => {
            return (
              <Col key={idx}>
                <Link to={`/book/${elem.book_id}`}>
                  <img src={`/public/images/books/${elem.img}`} alt="" />
                </Link>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}
