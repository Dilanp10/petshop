import React, { useState } from 'react';
import style from './agregar.module.css';
import axios from 'axios';
import Sidebar from '../barraDeNavegacion/sidebar';

function Agregar() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleSaveUser = async () => {
    try {
      // Realizar la solicitud POST para guardar el nuevo usuario
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name: userName,
        email: userEmail,
      });

      // Si la solicitud es exitosa, puedes realizar cualquier acción adicional aquí
      console.log('Nuevo usuario creado:', response.data);

      // Limpia los campos después de guardar el usuario
      setUserName('');
      setUserEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className={style.degrad}>
      <div className={style.divvv}>
      <Sidebar/>
      <h1>Agregar Usuario</h1>
      <label>
        Nombre:
        <input type="text" value={userName} onChange={handleUserNameChange} />
      </label>
      <label>
        Email:
        <input type="text" value={userEmail} onChange={handleUserEmailChange} />
      </label>
      <button onClick={handleSaveUser}>Guardar</button>
    </div>
    </div>
  );
}

export default Agregar;