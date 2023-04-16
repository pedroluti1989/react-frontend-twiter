
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { dejarSeguirUserApi, seguirUserApi, siguiendoUserApi } from '../../../api/follow';

export default function BotonSeguir(props) {
    const {user} = props;
    const [siguiendo, setSiguiendo] = useState(null)
    
  useEffect(()=>{
    siguiendoUserApi(user?.id)
    .then(response =>{
      if (response?.status){
        setSiguiendo(true)
      }else{
        setSiguiendo(false)
      }
    })
  },[user])

   /* Dejar de seguir al usuario --------------------------------------------------------------------*/
  const dejarSeguir = ()=>{
    dejarSeguirUserApi(user?.id)
    .then(response=>{
      if (response?.status){
        setSiguiendo(true)
      }else{
        setSiguiendo(false)
      }

    })
  }

     /* Seguir al usuario --------------------------------------------------------------------*/
     const seguir = ()=>{
      seguirUserApi(user?.id)
      .then(response=>{
        if (response?.status){
          setSiguiendo(true)
        }else{
          setSiguiendo(false)
        }
  
      })
    }

    if (siguiendo !== null){
      if(siguiendo){
        return (
          <div className='boton-seguir'>
               <Button className='boton-seguir__siguiendo'  >Siguiendo</Button>
               <Button className='boton-seguir__noseguir'  onClick={()=> dejarSeguir()}>Dejar de Seguir</Button>
             </div>
          )
      }
    }
   return           <div className='boton-seguir'><Button onClick={()=> seguir()} >Seguir</Button></div>
   

}
