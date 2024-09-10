import React, { useState, useEffect } from 'react';
import style from './atencion.module.css';
import Sidebar from '../barraDeNavegacion/sidebar';
import { NavLink } from 'react-router-dom';

export function Atencion() {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Fetch inicial para obtener los clientes desde la API
    const fetchClientes = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Reemplaza con tu API real
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleVerMas = (cliente) => {
    setSelectedCliente(cliente);
  };

  // Filtrar los datos en función del término de búsqueda
  const filteredData = clientes.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style.conteinerP}>
      <Sidebar />
      <div className={style.segundoCont}>
        {selectedCliente ? (
          <ModificacionCliente cliente={selectedCliente} setSelectedCliente={setSelectedCliente} setClientes={setClientes} />
        ) : (
          <>
            <h1>Esta es la sección de atención al cliente</h1>
            <div className={style.searchContainer}>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
              />
              <NavLink to="/creaR" className={style.NavLL}>
                <button>Crear</button>
              </NavLink>
            </div>
            <table className={style.tablaMedicinas}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Ver Más</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      <button className={style.custombutton} onClick={() => handleVerMas(item)}>
                        Ver Más
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export function ModificacionCliente({ cliente, setSelectedCliente, setClientes }) {
  const [formData, setFormData] = useState({
    name: cliente.name,
    username: cliente.username,
    email: cliente.email,
    description: cliente.description || '', // Añadir descripción aquí
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    username: false,
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: !prevEditing[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('¿Estás seguro de que quieres guardar los cambios?');
    if (confirmed) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${cliente.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setClientes((prevClientes) =>
            prevClientes.map((item) =>
              item.id === cliente.id ? { ...item, ...formData } : item
            )
          );
          setSelectedCliente(null);
        } else {
          console.error('Error al actualizar el cliente:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este cliente?');
    if (confirmed) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${cliente.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setClientes((prevClientes) => prevClientes.filter((item) => item.id !== cliente.id));
          setSelectedCliente(null);
        } else {
          console.error('Error al eliminar el cliente:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  return (
    <div className={style.conteinerP2}>
      <div className={style.segundoCont2}>
        <h1>Esta es la sección de modificación de clientes</h1>
        <form onSubmit={handleSubmit}>
          <table className={style.tablaMedicinas}>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Valor</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nombre:</td>
                <td>
                  {isEditing.name ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    formData.name
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={style.custombutton}
                    onClick={() => handleEdit('name')}
                  >
                    {isEditing.name ? 'Guardar' : 'Editar'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>
                  {isEditing.username ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  ) : (
                    formData.username
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={style.custombutton}
                    onClick={() => handleEdit('username')}
                  >
                    {isEditing.username ? 'Guardar' : 'Editar'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  {isEditing.email ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    formData.email
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={style.custombutton}
                    onClick={() => handleEdit('email')}
                  >
                    {isEditing.email ? 'Guardar' : 'Editar'}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Descripción:</td>
                <td>
                  {formData.description}
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <button type="submit">Guardar Cambios</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={style.deleteButtonContainer}>
            <button type="button" className={style.deleteButton} onClick={handleDelete}>
              Eliminar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CreaR() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    description: '', // Nuevo campo de descripción
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('¿Estás seguro de que quieres crear este cliente?');
    if (confirmed) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const nuevoCliente = await response.json();
          console.log('Nuevo cliente:', nuevoCliente);
          window.location.href = '/atencionClients';
        } else {
          console.error('Error al crear el cliente:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  return (
    <div className={style.conteinerP}>
      <Sidebar />
      <div className={style.segundoCont}>
        <h1>Crear un nuevo cliente</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Crear Cliente</button>
        </form>
      </div>
    </div>
  );
}