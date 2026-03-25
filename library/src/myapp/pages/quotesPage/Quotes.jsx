import './quotes.css';
import axios from 'axios';
import { useState } from 'react';
import { QuoteCard } from '../../components/quoteCard/QuoteCard';

const initialValue = {
  text: "",
  book_id: null
};

export const Quotes = ({ quote }) => {
  /* Cuántas quotes hay guardadas */
  const quoteCount = quote.filter((item, index, self) =>
    index === self.findIndex(q => q.quote_id === item.quote_id)
  ).length;

  const [newQuote, setNewQuote] = useState(initialValue);
  const [form, setform] = useState(false);

  const handleForm = () => {
    if (form == false) {
      setform(true);
    }
    else {
      setform(false);
    }
  }

  const addQuote = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/addQuote', newQuote);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='quotes'>
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
            />

          )
        })}
      </div>
    </div>
  )
}
