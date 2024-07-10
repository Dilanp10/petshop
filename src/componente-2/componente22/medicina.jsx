import React, { useState } from 'react';
import style from './medici.module.css';
import Sidebar from '../barraDeNavegacion/sidebar';
import { NavLink } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";


export function Medicina() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [buscarProducto, setBuscarProducto] = useState('');
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [productoEditado, setProductoEditado] = useState({ nombre: '', stock: '', vencimiento: '' });
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const agregarProducto = () => {
    if (nuevoProducto && nuevoStock && vencimiento) {
      const nuevoProductoObj = { id: Date.now(), nombre: nuevoProducto, stock: nuevoStock, vencimiento: vencimiento };
      setProductos([...productos, nuevoProductoObj]);
      setNuevoProducto('');
      setNuevoStock('');
      setVencimiento('');
    }
  };

  const confirmarEliminacion = (producto) => {
    setProductoAEliminar(producto);
  };

  const eliminarProducto = () => {
    setProductos(productos.filter((producto) => producto.id !== productoAEliminar.id));
    setProductoAEliminar(null);
  };

  const iniciarEdicion = (producto) => {
    setEditandoProducto(producto.id);
    setProductoEditado({ nombre: producto.nombre, stock: producto.stock, vencimiento: producto.vencimiento });
  };

  const manejarCambioEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado({ ...productoEditado, [name]: value });
  };

  const editarProducto = (id) => {
    setProductos(productos.map((producto) =>
      producto.id === id ? { ...producto, nombre: productoEditado.nombre, stock: productoEditado.stock, vencimiento: productoEditado.vencimiento } : producto
    ));
    setEditandoProducto(null);
  };

  const manejarCambioStock = (id, cantidad) => {
    setProductos(productos.map((producto) =>
      producto.id === id ? { ...producto, stock: cantidad } : producto
    ));
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(buscarProducto.toLowerCase())
  );

  const hoy = new Date();
  const productosVencidos = productos.filter(producto => new Date(producto.vencimiento) < hoy);

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
        <div>
          <h3>Listado de Medicamentos</h3>
          <input
            type="text"
            placeholder="Buscar Medicamento"
            value={buscarProducto}
            onChange={(e) => setBuscarProducto(e.target.value)}
          />
          <form className={style.formulario}>
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className={style.producto}>
                {editandoProducto === producto.id ? (
                  <>
                    <input
                      type="text"
                      name="nombre"
                      value={productoEditado.nombre}
                      onChange={manejarCambioEdicion}
                    />
                    <input
                      type="number"
                      name="stock"
                      value={productoEditado.stock}
                      onChange={manejarCambioEdicion}
                      placeholder="Stock"
                    />
                    <input
                      type="date"
                      name="vencimiento"
                      value={productoEditado.vencimiento}
                      onChange={manejarCambioEdicion}
                    />
                    <button type="button" onClick={() => editarProducto(producto.id)}>Guardar</button>
                    <button type="button" onClick={() => confirmarEliminacion(producto)}>Eliminar</button>
                  </>
                ) : (
                  <>
                    <span className={style.spa}>{producto.nombre}</span>
                    <span className={style.spa}>Stock: {producto.stock}</span>
                    <span className={style.spa}>Vence: {new Date(producto.vencimiento).toLocaleDateString()}</span>
                    <button type="button" onClick={() => iniciarEdicion(producto)}>Editar</button>
                    <button type="button" onClick={() => manejarCambioStock(producto.id,Number(producto.stock) + 1)}>Aumentar Stock</button>
                    <button type="button" onClick={() => manejarCambioStock(producto.id, Number(producto.stock) - 1)}>Disminuir Stock</button>
                  </>
                )}
              </div>
            ))}
          </form>
        </div>
        <div>
          <h3>Aviso de Vencimiento</h3>
          <ul>
            {productosVencidos.map((producto) => (
              <li key={producto.id}>{producto.nombre} <span className={style.spa}> venció el {new Date(producto.vencimiento).toLocaleDateString()} </span></li>
            ))}
          </ul>
        </div>
      </div>
      {productoAEliminar && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h4>Confirmar Eliminación</h4>
            <p>¿Está seguro que desea eliminar {productoAEliminar.nombre}?</p>
            <button onClick={eliminarProducto}>Eliminar</button>
            <button onClick={() => setProductoAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}



export function ListaMedicina() {
  const [buscarMedicina, setBuscarMedicina] = useState('');
  const [modalAbierta, setModalAbierta] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [medicinas, setMedicinas] = useState([
    { id: 1, nombre: 'Aspirina', stock: 100, precio: 5.99, vencimiento: '2024-12-01' },
    { id: 2, nombre: 'Paracetamol', stock: 50, precio: 3.49, vencimiento: '2023-10-15' },
    { id: 3, nombre: 'Ibuprofeno', stock: 75, precio: 4.99, vencimiento: '2025-07-20' },
  ]);

  const handleBuscarMedicina = (e) => {
    setBuscarMedicina(e.target.value);
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierta(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setModalAbierta(false);
  };

  const handleEditar = () => {
    if (productoSeleccionado) {
      const medicinasActualizadas = medicinas.map(medicina =>
        medicina.id === productoSeleccionado.id ? productoSeleccionado : medicina
      );
      setMedicinas(medicinasActualizadas); // Actualizar la lista de medicinas
      console.log('Medicina editada:', productoSeleccionado);
    }
    cerrarModal(); // Cerrar modal después de editar
  };

  const handleEliminar = () => {
    if (productoSeleccionado) {
      const medicinasActualizadas = medicinas.filter(medicina =>
        medicina.id !== productoSeleccionado.id
      );
      setMedicinas(medicinasActualizadas); // Actualizar la lista de medicinas
      console.log('Medicina eliminada:', productoSeleccionado);
    }
    cerrarModal(); // Cerrar modal después de eliminar
  };

  const medicinasFiltradas = medicinas.filter(medicina =>
    medicina.nombre.toLowerCase().includes(buscarMedicina.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={style.divLstado}>
      <Sidebar />
      <div className={style.divSegund}>
        <div className={style.hed}>
          <button className={style.botoncis}>
            <NavLink to='/medicina' className={style.link}>Crear <IoMdAddCircle color='white' size='23px'  /></NavLink>
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
            {medicinasFiltradas.map((medicina, index) => (
              <tr key={medicina.id}>
                <td>{medicina.nombre}</td>
                <td>{medicina.stock}</td>
                <td>{medicina.precio}</td>
                <td>{medicina.vencimiento}</td>
                <td>
                  <button className={style.botonAcciones} onClick={() => abrirModal(medicina)}>Ver Más</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalAbierta && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h4>{productoSeleccionado ? `Detalles de ${productoSeleccionado.nombre}` : 'Detalles del Producto'}</h4>
            <div className={style.formulario}>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={productoSeleccionado.nombre} onChange={handleChange} />

              <label htmlFor="stock">Stock:</label>
              <input type="number" id="stock" name="stock" value={productoSeleccionado.stock} onChange={handleChange} />

              <label htmlFor="precio">Precio:</label>
              <input type="number" id="precio" name="precio" step="0.01" value={productoSeleccionado.precio} onChange={handleChange} />

              <label htmlFor="vencimiento">Vencimiento:</label>
              <input type="date" id="vencimiento" name="vencimiento" value={productoSeleccionado.vencimiento} onChange={handleChange} />
            </div>
            <div className={style.accionesModal}>
              <button className={style.botonModal} onClick={handleEditar}>Guardar</button>
              <button className={style.botonModal} onClick={handleEliminar}>Eliminar</button>
              <button className={style.botonModal} onClick={cerrarModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}