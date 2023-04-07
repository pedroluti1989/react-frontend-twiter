import React, { useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { editarUsuarioApi } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'
import BasicLayout from '../../../layout/BasicLayout'
import validarCamposVacios, { validarEmail } from '../../../utils/validaciones/validarFormRegistro'

import "./EditarUsuario.scss"

export default function EditarUsuario() {
    const usuarioLogueado = useAuth()
    const [formData, setFormData] = useState(iniciarFormulario(usuarioLogueado))
    const [loading, setLoading] = useState(false);

      console.log(usuarioLogueado)

    const onSubmit = (e) =>{

        e.preventDefault();

        //hago las validaciones antes de guardar den la BD
        if (!validarEmail(formData.email)){
          toast.warning("Debes Ingresar un Email Valido")  ;

        }else if(!validarCamposVacios(formData)){
           toast.warning("Debes completar todos los campos")  ;
        }
        else{

        //Inserto en la BASE DE DATOS
        //muestro el Spinner
        setLoading(true)

        editarUsuarioApi(formData).then(response =>{
          if (response.code){
            toast.warning(response.message)
          }else{
            toast.success("Se han aplicado los cambios correctamente")
            setFormData(iniciarFormulario)
          }
        })
        .catch(()=>{
          toast.error("Error en el Servidor, intentelo mas tarde")
        })
        .finally(()=>{
           setLoading(false)

        })
        }
        
    }

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
      }
  return (
    <BasicLayout>
       <div className='editar-user'>
          <h2>
            Modificar mis Datos
         </h2>
        <div className='editar-user__form'>
            <Form onSubmit={onSubmit} onChange ={onChange }>
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
                        type="text" placeholder='Ubicacion' 
                        value={formData.ubicacion}
                        name="ubicacion"
                        defaultValue={formData.ubicacion}
                    />
                </Col>
                <Col>
                    <Form.Control 
                        type="text" placeholder='Sitio Web' 
                        value={formData.sitioWeb}
                        name="sitioWeb"
                        defaultValue={formData.sitioWeb}
                    />
                </Col>
                </Row>
            </Form.Group>

            <Form.Group>
                <Row>
                    <Col>
                    <Form.Control 
                        type="textarea" placeholder='Biografia' 
                        value={formData.biografia}
                        name="biografia"
                        defaultValue={formData.biografia}
                    />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
        
                    <Form.Control 
                        type="password" 
                        value={formData.id}
                        name="is"
                        defaultValue={formData.id}
                        hidden
                    />
       
            </Form.Group>
            
            <Button variant="primary" type="submit">
            {!loading?  "Aplicar Cambios" : <Spinner animation='border'/>}
            </Button>

        </Form>
      </div>

       </div>
    </BasicLayout>
  )
}

const  iniciarFormulario = (user) =>{
    return{
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      ubicacion: user.ubicacion,
      sitioWeb: user.sitioWeb,
      biografia: user.biografia,
      id: user.id
    }
  }
