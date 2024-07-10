import React, { useState } from 'react';
import './App.css';
import Login from './componentes-ingresos/login.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dos from './componentes-ingresos/dos.jsx';
import Ingreso from './componentes-ingresos/ingreso.jsx';
import IngresoAdmin from './componente-2/ingresoadmin.jsx';
import Lista from './componente-2/componente22/paginalista.jsx';
import Baja from './componente-2/componente22/paginaDeBaja.jsx';
import Agregar from './componente-2/componente22/paginaAgregar.jsx';
import {Productos,Create} from './componente-2/componente22/productos.jsx';
import {Medicina,ListaMedicina} from './componente-2/componente22/medicina.jsx';
import { UserContext } from './UserContext';
import { Atencion } from './componente-2/componente22/atencionCliente.jsx';

function App() {
  const [user, setUser] = useState();
  const [pruebaContraseña, setPruebaContraseña] = useState('');
  const [pruebaUsuario, setPruebaUsuario] = useState('');

  return (
    <UserContext.Provider value={user}>
      <div className='pp'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login setUser={setUser} />} />
            <Route path='/dos' element={<Dos setPrueba={setPruebaContraseña} setPruebaUsuario={setPruebaUsuario} />} />
            <Route path='/ingreso' element={<Ingreso />} />
            <Route path='/ingresoadmin' element={<IngresoAdmin />} />
            <Route path='/listaDeUsuario' element={<Lista />} />
            <Route path='/bajadeusuario' element={<Baja />} />
            <Route path='/agregarusuario' element={<Agregar prueba={pruebaContraseña} pruebaUsuario={pruebaUsuario} />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/create' element={<Create />} />
            <Route path='/medicina' element={<Medicina />} />
            <Route path='/medicinaList' element={<ListaMedicina />} />
            <Route path='/atencionClients' element={<Atencion/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;