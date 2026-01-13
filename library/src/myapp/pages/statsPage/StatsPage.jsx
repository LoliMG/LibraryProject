import React from 'react'
import './SP.css';
import { Row, Col } from 'react-bootstrap';

export const StatsPage = ({ status }) => {

  return (
    <div className='statspage'>
      <h2 className='title'>Estadísticas</h2>
      <p className='violetText'>Resumen de la biblioteca</p>

      <section>
        <Row className='d-flex gap-4'>
          <Col className='boxStat'>
            <p className='violetText'>
              Total de libros
            </p>
            <h3> {status.total} </h3>
          </Col>
          <Col className='boxStat'>
            <p className='violetText'>
              Leyendo
            </p>
            <h3> {status.leyendo} </h3>
          </Col>

          <Col className='boxStat'>
            <p className='violetText'>
              Completados
            </p>
            <h3> {status.completado} </h3>
          </Col>
          <Col className='boxStat'>
            <p className='violetText'>
              Pendientes
            </p>
            <h3> {status.pendiente} </h3>
          </Col>
        </Row>
        <Row className='pt-4'>
          <Col className='boxStat2'>
            <p className='violetText'>
              Géneros Favoritos
            </p>
            <div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'>1.
                </span> Romantasy:</p>
                <p className='violetText'> {status.romantasy} libros </p>
              </div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'>2.
                </span> Romance:</p>
                <p className='violetText'> {status.romance} libros </p>
              </div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'> 3.
                </span> Fantasía:</p>
                <p className='violetText'> {status.fantasia} libros </p>
              </div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'>4.
                </span> Ciencia Ficción:</p>
                <p className='violetText'> {status.cienciaficcion} libros </p>
              </div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'>5.
                </span> Zombies:</p>
                <p className='violetText'> {status.zombies} libros </p>
              </div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'>6.
                </span> Novela Histórica:</p>
                <p className='violetText'> {status.historica} libros </p>
              </div>
              <div className='d-flex justify-content-between '>
                <p> <span className='numberCategory fs-4'>7.
                </span> Terror:</p>
                <p className='violetText'> {status.terror} libros </p>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}