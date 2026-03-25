import { BookCard } from '../../components/bookCard/BookCard';

export const AllBooks = ({ filtered }) => {
  /* const filtered = useOutletContext();  */ /* recoge el context de BooksPage */

  return (
    <>
      <div className='container-card'>
        {filtered?.map((elem, idx) => {
          return (
            <BookCard
              key={idx}
              elem={elem} />
          )
        })}
      </div>
    </>
  )
}
