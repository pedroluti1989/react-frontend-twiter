import React, { useState } from 'react'
import {Form, Button, Spinner} from "react-bootstrap"
import validarCamposVacios, { validarEmail } from '../../utils/validaciones/validarFormRegistro'
import {toast} from "react-toastify"
import "./FormularioLogin.scss"
import { loginAPI, setTokenAPI } from '../../api/auth'

export default function FormularioLogin(props) {

    const {setShowModal,setRefreshLogin} = props;
    const [formData, setFormData] = useState(iniciarFormulario)
    const [loading, setLoading] = useState(null)

    const onSubmit = (e) =>{
        e.preventDefault()
         //hago las validaciones antes de guardar den la BD
     
        if(!validarCamposVacios(formData)){
                     toast.warning("Debes completar todos los campos")  ;
        }
        else if (!validarEmail(formData.email)){
                      toast.warning("Debes Ingresar un Email Valido")  ;
        }
        else{
          
         //Inserto en la BASE DE DATOS
         //muestro el Spinner
         setLoading(true)

         loginAPI(formData).then(response =>{
            if (response.message){
              toast.warning(response.message)
            }else{
              console.log(response.token)
              setTokenAPI(response.token)
              toast.success("Te has logueado correctamente")
              setRefreshLogin(true)
              //setFormData(iniciarFormulario)
              //setShowModal(false)
            }
          })
          .catch(()=>{
            toast.error("Error en el Servidor, intentelo mas tarde")
          })
          .finally(()=>{
             setLoading(false)
            setShowModal(false)
  
          })

         }
    }

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
      }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>

          <Form.Group>
                  <Form.Control 
                    type="email" placeholder='Email'
                    value={formData.email}
                    name="email"
                    defaultValue={formData.email}
                  />
         </Form.Group>

         <Form.Group>
                  <Form.Control 
                    type="password" placeholder='Contraseña' 
                    value={formData.password}
                    name="password"
                    defaultValue={formData.password}
                  />
          </Form.Group>
         
         <Button variant="primary" type="submit">
           {!loading?  "Iniciar Sesion" : <Spinner animation='border'/>}
         </Button>

      </Form>
    </div>
  )
}

const  iniciarFormulario = () =>{
    return{
      password:"",
      email:""
    }
  }