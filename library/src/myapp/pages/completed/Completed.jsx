import React from 'react';
import { BookCard } from '../../components/bookCard/BookCard';

export const Completed = ({ books }) => {
  const completed = books.filter(e => e.status == 'completado');
  return (
    <div className='container-card'>
      {completed?.map((elem, idx) => {
        return (
          <BookCard
            key={idx}
            elem={elem} />
        )
      })}

    </div>
  )
}
