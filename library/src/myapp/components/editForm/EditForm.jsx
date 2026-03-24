import Button from 'react-bootstrap/Button';
import './edit.css';
import { Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../apiBase';


export const EditForm = ({ author, book, setEditForm }) => {
  const [editBook, setEditBook] = useState(book);

  const handleBook = (e) => {
    const { name, value } = e.target;
    setEditBook(prev => ({ ...prev, [name]: value }));
  }

  const submit = async () => {
    try {
      const res = await axios.post(apiUrl('/api/editBook'), editBook);
      console.log(res);
      window.location.reload();
      setEditForm(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="modal show addFormBG"
      onClick={() => setEditForm(false)}
    >
      <Card
        className='addForm'
        onClick={(e) => e.stopPropagation()}
      /* anula el onClick de arriba */
      >
        <Card.Header closeButton>
          <Card.Title className='title pb-2'>
            <h2> Editar libro</h2>
          </Card.Title>
          <Card.Subtitle className='violetText'>
            <span className='text-danger'> * </span>  Información obligatoria.
          </Card.Subtitle>
        </Card.Header>

        <Card.Body className='pt-4 formbody violetText'>

          <Form.Group className="mb-3">
            <Form.Label>Título del libro <span className='text-danger'>*</span> </Form.Label>
            <Form.Control
              type="text"
              className='custominput'
              required
              name='title'
              value={editBook.title}
              onChange={handleBook}
            />
          </Form.Group>

          <div className='d-flex justify-content-between gap-3'>
            <Form.Group className="mb-3" style={{ width: '70%' }}>
              <Form.Label>Saga</Form.Label>
              <Form.Control
                type="text"
                className='custominput'
                name='series'
                value={editBook.series}
                onChange={handleBook}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Rating </Form.Label>
              <Form.Control
                type="number"
                className='custominput'
                required
                name='rating'
                min={0}
                max={5}
                value={editBook.rating}
                onChange={handleBook}
              />
            </Form.Group>
          </div>
          <div className='d-flex justify-content-between gap-3'>
            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Orden en la saga</Form.Label>
              <Form.Control
                type="number"
                className='custominput'
                name='seriesPosition'
                value={editBook.seriesPosition}
                onChange={handleBook}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Páginas <span className='text-danger'>*</span> </Form.Label>
              <Form.Control
                type="number"
                className='custominput'
                required
                name='pages'
                value={editBook.pages}
                onChange={handleBook}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '35%' }}>
              <Form.Label>Género <span className='text-danger'>*</span> </Form.Label>
              <Form.Control
                aria-label="Estado del libro"
                className='custominput'
                required
                name='category'
                value={editBook.category}
                onChange={handleBook}
              />
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
                value={editBook.status}
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
                value={editBook.author_id}
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
            <Form.Label >Nombre de la imagen  <span className='text-danger'> * </span> </Form.Label>
            <Form.Control
              type="text"
              className='custominput'
              name='img'
              value={editBook.img}
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
                value={editBook.comment}
                onChange={handleBook}
              />
            </Form.Group>
          </div>


        </Card.Body>

        <Card.Footer className='d-flex gap-3'>
          <Button variant="secondary"
            onClick={() => setEditForm(false)}
          >Cancelar</Button>
          <button
            className='buttonOrange'
            onClick={submit}
          >Editar libro
          </button>
        </Card.Footer>
      </Card>
    </div >
  );
}
