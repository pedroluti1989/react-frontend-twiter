import React from 'react'
import "./ListaUsuarios.scss"
import {isEmpty, map} from "lodash"
import User from './User';
import BotonSeguir from '../User/BotonSeguir';

export default function ListaUsuarios(props) {
    const {users} = props;

    if (isEmpty(users) ){
        return (<h4>No se han encontrado resultados.</h4>)
    }
  return (
    <ul className='lista-usuarios'>
        {map(users, user => (
            <User user={user} />
        ))}
    </ul>
  )
}
