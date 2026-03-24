import './allauthors.css';
import { Accordion, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../apiBase';

const initialValue = {
  name: "",
};

export const AllAuthors = ({ books, author }) => {
  const [isHovered, setIsHovered] = useState(null);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState(author);
  const [newAuthor, setNewAuthor] = useState(initialValue);
  const [inputNewAuthor, setInputNewAuthor] = useState(false);

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

  /* fixes the empty list when reloading the page */
  useEffect(() => {
    setFilteredAuthors(author);
  }, [author]);

  const openInput = () => {
    if (inputNewAuthor == true) {
      setInputNewAuthor(false);
    }
    else {
      setInputNewAuthor(true);
    }
  }

  const handleAuthor = (e) => {
    const { name, value } = e.target;
    setNewAuthor({ ...newAuthor, [name]: value });
  }

  const addAuthor = async () => {
    try {
      const res = await axios.post(apiUrl('/api/addAuthor'), newAuthor);
      console.log(res);

    } catch (error) {
      console.log(error);
    }
    setInputNewAuthor(false);
  }

  return (
    <div className='authors'>
      <div className='headAuthors'>
        <h2 className='title'>Escritores</h2>
        <div className='addAuthorInput'>
          {inputNewAuthor == true ?
            <div className='addAuthorGroup'>
              <Form.Group>
                <Form.Control
                  placeholder='Añadir un escritor'
                  type="text"
                  className='custominput'
                  required
                  name='title'
                  value={newAuthor.title}
                  onChange={handleAuthor}
                />
              </Form.Group>
              <button
                className='buttonLilac'
                onClick={addAuthor}>
                Enviar
              </button>
            </div>
            : ""
          }

          {inputNewAuthor == true ?
            <button
              className='buttonOrange'
              onClick={openInput}
            >Cancelar
            </button>
            :
            <button
              className='buttonOrange'
              onClick={openInput}
            >Añadir
            </button>
          }
        </div>
      </div>

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

      <Accordion className='authorsAccordion'>
        {filteredAuthors.map((elem, index) => (
          <Accordion.Item eventKey={index.toString()} key={elem.author_id} >
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
                      >{book.series != "" ?
                        ` (${book.series}, libro ${book.seriesPosition}) `
                        : ""}
                        {book.title}
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