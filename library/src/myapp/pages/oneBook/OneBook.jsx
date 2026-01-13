import { Link, useParams } from 'react-router';
import './one.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export const OneBook = ({ books,/*  status  */ }) => {
  const { id } = useParams();
  const thisID = Number(id);
  const maxRecommendBooks = 6;

  const book = books.find(e => e.book_id === thisID);

  if (!book) {
    return <div className='loading'>Cargando o libro no encontrado.</div>;
  }
  const stars = '⭐'.repeat(book.rating);

  const miniBooks = books.filter(e =>
    e.category.toLowerCase().trim() === book.category.toLowerCase().trim())
    .sort(() => Math.random() - 0.5)
    .slice(0, maxRecommendBooks);

  return (
    <div>
      <div className='gridOneBook'>
        <div>
          <img src={`/public/images/books/${book.img}`} alt="" />
        </div>
        <div className='px-2'>
          <h1 className='title fs-1 pt-2'> {book.title} </h1>
          <h4>  {book.series != "" ? `${book.series}, libro ${book.seriesPosition}` : ""} </h4>
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

          <h5>{book.pages} páginas</h5>

          {book.rating != undefined ?
            <div>
              <p className='violetText'> Puntuación: </p>
              <p>{stars} <span className='text-warning fs-5 px-2'> {stars.length} / 5 </span> </p>
            </div> : ""}

          {book.comment != "" && book.comment != undefined ?
            <div>
              <h5> Comentario: </h5>
              <p className='commentBox'> {book.comment}  </p>
            </div>
            : ""}
        </div>

      </div>

      <div className='text-center'>
        <div>
          <Link className='buttonLilac'
            to={`/`}
          >Volver
          </Link>
          <Link className='buttonLilac'
            to={`/book/${thisID === 1 ? books.length : thisID - 1}`}
          >Anterior
          </Link>
          <Link className='buttonLilac'
            to={`/book/${thisID == books.length ? 1 : thisID + 1}`}
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
