import React, {useContext} from 'react';
import '../../hojasDeEstilos/sideBar.css';
import { NavLink } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { UserContext } from '../../UserContext';


function Sidebar() {

    const usuario = useContext(UserContext);

  

    return (
        <nav className="sidebar">
            <ul>
                <li className='list'>
                   
                      <NavLink to='/ingresoadmin' className='marca' >
                        Inicio <IoIosHome size={20} color='bisque' />
                      </NavLink>
                    
                </li>
              { usuario === 'admin' &&  (<li className='list'>
                    <NavLink to='/listaDeUsuario' className='marca' >
                        Lista 
                    </NavLink>
                </li>)}
                <li className='list'>
                    <NavLink to='/productos' className='marca' >
                        Productos 
                    </NavLink>
                </li>
                <li className='list'>
                    <NavLink to='/medicinaList' className='marca' >
                        Medicamentos
                    </NavLink>
                </li>
                <li  className='list'>
                    <NavLink to='/atencionClients' className='marca' >
                        Atencion a Clientes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;