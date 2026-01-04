import React from 'react'
import { BookCard } from '../../components/bookCard/BookCard';

export const AllBooks = ({ books }) => {
  return (
    <div className='container-card'>
      {books?.map((elem, idx) => {
        return (
          <BookCard
            key={idx}
            elem={elem} />
        )
      })}
    </div>
  )
}
