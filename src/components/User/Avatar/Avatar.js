import React from 'react'
import {Image} from "react-bootstrap"
import { API_HOST } from '../../../utils/constantes';
import avatarDefault from "../../../imagenes/png/avatar-no-found.png"
import "./Avatar.scss"

export default function Avatar(props) {

    const {user} = props;
    const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}`: avatarDefault;
  return (
    <Image
       width={64}
       height={64}
       roundedCircle
    
       src={avatarUrl}
       alt={`${user?.nombre} ${user?.apellido}`}

    />
  )
}
