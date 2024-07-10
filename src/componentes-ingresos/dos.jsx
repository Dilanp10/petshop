import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../hojasDeEstilos/estiloDos.css';
import { useState } from 'react';
import { IoIosHome } from "react-icons/io";

export default function Registarse({setPrueba,setPruebaUsuario}) {

const[usuario,setUsuario] = useState();
const[contraseña,setContraseña] = useState();
const[doble,setDobles] = useState();
const navigate=useNavigate();

  function guardarUsuario(e){
    setUsuario(e.target.value)
  }
  function guardarContraseña(e){
    setContraseña(e.target.value)
  }
  function guardarDoble(e){
    setDobles(e.target.value)
  }
  function corroborar(){
    if(contraseña===doble){
      alert(`bienvenido ${usuario}, tienes que esperar al admin que te acepte`);
     navigate('/');
     setPrueba(contraseña);
     setPruebaUsuario(usuario);
    }else{
      alert('la contraseña no coinciden')
    }
  }
  
  
  return (
    <div className='divprincipal'>
      <Link to='/'> <IoIosHome size={35} /></Link> 
        <div className='registro'>

          <h2>Patitas <img className='logo' src={require('../img/perro.png')} /></h2>
          <p><u>ingrese su usuario</u></p>
          <input  
          value={usuario}
          onChange={guardarUsuario}
          
          />
          <p><u>ingrese su contraseña</u></p>
          <input 
          type='password' 
          value={contraseña}
          onChange={guardarContraseña}
          
          />
          <p><u>repita su contraseña</u></p>
          <input  
            type='password' 
            value={doble}
            onChange={guardarDoble}
            />
           <button className='botn' onClick={corroborar}>ACEPTAR</button>


        </div>
      
    </div>
  )
}
