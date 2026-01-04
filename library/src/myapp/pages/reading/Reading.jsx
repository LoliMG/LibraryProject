import React from 'react';
import { BookCard } from '../../components/bookCard/BookCard';

export const Reading = ({ books }) => {
  const reading = books.filter(e => e.status == 'leyendo');

  return (
    <div>
      {reading == null ? "AHORA MISMO NO ESTÁS LEYENDO NINGÚN LIBRO." :
        <div className='container-card'>
          {reading?.map((elem, idx) => {
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
