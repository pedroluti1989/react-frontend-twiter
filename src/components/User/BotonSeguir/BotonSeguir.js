import { set } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { API_HOST } from '../../../utils/constantes';

export default function BotonSeguir(props) {
    const {user} = props;
    const [siguiendo, setSiguiendo] = useState(
        `${API_HOST}/consultarRelacion?id=${user._id}`
      );

  useEffect(()=>{
    setSiguiendo(`${API_HOST}/consultarRelacion?id=${user._id}`)
  },[user])

  const dejarSeguir = ()=>{
    setSiguiendo(`${API_HOST}/bajaRelacion?id=${user._id}`)
  }

  return (
    <div className='boton-seguir'>
        {siguiendo? (
          <div>
             <Button>Siguiendo</Button>
             <Button onClick={()=> dejarSeguir()}>Dejar de Seguir</Button>
           </div>
        )
        :(
        <Button>Seguir</Button>
        )
       }

    </div>
  )
}
