import './quotecard.css';
import { useState } from 'react';

export const QuoteCard = ({ elem }) => {
  const erase = () => {
    /* setIsHovered(true); */
  }
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='quoteBox'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <h2 className='goldenText'>❞</h2>
      <div className={`buttonsQuote ${isHovered == true ? "" : "notHovered"} `}>
        <button
          className='editButton'
        >
          🖉
        </button>
        <button
          className={`eraseButton text-danger`}
          onClick={erase}
        >
          <h2>×</h2>
        </button>
      </div>
      <div className="text text-end">
        <p className='quoteText'><i>“«{elem.quote_text}»”</i></p>
        <hr />
        <div className="footCard">
          <p className='goldenText'> {elem.title}</p>
          <p className='violetText'> {elem.name}</p>
        </div>
      </div>
    </div >
  )
}
