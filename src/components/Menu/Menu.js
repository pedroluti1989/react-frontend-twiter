import React from 'react'
import { Link } from 'react-router-dom';
import LogoBlanco from "../../imagenes/png/logo-white.png";
import "./Menu.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff,faUser, faHome, faUsers} from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import {logoutApi} from "../../api/auth"

export default function Menu() {

    const logout = () =>{
        logoutApi();
        window.location.reload();
    }

  return (
    <div className='menu'>
        <img className='logo-menu' src={LogoBlanco} alt="logo de twiter" />

        <Link to="/">
            <FontAwesomeIcon icon={faHome} />Inicio
        </Link>
        <Link to="/usuarios">
            <FontAwesomeIcon icon={faUsers} />Usuarios
        </Link>
        <Link to="/perfil">
            <FontAwesomeIcon icon={faUser} />Mi Perfil
        </Link>
        <Link to="" onClick={logout}>
            <FontAwesomeIcon icon={faPowerOff} />Salir
        </Link>

        <Button>
            Twitear
        </Button>
        
     </div>
  )
}