import React from 'react'
import styles from'../hojasDeEstilos/ingresoestilo.module.css';
import { IoIosHome } from "react-icons/io";
import { Link } from 'react-router-dom';
import {NavPrincioal} from '../componente-2/barraDeNavegacion/navPrincioal'



function Ingreso() {
  return (
    <div className={styles.conteinerPrincipal}>
        <NavPrincioal/>
    </div>
  )
}

export default Ingreso
