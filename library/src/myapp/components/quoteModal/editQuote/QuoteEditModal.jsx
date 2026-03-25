import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import '../modal.css';
import axios from 'axios';


export const QuoteEditModal = ({ quote, modal, handleEditForm, books }) => {
  const [editQuote, setEditQuote] = useState(quote);

  const handleEditQuote = (e) => {
    const { name, value } = e.target;
    setEditQuote(prev => ({ ...prev, [name]: value }));
  }

  const submitEditQuote = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/editQuote', editQuote);
      handleEditForm();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='quoteStyle'>
      <Modal show={modal} onHide={handleEditForm} animation={false} dialogClassName="customModal">
        <Modal.Header closeButton>
          <Modal.Title className='title'> <h2>Editar una cita</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className='violetText'>Cita</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={3}
                name='quote_text'
                placeholder="Introduce el título"
                className="custominput"
                value={editQuote.quote_text}
                onChange={handleEditQuote}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='violetText'>Libro</Form.Label>
              <Form.Select
                className="custominput"
                required
                name='book_id'
                value={editQuote.book_id}
                onChange={handleEditQuote}
              >
                {books?.map((elem, idx) => {
                  return (
                    <option
                      key={idx}
                      value={elem.book_id}
                    > {elem.title}
                    </option>
                  )
                })}


              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleEditForm}>
            Cancelar
          </Button>
          <button
            className='buttonOrange p-2 px-3'
            onClick={submitEditQuote}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
