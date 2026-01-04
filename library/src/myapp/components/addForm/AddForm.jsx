import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './add.css';
import { Card, Form } from 'react-bootstrap';
import { useState } from 'react';

const initialValue = {
  img: "",
  title: "",
  pages: "",
  rating: "",
  category: "",
  status: "",
  series: "",
  seriesPosition: "",
  comment: "",
  author_id: "",
  pub_id: ""
}

export const AddForm = ({ setform, author, genre }) => {
  const [newBook, setNewBook] = useState(initialValue);

  const handleBook = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  }

  const submit = () => {

  }

  return (
    <div
      className="modal show addFormBG"
      onClick={() => setform(false)}
    >
      <Card
        className='addForm'
        onClick={(e) => e.stopPropagation()}
      /* anula el onClick de arriba */
      >
        <Card.Header closeButton>
          <Card.Title className='title pb-2'> <h2> Añadir nuevo libro</h2></Card.Title>
          <Card.Subtitle className='violetText'>
            <span className='text-danger'> * </span>  Información obligatoria.
          </Card.Subtitle>
        </Card.Header>

        <Card.Body className='pt-4 formbody violetText'>

          <Form.Group className="mb-3">
            <Form.Label>Título del libro <span className='text-danger'>*</span> </Form.Label>
            <Form.Control
              type="text"
              placeholder="El Hobbit"
              className='custominput'
              required
              name='title'
              value={newBook.title}
              onChange={handleBook}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Saga</Form.Label>
            <Form.Control
              type="text"
              placeholder="Empíreo"
              className='custominput'
              name='series'
              value={newBook.series}
              onChange={handleBook}
            />
          </Form.Group>

          <div className='d-flex justify-content-between gap-3'>
            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Orden en la saga</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                className='custominput'
                required
                name='seriesPosition'
                value={newBook.seriesPosition}
                onChange={handleBook}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Páginas <span className='text-danger'>*</span> </Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                className='custominput'
                required
                name='pages'
                value={newBook.pages}
                onChange={handleBook}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '35%' }}>
              <Form.Label>Género <span className='text-danger'>*</span> </Form.Label>
              <Form.Select
                aria-label="Estado del libro"
                className='custominput'
                required
                name='category'
                value={newBook.category}
                onChange={handleBook}
              >
                {genre?.map((elem, idx) => {
                  return (
                    <option key={idx}
                      value={elem.bookgenre}
                    > {elem.bookgenre} </option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </div>

          <div className='d-flex justify-content-between gap-3'>
            <Form.Group className="mb-3" style={{ width: '50%' }}>
              <Form.Label>Estado del libro <span className='text-danger'>*</span> </Form.Label>
              <Form.Select
                aria-label="Estado del libro"
                className='custominput'
                required
                name='status'
                value={newBook.status}
                onChange={handleBook}
              >
                <option value="leyendo">Leyendo</option>
                <option value="completado">Completado</option>
                <option value="pendiente">Pendiente</option>
                <option value="abandonado">Abandonado</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '50%' }}>
              <Form.Label>Autor <span className='text-danger'>*</span> </Form.Label>
              <Form.Select
                aria-label="Estado del libro"
                className='custominput'
                required
                name='author_id'
                value={newBook.author_id}
                onChange={handleBook}
              >
                {author?.map((elem, idx) => {
                  return (
                    <option key={idx}
                      value={elem.author_id}>
                      {elem.authorname} </option>
                  )
                })}
              </Form.Select>
            </Form.Group>


          </div>

          {/* IMAGE */}
          <Form.Group className="mb-3 cus">
            <Form.Label >Añade el nombre de la imagen  <span className='text-danger'> * </span> </Form.Label>
            <Form.Control
              type="text"
              className='custominput'
              required
              name='img'
              value={newBook.img}
              onChange={handleBook}
            />
          </Form.Group>

          <div className="commentBox">
            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder='Comentario sobre el libro.'
                className='custominput'
                name='comment'
                value={newBook.comment}
                onChange={handleBook}
              />
            </Form.Group>
          </div>


        </Card.Body>

        <Card.Footer className='d-flex gap-3'>
          <Button variant="secondary"
            onClick={() => setform(false)}
          >Cancelar</Button>
          <button
            className='buttonOrange'
            onClick={submit}
          >Añadir libro
          </button>
        </Card.Footer>
      </Card>
    </div >
  );
}
