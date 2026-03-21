import { useEffect, useState } from 'react';
import './BP.css';
import { InputGroup, Form, Dropdown } from 'react-bootstrap';
import { AddForm } from '../../components/addForm/AddForm';
import { AllBooks } from '../allBooks/AllBooks';

export const BooksPage = ({ status, author, genre, books, newBook, setNewBook }) => {
  const [form, setForm] = useState(false);
  /* filter by status */
  const [filter, setFilter] = useState('todos');
  const [search, setSearch] = useState("");

  const [filteredBooks, setFilteredBooks] = useState([]);

  const orderAlf = () => {
    setFilteredBooks([...filteredBooks].sort((a, b) => a.title.localeCompare(b.title)));
    // ascendente 
    //El localeCompare obvia las tildes y demás para comparar sin mayus y minus 

    //descendente 
    //setFilteredBooks([...filteredBooks].sort((a, b) => b.title.localeCompare(a.title)));
  }

  const orderRating = () => {
    //Lo ordena por estrellas y por título alfabéticamente
    const librosordenados = [...books].sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.title.localeCompare(b.title);
    });
    setFilteredBooks(librosordenados);
  }

  const orderLength = () => {
    setFilteredBooks([...filteredBooks].sort((a, b) => a.pages - b.pages));
  }

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);


  const addBookForm = () => {
    if (form == false) {
      setForm(true);
    }
    else {
      setForm(false);
    }
  };

  const submit = () => {
    if (search === "") {
      setFilteredBooks(books);
      setSearch("");
    }
    else {
      setFilteredBooks(books.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())));
      setSearch("");
    }
  }

  const changeFilter = (state) => {
    if (state === 'reading') {
      setFilteredBooks([...books].filter((e) => e.status == 'leyendo'));
      setFilter('leyendo')
    }
    else if (state === 'completed') {
      setFilteredBooks([...books].filter((e) => e.status == 'completado'));
      setFilter('completado')
    }
    else if (state === 'pending') {
      setFilteredBooks([...books].filter((e) => e.status == 'pendiente'));
      setFilter('pendiente')
    }
    else if (state === 'all') {
      setFilteredBooks(books);
      setFilter('todos')
    }
  }

  return (
    <div className='bookspage'>
      {form == true ? <AddForm
        setform={setForm}
        genre={genre}
        status={status}
        author={author}
        books={books}
        newBook={newBook}
        setNewBook={setNewBook}
      /> : ""}

      <div className="d-flex justify-content-between">
        <h2 className='title'>Libros de mi Biblioteca</h2>
        <button
          className='buttonOrange'
          onClick={addBookForm}
        >Añadir libro
        </button>
      </div>

      <p className='violetText'>
        Ahora estás leyendo
        <span className='text-warning'> {status.leyendo} </span>
        {status.leyendo > 1 ? 'libros' : 'libro'}, has terminado
        <span className='text-warning'> {status.completado} </span> y te esperan  <span className='text-warning'> {status.pendiente} </span> libros.
      </p>

      <section className='filterBox'>
        <InputGroup className="mb-3">
          <InputGroup.Text
            className='inputText fs-5'
          > ◯
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder=' Buscar un libro...'
            className='input'
            value={search}
            onChange={(e) => setSearch(e.target.value)} /* seteo en línea */
          />
          <button
            className='buttonLilacInput'
            onClick={submit}
          >Buscar
          </button>
        </InputGroup>

        <div className='filters'>
          <button
            onClick={() => changeFilter('all')}
            className={filter === 'todos' ? 'selected' : 'oneFilter'}
          >Todos
          </button>
          <button
            onClick={() => changeFilter('reading')}
            className={filter === 'leyendo' ? 'selected' : 'oneFilter'}
          >Leyendo
          </button>
          <button
            onClick={() => changeFilter('completed')}
            className={filter === 'completado' ? 'selected' : 'oneFilter'}
          >Completados
          </button>
          <button
            onClick={() => changeFilter('pending')}
            className={filter === 'pendiente' ? 'selected' : 'oneFilter'}
          >Pendientes
          </button>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            className="edited-select">
            Elige opción
          </Dropdown.Toggle>

          <Dropdown.Menu className="edited-menu">
            <Dropdown.Item
              className='edited-option'
              onClick={orderAlf}
            >Orden alfabético
            </Dropdown.Item>
            <Dropdown.Item
              className='edited-option'
              onClick={orderLength}
            >Cantidad de páginas asc
            </Dropdown.Item>
            <Dropdown.Item
              className='edited-option'
              onClick={orderRating}
            >Mayor rating
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>

      <section className='pt-4'>
        <div className='container-card'>
          <AllBooks filtered={filteredBooks} />
        </div>
      </section>
    </div>
  )
}