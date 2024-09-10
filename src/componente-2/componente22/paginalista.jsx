import React, { useState, useEffect } from 'react';
import style from './lista.module.css';
import SideBar from '../barraDeNavegacion/sidebar';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export function Lista() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Para redirigir

  // Obtener los usuarios de la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  // Función para redirigir al componente EditarUser con el ID del usuario seleccionado
  const handleEditUser = (user) => {
    navigate(`/editar/${user.id}`); // Redirige a la página de edición con el ID del usuario
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmDelete) {
      // Filtra la lista de usuarios para eliminar el usuario seleccionado
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className={style.divvv}>
      <SideBar />
      <div className={style.ds}>
        <br />
        <div className={style.nose}>
          <h2>Lista de usuarios:</h2>
          <button className={style.botoncis}>
            <NavLink to='/CrearNovo' className={style.link}>Crear</NavLink>
          </button>
        </div>
        <table className={style.userTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className={style.botons} onClick={() => handleEditUser(user)}>Editar</button>
                  <button className={style.botons} onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CrearNuevo() {
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      navigate('/listaDeUsuario'); 
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleBack = () => {
    navigate('/listaDeUsuario'); 
  };

  return (
    <div className={style.divvv}>
      <SideBar />
      <div className={style.ds}>
        <h3>Crear nuevo usuario:</h3>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <div className={style.formRow}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formRow}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formRow}>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button className={style.botonsds} type="submit">Guardar</button>
          <button className={style.botonss} type="button" onClick={handleBack}>Volver</button>
        </form>
      </div>
    </div>
  );
}

export function EditarUser() {
  const { userId } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  // Cargar los datos del usuario seleccionado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Actualizar los datos del usuario
  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, user);
      navigate('/listaDeUsuario'); // Redirigir a la lista de usuarios
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={style.divvv}>
      <SideBar /> 
      <div className={style.ds}>
        <h3>Editar usuario</h3>
        <form className={style.formulario} onSubmit={handleUpdateUser}>
          <div className={style.formRow}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formRow}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formRow}>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button className={style.botonss} type="submit">Guardar</button>
        </form>
        <button className={style.botonss} onClick={() => navigate('/listaDeUsuario')}>Volver</button>
      </div>
    </div>
  );
}