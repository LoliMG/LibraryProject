import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './bookcard.css';
import { Link } from 'react-router';


export const BookCard = ({ elem }) => {
  const stars = '⭐'.repeat(elem.rating);


  return (
    <Link to={`/book/${elem.book_id}`} style={{textDecoration:'none'}}>
    <Card style={{ width: '18rem' }} className='bookcard'>
      <div className="img-wrapper">
        <Card.Img
          style={{ height: '28rem' }}
          variant="top"
          src={`/public/images/books/${elem.img}`}
        />
        <span
          className={`img-badge 
          ${elem.status == 'leyendo' ? 'onRead' : ''}
          ${elem.status == 'completado' ? 'completed' : ''}
          ${elem.status == 'pendiente' ? 'pending' : ''}
          `}
        >
          {elem.status}
        </span>
      </div>

      <Card.Body className=' p-4'>
        <Card.Title className='almendra-bold cardtitle'> {elem.title} </Card.Title>
        <Card.Text className='mb-2 violetText'> {elem.name} </Card.Text>
        {/* <Card.Text className='mb-2 violetText'> Editorial: {elem.publisher} </Card.Text> */}
        <Card.Text>{stars}</Card.Text>
        <Card.Text className='category violetText'> {elem.category} </Card.Text>
      </Card.Body>
    </Card>
    </Link>

  )
}
