import React from 'react';
import './lat.css';
import icon from '../../../assets/icon.png';
import { Link } from 'react-router';


export const LateralBar = () => {
  return (
    <div className='lateralbar'>
      <div className='text-center'>
        <img src={icon} style={{ height: '10rem' }} />
        
        <h2 className='title almendra-bold'>Bookfly</h2>
      </div>
      <div className='d-flex flex-column gap-3 pt-5'>
        <Link to={'/'} className='link violetText'> 🕮 Mi Colección</Link>
        <Link to={'/stats'} className='link violetText'> ෴ Estadísticas</Link>
      </div>
    </div>
  )
}
