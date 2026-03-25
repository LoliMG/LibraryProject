import './quotes.css';
import { useState } from 'react';
import { QuoteCard } from '../../components/quoteCard/QuoteCard';
import { QuoteAddModal } from '../../components/quoteModal/addQuote/QuoteAddModal';


export const Quotes = ({ quote, books }) => {
  /* Cuántas quotes hay guardadas */
  const quoteCount = quote.filter((item, index, self) =>
    index === self.findIndex(q => q.quote_id === item.quote_id)
  ).length;

  const [modal, setModal] = useState(false);

  const handleForm = () => {
    if (modal == false) {
      setModal(true);
    }
    else {
      setModal(false);
    }
  }

  return (
    <div className='quotes'>
      {modal == true ?
        <QuoteAddModal
          modal={modal}
          books={books}
          handleForm={handleForm} />
        : ""}
      <div className='quotesHeader'>
        <div>
          <h2 className='title'>Citas favoritas</h2>
          <p className='violetText textLarge'>
            <span className='text-warning'> {quoteCount} </span>citas guardadas
          </p>
        </div>
        <div>
          <button
            className='buttonOrange'
            onClick={handleForm}>
            <strong>+</strong> Guardar cita</button>
        </div>
      </div>

      <div className='quotesBox pt-4' >
        {quote?.map((elem, idx) => {
          return (
            <QuoteCard
              elem={elem}
              key={idx}
              books={books}
            />

          )
        })}
      </div>
    </div>
  )
}
