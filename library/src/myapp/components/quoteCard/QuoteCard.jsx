import { Link } from 'react-router';
import './quotecard.css';
import axios from 'axios';
import { useState } from 'react';
import { QuoteEditModal } from '../quoteModal/editQuote/QuoteEditModal';

export const QuoteCard = ({ elem, books }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleEditForm = () => {
    if (editModal == false) {
      setEditModal(true);
    }
    else {
      setEditModal(false);
    }
  }

  const deleteQuote = async () => {
    try {
      await axios.post('http://localhost:4000/api/deleteQuote', { quote_id: elem.quote_id });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='quoteBox'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <QuoteEditModal
        quote={elem}
        modal={editModal}
        handleEditForm={handleEditForm}
        books={books}
      />
      <h2 className='goldenText'>❞</h2>
      <div className={`buttonsQuote ${isHovered == true ? "" : "notHovered"} `}>
        <button
          className='editButton'
          onClick={handleEditForm}
        >
          🖉
        </button>
        <button
          className={`eraseButton text-danger`}
          onClick={deleteQuote}
        >
          <h2>×</h2>
        </button>
      </div>
      <div className="text text-end">
        <p className='quoteText'><i>“«{elem.quote_text.trimEnd()}»”</i></p>
        <hr />
        <div className="footCard">
          <Link to={`/book/${elem.book_id}`} className='goldenText'>{elem.title}</Link>
          <Link to={`/oneAuthor/${elem.author_id}`} className='violetText'>{elem.name}</Link>
        </div>
      </div>
    </div >
  )
}
