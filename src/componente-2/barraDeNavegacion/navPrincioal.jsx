import React, { useState, useContext } from 'react';
import styles from '../../hojasDeEstilos/navPrinci.module.css';
import { NavLink } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { UserContext } from '../../UserContext';
import { GiMedicines } from "react-icons/gi";


export function NavPrincioal() {
  const user = useContext(UserContext);

  const [visible, setVisible] = useState(true);
  function barraVisble() {
    setVisible(!visible);
  }

  return (
    <div className={styles.ConteinerP}>
      <div className={styles.barra}>
        <button onClick={barraVisble} className={styles.botonBarra}>
          <FaList size={30} color='white' />
        </button>
        {visible && (
          <div className={styles.barraDos}>
            <NavLink to='/ingresoadmin' className={styles.focusLink}>
              <IoIosHome size={35} color='white' />
            </NavLink>
            <IoPersonSharp size={35} color='white' />
            {user === 'admin' && (
              <NavLink to='/controlDeUsuario' className={styles.focusLink}>
                <BsPersonPlusFill size={35} color='white' />
              </NavLink>
            )}
            <NavLink to='/productos' className={styles.focusLink}>
              <FaCartShopping size={35} color='white' />
            </NavLink>
            <NavLink to='/medicina'> <GiMedicines size={35} color='white' /> </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}