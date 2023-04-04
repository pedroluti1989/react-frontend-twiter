import React, { useState } from 'react'
import "./FormularioRegistro.scss"
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import validarCamposVacios, { validarEmail, validarPassword } from '../../utils/validaciones/validarFormRegistro';
import {toast} from "react-toastify"
import { registrarAPI } from '../../api/auth';
export default function FormularioRegistro(props) {

    const {setShowModal} = props;
    const [formData, setFormData] = useState(iniciarFormulario)
    const [loading, setLoading] = useState(false);
    
    const onSubmit = (e) =>{

        e.preventDefault();

        //hago las validaciones antes de guardar den la BD
        if (!validarEmail(formData.email)){
          toast.warning("Debes Ingresar un Email Valido")  ;

        }else if(!validarPassword(formData.password, formData.repetir_password)){
          toast.warning("Las contraseñas ingresadas no coinciden")  ;

        }else if(!validarCamposVacios(formData)){
           toast.warning("Debes completar todos los campos")  ;
        }
        else{

        //Inserto en la BASE DE DATOS
        //muestro el Spinner
        setLoading(true)

        registrarAPI(formData).then(response =>{
          if (response.code){
            toast.warning(response.message)
          }else{
            toast.success("Te has registrado correctamente en Twiter")
            setFormData(iniciarFormulario)
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
    <div className='sign-up-form'>
      <h2>Registrate</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
         <Form.Group>
            <Row>
              <Col>
                  <Form.Control 
                     type="text" placeholder='Nombre' 
                     value={formData.nombre}
                     name="nombre"
                  />
              </Col>
              <Col>
                  <Form.Control 
                    type="text" placeholder='Apellido'
                    value={formData.apellido}
                    name="apellido"
                   />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
                  <Form.Control 
                    type="email" placeholder='Email'
                    value={formData.email}
                    name="email"
                    defaultValue={formData.email}
                  />
         </Form.Group>

         <Form.Group>
            <Row>
              <Col>
                  <Form.Control 
                    type="password" placeholder='Contraseña' 
                    value={formData.password}
                    name="password"
                    defaultValue={formData.password}
                  />
              </Col>
              <Col>
                  <Form.Control 
                    type="password" placeholder='Repetir Contraseña' 
                    value={formData.repetir_password}
                    name="repetir_password"
                    defaultValue={formData.repetir_password}
                  />
              </Col>
            </Row>
          </Form.Group>
         
         <Button variant="primary" type="submit">
           {!loading?  "Registrar" : <Spinner animation='border'/>}
         </Button>

      </Form>
    </div>
  )
}

const  iniciarFormulario = () =>{
  return{
    nombre:"",
    apellido:"",
    password:"",
    repetir_password:"",
    email:""
  }
}