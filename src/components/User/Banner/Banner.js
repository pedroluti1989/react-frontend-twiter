import React from 'react'
import { API_HOST } from '../../../utils/constantes';
import avatarDefault from "../../../imagenes/png/avatar-no-found.png"
import "./Banner.scss"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BotonSeguir from '../BotonSeguir/BotonSeguir';

export default function Banner(props) {

    const {user, usuarioLogueado} = props;
    const bannerUrl = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}`: null;
    const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}`: avatarDefault;


  if (user){
  return (
    <div 
      className='banner'
      style={{backgroundImage: `url('${bannerUrl}')`}}
    >
        <div 
        className='avatar'
        style={{backgroundImage: `url('${avatarUrl}')`}}
        />
        <div className='options'>
S
             {(usuarioLogueado?._id === user?.id ) &&(  
                <Link to="/edicionUser" ><Button>Editar</Button></Link> 
             )}

             {(usuarioLogueado?._id !== user?.id ) &&( <BotonSeguir user={user} /> )}

        </div>
    
    </div>
  )
   }
}
