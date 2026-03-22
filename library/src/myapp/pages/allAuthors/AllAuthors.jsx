import './allauthors.css';
import { Accordion, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { useState } from 'react';

export const AllAuthors = ({ books, author }) => {
  const [isHovered, setIsHovered] = useState(null);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState(author);

  const submit = () => {
    if (searchAuthor === "") {
      setFilteredAuthors(author);
      setSearchAuthor("");
    }
    else {
      setFilteredAuthors(author.filter((e) =>
        e.authorname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .includes(searchAuthor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
      setSearchAuthor("");
    }
  }

  return (
    <div className='authors'>
      <h2 className='title'>Escritores</h2>

      <div className='authorBox'>
        <InputGroup>
          <InputGroup.Text
            className='inputText fs-5'
          > ◯
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder=' Buscar un libro...'
            className='input'
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)} /* seteo en línea */
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
          />
          <button
            className='buttonLilacInput'
            onClick={submit}
          >Buscar
          </button>
        </InputGroup>
      </div>

      <Accordion className='authorsAccordion' defaultActiveKey="0">
        {filteredAuthors.map((elem, index) => (
          <Accordion.Item eventKey={index.toString()} key={elem.author_id}>
            <Accordion.Header>
              {elem.authorname}
            </Accordion.Header>
            <Accordion.Body>
              {books.filter(book => book.author_id === elem.author_id).length > 0 ? (
                <div className="bookDisplay">
                  {books
                    .filter(book => book.author_id === elem.author_id)
                    .map((book, i) => (
                      <Link
                        style={{ textDecoration: 'none', color: isHovered === book.book_id ? 'var(--golden)' : 'white' }}
                        to={`/book/${book.book_id}`}
                        key={i}
                        /* hover just one of the titles */
                        onMouseEnter={() => setIsHovered(book.book_id)}
                        onMouseLeave={() => setIsHovered(null)}
                      >{book.title}
                      </Link>
                    ))
                  }
                </div>
              ) : ("")}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

    </div>
  )
}