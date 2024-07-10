import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../hojasDeEstilos/producto.module.css';
import { NavLink } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import Sidevar from '../barraDeNavegacion/sidebar';

const API_URL = 'https://fakestoreapi.com/products';

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [edicionProducto, setEdicionProducto] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const actualizarProducto = async (id, datosActualizados) => {
    try {
      await axios.put(`${API_URL}/${id}`, datosActualizados);
      console.log('¡Producto actualizado con éxito!');
      obtenerProductos();
      setEdicionProducto(null);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log('¡Producto eliminado con éxito!');
      await obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleEdit = (producto) => {
    setEdicionProducto({ ...producto });
  };

  const handleUpdate = () => {
    actualizarProducto(edicionProducto.id, edicionProducto);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      eliminarProducto(id);
    }
  };

  const mostrarDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarDetalle(true);
  };

  const cerrarDetalles = () => {
    setProductoSeleccionado(null);
    setMostrarDetalle(false);
  };

  const filteredProductos = productos.filter(producto =>
    producto.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.ppp}>
      <Sidevar />
      <div className={styles.ttt}>
        <h1 className={styles.titulo}>Productos</h1>
        <div className={styles.crea}>
          <NavLink to='/create' className={styles.creas}>Crear Producto <IoMdAddCircle color='green' size='23px' /></NavLink>
        </div>
        <div className={styles.searchContainer}>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <table className={styles.tablaProductos}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.title}</td>
                <td><img src={producto.image} alt={producto.title} width="50" /></td>
                <td>{producto.price}</td>
                <td>
                  <button onClick={() => mostrarDetalles(producto)}>Ver Más</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mostrarDetalle && (
          <div className={styles.detalleFlotante}>
            <div className={styles.contenidoDetalle}>
              <span className={styles.close} onClick={cerrarDetalles}>&times;</span>
              <h2>{productoSeleccionado.title}</h2>
              <p>Precio: {productoSeleccionado.price}</p>
              <p>Descripción: {productoSeleccionado.description}</p>
              <p>Categoría: {productoSeleccionado.category}</p>
              <button onClick={() => handleEdit(productoSeleccionado)}>Editar</button>
              <button onClick={() => handleDelete(productoSeleccionado.id)}>Eliminar</button>
              {edicionProducto && edicionProducto.id === productoSeleccionado.id && (
                <div className={styles.editar}>
                  <input type="text" name="title" value={edicionProducto.title} onChange={(e) => setEdicionProducto({ ...edicionProducto, title: e.target.value })} />
                  <input type="text" name="price" value={edicionProducto.price} onChange={(e) => setEdicionProducto({ ...edicionProducto, price: e.target.value })} />
                  <input type="text" name="description" value={edicionProducto.description} onChange={(e) => setEdicionProducto({ ...edicionProducto, description: e.target.value })} />
                  <input type="text" name="category" value={edicionProducto.category} onChange={(e) => setEdicionProducto({ ...edicionProducto, category: e.target.value })} />
                  <input type="text" name="image" value={edicionProducto.image} onChange={(e) => setEdicionProducto({ ...edicionProducto, image: e.target.value })} />
                  <button onClick={handleUpdate}>Guardar</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Create() {
  const [nuevoProducto, setNuevoProducto] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value
    });
  };

  const crearProducto = async () => {
    const { title, price, description, category, image } = nuevoProducto;
    if (!title || !price || !description || !category || !image) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      await axios.post(API_URL, nuevoProducto);
      console.log('¡Producto creado con éxito!');
      setNuevoProducto({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
      setError('');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div className={styles.ppp}>
      <Sidevar />
      <div className={styles.ttt}>
        <h1 className={styles.titulo}>Crear Nuevo Producto</h1>
        <div className={styles.formulario}>
          <h2>Agregar Nuevo Producto</h2>
          {error && <div className={styles.error}>{error}</div>}
          <input type="text" name="title" value={nuevoProducto.title} onChange={handleInputChange} placeholder="Nombre" />
          <input type="text" name="price" value={nuevoProducto.price} onChange={handleInputChange} placeholder="Precio" />
          <input type="text" name="description" value={nuevoProducto.description} onChange={handleInputChange} placeholder="Descripción" />
          <input type="text" name="category" value={nuevoProducto.category} onChange={handleInputChange} placeholder="Categoría" />
          <input type="text" name="image" value={nuevoProducto.image} onChange={handleInputChange} placeholder="URL de la imagen" />
          <button onClick={crearProducto}>Agregar</button>
        </div>
      </div>
    </div>
  );
}