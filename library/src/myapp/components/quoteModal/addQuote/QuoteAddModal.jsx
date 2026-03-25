import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import '../modal.css';
import axios from 'axios';

const initialValue = {
  quote_text: "",
  book_id: 0
}

export const QuoteAddModal = ({ modal, handleForm, books }) => {
  const [newQuote, setNewQuote] = useState(initialValue);

  const handleQuote = (e) => {
    const { name, value } = e.target;
    setNewQuote({ ...newQuote, [name]: value });
  }

  const addQuote = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/addQuote', newQuote);
      handleForm();
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='quoteStyle'>
      <Modal show={modal} onHide={handleForm} animation={false} dialogClassName="customModal">
        <Modal.Header closeButton>
          <Modal.Title className='title'> <h2>Guardar una cita</h2></Modal.Title>
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
                value={newQuote.quote_text}
                onChange={handleQuote}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='violetText'>Libro</Form.Label>
              <Form.Select
                className="custominput"
                required
                name='book_id'
                value={newQuote.book_id}
                onChange={handleQuote}
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
          <Button variant="secondary" onClick={handleForm}>
            Cancelar
          </Button>
          <button
            className='buttonOrange p-2 px-3'
            onClick={addQuote}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
