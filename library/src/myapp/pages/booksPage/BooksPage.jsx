import React, { useState } from 'react';
import './BP.css';
import { InputGroup, Form, Dropdown } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';
import { AddForm } from '../../components/addForm/AddForm.jsx';

export const BooksPage = ({ status, author, genre }) => {
  const [filter, setFilter] = useState('todos');
  const [form, setForm] = useState(false);

  const addBookForm = () => {
    if (form == false) {
      setForm(true);
    }
    else {
      setForm(false);
    }
  };

  return (
    <div className='bookspage'>
      {form == true ? <AddForm
        setform={setForm}
        genre={genre}
        status={status}
        author={author}
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
        {/* BUSCAR CÓMO HACER UN FILTRADO POR INPUT... */}
        <InputGroup className="mb-3">
          <InputGroup.Text
            className='inputText fs-5'
          > ◯
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder=' Buscar un libro...'
            className='input'
          />
        </InputGroup>

        <div className='filters'>
          <Link
            to={'/'}
            className={filter === 'todos' ? 'selected' : 'oneFilter'}
            onClick={() => setFilter('todos')}
          >Todos
          </Link>
          <Link
            to={'/reading'}
            className={filter === 'leyendo' ? 'selected' : 'oneFilter'}
            onClick={() => setFilter('leyendo')}
          >Leyendo
          </Link>
          <Link
            to={'/completed'}
            className={filter === 'completado' ? 'selected' : 'oneFilter'}
            onClick={() => setFilter('completado')}
          >Completado
          </Link>
          <Link
            to={'/pending'}
            className={filter === 'pendiente' ? 'selected' : 'oneFilter'}
            onClick={() => setFilter('pendiente')}
          >Pendiente
          </Link>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            className="edited-select">
            Elige opción
          </Dropdown.Toggle>

          <Dropdown.Menu className="edited-menu">
            <Dropdown.Item
              className='edited-option'
            >Orden alfabético
            </Dropdown.Item>
            <Dropdown.Item
              className='edited-option'
            >Cantidad de páginas
            </Dropdown.Item>
            <Dropdown.Item
              className='edited-option'
            >Mayor rating
            </Dropdown.Item>
            <Dropdown.Item
              className='edited-option'
            >
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>

      <section className='pt-4'>
        <div className='container-card'>
          <Outlet />
        </div>
      </section>





    </div>
  )
}