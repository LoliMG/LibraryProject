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
  pub_id:""
}

export const AddForm = ({ setform, author, genre }) => {
  const [newBook, setNewBook] = useState(initialValue);

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
          <Card.Subtitle className='violetText'> <span className='text-danger'> * </span>  Información obligatoria.</Card.Subtitle>
        </Card.Header>

        <Card.Body className='pt-4 formbody violetText'>

          <Form.Group className="mb-3">
            <Form.Label>Título del libro <span className='text-danger'>*</span> </Form.Label>
            <Form.Control type="text" placeholder="El Hobbit" className='custominput' required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Saga </Form.Label>
            <Form.Control type="text" placeholder="Empíreo" className='custominput' />
          </Form.Group>

          <div className='d-flex justify-content-between gap-3'>
            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Orden en la saga</Form.Label>
              <Form.Control type="number" placeholder="0" className='custominput' required />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Autor <span className='text-danger'>*</span> </Form.Label>
              <Form.Select aria-label="Estado del libro" className='custominput' required>
                {author?.map((elem, idx) => {
                  return (
                    <option key={idx}> {elem.authorname} </option>
                  )
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '30%' }}>
              <Form.Label>Género <span className='text-danger'>*</span> </Form.Label>
              <Form.Select aria-label="Estado del libro" className='custominput' required>
                {genre?.map((elem, idx) => {
                  return (
                    <option key={idx}> {elem.bookgenre} </option>
                  )
                })}
              </Form.Select>
            </Form.Group>

          </div>

          <div className='d-flex justify-content-between gap-3'>
            <Form.Group className="mb-3" style={{ width: '50%' }}>
              <Form.Label>Estado del libro <span className='text-danger'>*</span> </Form.Label>
              <Form.Select aria-label="Estado del libro" className='custominput' required>
                <option value="leyendo">Leyendo</option>
                <option value="completado">Completado</option>
                <option value="pendiente">Pendiente</option>
                <option value="abandonado">Abandonado</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '50%' }}>
              <Form.Label>Número de páginas <span className='text-danger'>*</span> </Form.Label>
              <Form.Control type="number" placeholder="0" className='custominput' required />
            </Form.Group>
          </div>

          {/* IMAGE */}
          <Form.Group className="mb-3 cus">
            <Form.Label >Añade una imagen  <span className='text-danger'> * </span> </Form.Label>
            <Form.Control type="file" className='custominput' required />
          </Form.Group>

          <div className="commentBox">
            <Form.Group className="mb-3">
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder='Comentario sobre el libro.'
                className='custominput'
              />
            </Form.Group>
          </div>



        </Card.Body>

        <Card.Footer className='d-flex gap-3'>
          <Button variant="secondary"
            onClick={() => setform(false)}
          >Cancelar</Button>
          <button className='buttonOrange'>Añadir libro</button>
        </Card.Footer>
      </Card>
    </div >
  );
}
