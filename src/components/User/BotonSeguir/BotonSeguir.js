
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { dejarSeguirUserApi, seguirUserApi, siguiendoUserApi } from '../../../api/follow';
import "./BotonSeguir.scss"

export default function BotonSeguir(props) {
    const {user} = props;
    const [siguiendo, setSiguiendo] = useState(null)
    const [reload, setReload] = useState(null)
    
  useEffect(()=>{
    if (user){
        siguiendoUserApi(user?.id)
        .then(response =>{
          if (response?.status){
            setSiguiendo(true)
          }else{
            setSiguiendo(false)
          }
        })
    }

    setReload(false)
  },[user, reload])

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
        setReload(true)
  
      })
    }

    if (siguiendo !== null){
      if(siguiendo){
        return (
          <div className='boton-seguir'>
               <Button className='siguiendo'  ><span>Siguiendo</span></Button>
               <Button className='nosiguiendo'  onClick={()=> dejarSeguir()}><span>Dejar de Seguir</span></Button>
             </div>
          )
      }
    }
   return  <div className='boton-seguir'><Button onClick={()=> seguir()} >Seguir</Button></div>
   

}
