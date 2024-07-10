import React, { useState, useEffect } from 'react';
import style from './lista.module.css';
import SideBar from '../barraDeNavegacion/sidebar';
import axios from 'axios';

function Lista() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', email: '', phone: '' });

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

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user.id);
    setEditUser({ name: user.name, email: user.email, phone: user.phone });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdateUser = async (userId) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, editUser);
      const updatedUsers = users.map(user => user.id === userId ? { ...user, ...editUser } : user);
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={style.divvv}>
      <SideBar />
      <div className={style.ds}>
        <br />
        <h3>Lista de usuarios:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button className={style.botons} onClick={() => handleEditUser(user)}>Ver Más</button>
              <button className={style.botons} onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              {selectedUser === user.id && (
                <form className={style.formulario}>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Teléfono:
                    <input
                      type="text"
                      name="phone"
                      value={editUser.phone}
                      onChange={handleChange}
                    />
                  </label>
                  <button  className={style.botonss}  onClick={() => handleUpdateUser(user.id)}>Guardar</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Lista;