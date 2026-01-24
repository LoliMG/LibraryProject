import { Link, useParams, useLocation } from 'react-router';
import { OneAuthorBooks } from '../oneAuthorBooks/OneAuthorBooks';
import './oneAuthor.css';

export const OneAuthor = ({ books, author }) => {
  const { id } = useParams();
  const location = useLocation();
  const fromBook = location.state?.fromBook;
  const thisAuthorID = Number(id);

  const thisAuthor = author.find(a => a.author_id === thisAuthorID);
  const authorBooks = books.filter(e => e.author_id === thisAuthorID);

  return (
    <div className='one-author'>
     {fromBook != null ? 
      <div className='text-start'>
        <Link to={`/book/${fromBook}`} className='buttonLilac'>Volver</Link>
      </div> : ""}
      <div className='text-center pb-4'>
        <h1 className='title'>{thisAuthor ? thisAuthor.authorname : 'Nombre no disponible'}</h1>
        <h3>Libros del autor:</h3>
        <div className='text-center'>

        </div>
      </div>
      <div>
        <OneAuthorBooks authorBooks={authorBooks} />
      </div>

    </div>
  )
}
