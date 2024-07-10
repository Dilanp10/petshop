import React, { useState } from 'react';
import '../hojasDeEstilos/Hojalogin.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const usuarios = [
    { nombre: 'cabre', contraseña: '123' },
    { nombre: 'juan', contraseña: '2020' },
    { nombre: 'tirano', contraseña: 'salmon' }
  ];

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const manejarUsuario = (e) => {
    setUsuario(e.target.value);
  }

  const manejarContraseña = (e) => {
    setContraseña(e.target.value);
  }

  const corroborar = () => {
    const user = usuarios.find(elemento => elemento.nombre === usuario && elemento.contraseña === contraseña);
    if (user) {
      setUser(user.nombre); // Actualiza el contexto de usuario
      alert(`Bienvenido ${user.nombre}`);
      navigate('/ingresoadmin');
    } else if (usuario === 'admin' && contraseña === 'admin') {
      setUser('admin'); // Actualiza el contexto de usuario
      navigate('/ingresoadmin');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className='conteiner-principal'>
      <div className='div-imagen'>
        <img className='img' src={require('../img/perro.png')} alt='Imagen de perro' />
      </div>
      <div className='segundo-conteiner'>
        <div className='div-chiqui'>
          <img className='logo' src={require('../img/perro.png')} alt='Logo de Patitas' />
          <h1>Patitas</h1>
        </div>
        <h3>Iniciar sesión en su cuenta</h3>
        <input
          className='input1'
          type='text'
          placeholder='Ingrese su usuario'
          value={usuario}
          onChange={manejarUsuario}
        />
        <input
          type='password'
          placeholder='Ingrese la contraseña'
          value={contraseña}
          onChange={manejarContraseña}
        />
        <div className='boton'>
          <button onClick={corroborar} className='cont-boton'>ACCESO</button>
        </div>
        <p>¿No tienes una cuenta? <Link to>Entra aquí</Link></p>
      </div>
    </div>
  );
}