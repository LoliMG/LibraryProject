import React from 'react';
import { BookCard } from '../../components/bookCard/BookCard';

export const Pending = ({ books }) => {
  const pending = books.filter(e => e.status == 'pendiente');
  return (
    <div>
      {pending == null ? "NO TIENES NINGÚN LIBRO PENDIENTE." :
        <div className='container-card'>
          {pending?.map((elem, idx) => {
            return (
              <BookCard
                key={idx}
                elem={elem} />
            )
          })}
        </div>
      }
    </div>
  )
}
