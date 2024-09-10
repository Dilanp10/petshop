import React, { useState, useEffect } from 'react';
import style from './medici.module.css';
import Sidebar from '../barraDeNavegacion/sidebar';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";

export function Medicina() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');
  const [vencimiento, setVencimiento] = useState('');

  const agregarProducto = async () => {
    if (nuevoProducto && nuevoStock && vencimiento){

        const confirmacionn=window.confirm('estas seguro de crear el producto '+ nuevoProducto);
      const nuevoProductoObj = { title: nuevoProducto, body: `Stock: ${nuevoStock}`, userId: 1 };

      if(confirmacionn){
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProductoObj),
          });
  
          if (response.ok) {
            const productoCreado = await response.json();
            setProductos([
              ...productos,
              {
                id: productoCreado.id,
                nombre: nuevoProducto,
                stock: nuevoStock,
                vencimiento: vencimiento,
              },
            ]);
            setNuevoProducto('');
            setNuevoStock('');
            setVencimiento('');
            window.history.back();
          } else {
            console.error('Error al agregar el producto:', response.statusText);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }
      }
  };

  return (
    <div className={style.conteinerprincipal}>
      <Sidebar />
      <div className={style.segundoConteiner}>
        <div className={style.conteiner3}>
          <h2>Crear Medicamento</h2>
          <input
            type="text"
            value={nuevoProducto}
            onChange={(e) => setNuevoProducto(e.target.value)}
            placeholder="Nombre del Medicamento"
          />
          <input
            type="number"
            value={nuevoStock}
            onChange={(e) => setNuevoStock(e.target.value)}
            placeholder="Stock"
          />
          <input
            type="date"
            value={vencimiento}
            onChange={(e) => setVencimiento(e.target.value)}
            placeholder="Fecha de Vencimiento"
          />
          <button className={style.bton} onClick={agregarProducto}>Agregar nuevo Medicamento</button>
        </div>
      </div>
    </div>
  );
}

export function ListaMedicina() {
  const [buscarMedicina, setBuscarMedicina] = useState('');
  const [medicinas, setMedicinas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicinas = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        // Simulamos la estructura de los datos con nombre, stock, precio y vencimiento
        const medicinas = data.slice(0, 10).map(item => ({
          id: item.id,
          nombre: `Medicina ${item.id}`,
          stock: Math.floor(Math.random() * 100),
          precio: (Math.random() * 10).toFixed(2),
          vencimiento: '2025-12-31',
        }));
        setMedicinas(medicinas);
      } catch (error) {
        console.error("Error al obtener las medicinas:", error);
      }
    };

    fetchMedicinas();
  }, []);

  const handleBuscarMedicina = (e) => {
    setBuscarMedicina(e.target.value);
  };

  const verDetalles = (id) => {
    navigate(`/medicinaDetalle/${id}`);
  };

  const medicinasFiltradas = medicinas.filter(medicina =>
    medicina.nombre.toLowerCase().includes(buscarMedicina.toLowerCase())
  );

  return (
    <div className={style.divLstado}>
      <Sidebar />
      <div className={style.divSegund}>
        <div className={style.hed}>
          <button className={style.botoncis}>
            <NavLink to='/medicina' className={style.link}>Crear <IoMdAddCircle color='white' size='23px' /></NavLink>
          </button>
          <input
            type="text"
            value={buscarMedicina}
            onChange={handleBuscarMedicina}
            placeholder="Buscar Medicina"
            className={style.inputBusqueda}
          />
        </div>
        <table className={style.tablaMedicinas}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicinasFiltradas.map((medicina) => (
              <tr key={medicina.id}>
                <td>{medicina.nombre}</td>
                <td>{medicina.stock}</td>
                <td>{medicina.precio}</td>
                <td>{medicina.vencimiento}</td>
                <td>
                  <button onClick={() => verDetalles(medicina.id)}>Ver Más</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DetallesMedicina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicina, setMedicina] = useState(null);
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [vencimiento, setVencimiento] = useState('');

  useEffect(() => {
    const fetchMedicina = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        const medicinaDetalles = {
          id: data.id,
          nombre: `Medicina ${data.id}`,
          stock: Math.floor(Math.random() * 100),
          precio: (Math.random() * 10).toFixed(2),
          vencimiento: '2025-12-31',
        };
        setMedicina(medicinaDetalles);
        setNombre(medicinaDetalles.nombre);
        setStock(medicinaDetalles.stock);
        setPrecio(medicinaDetalles.precio);
        setVencimiento(medicinaDetalles.vencimiento);
      } catch (error) {
        console.error("Error al obtener los detalles de la medicina:", error);
      }
    };

    fetchMedicina();
  }, [id]);

  const handleGuardarCambios = async () => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres guardar los cambios?');

    if (confirmacion) {
      const medicinaActualizada = {
        ...medicina,
        nombre,
        stock,
        precio,
        vencimiento,
      };

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicinaActualizada),
        });

        if (response.ok) {
          console.log('Medicina editada:', medicinaActualizada);
          navigate(-1); // Redirige a la página anterior
        } else {
          console.error('Error al guardar los cambios:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud de actualización:', error);
      }
    }
  };

  return (
    <div className={style.conteinerprincipal}>
      <Sidebar />
      <div className={style.segundoConteiner}>
        {medicina ? (
          <div>
            <h2>Detalles de {nombre}</h2>
            <div className={style.formulario}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={style.input}
              />

              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={style.input}
              />

              <label htmlFor="precio">Precio:</label>
              <input
                type="number"
                id="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className={style.input}
              />

              <label htmlFor="vencimiento">Vencimiento:</label>
              <input
                type="date"
                id="vencimiento"
                value={vencimiento}
                onChange={(e) => setVencimiento(e.target.value)}
                className={style.input}
              />
            </div>
            <button className={style.bton} onClick={handleGuardarCambios}>Guardar Cambios</button>
            <button className={style.bton} onClick={() => navigate(-1)}>Volver</button>
          </div>
        ) : (
          <p>Cargando detalles de la medicina...</p>
        )}
      </div>
    </div>
  );
}