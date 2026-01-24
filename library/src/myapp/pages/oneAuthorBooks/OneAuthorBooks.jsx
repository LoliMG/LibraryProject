import { BookCard } from "../../components/bookCard/BookCard";

export const OneAuthorBooks = ({ authorBooks }) => {
  return (
    <div>
      <div className='container-card'>
        {authorBooks?.map((elem, idx) => {
          return (
            <BookCard
              key={idx}
              elem={elem} />
          )
        })}
      </div>
    </div>
  )
}
