import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editarUsuarioApi, getUserApi } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'
import BasicLayout from '../../../layout/BasicLayout'
import {validarEmail } from '../../../utils/validaciones/validarFormRegistro'

import "./EditarUsuario.scss"

 export default function EditarUsuario(props) {
    const navigate = useNavigate();

    const user = useAuth()
    const [formData, setFormData] = useState(iniciarFormulario(user))
    const [loading, setLoading] = useState(false);
  useEffect( ()=>{
      getUserApi(user._id)
      .then(response =>{
        setFormData(response)
          
      })
      .catch(() =>{
          toast.error("El usuario no existe en la base de datos")
      })
  },[user])
  

    const onSubmit = async (e) =>{

        e.preventDefault();

        //hago las validaciones antes de guardar den la BD
        if (!validarEmail(formData.email)){
          toast.warning("Debes Ingresar un Email Valido")  ;

        }else if(formData.email ===null || formData.nombre ===null ||  formData.apellido === null){
           toast.warning("Debes completar todos los campos obligtorios")  ;
        }
        else{

        //Inserto en la BASE DE DATOS
        //muestro el Spinner
        setLoading(true)

        await editarUsuarioApi(formData).then(response =>{
            toast.success("Se han actualizado los datos correctamente")
            
          })
        .catch(()=>{
          toast.error("Error al actualizar los datos")
        })
        .finally(()=>{
          setLoading(false)
          navigate(`/${user._id}`)
        
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
                        defaultValue={formData.nombre}
                    />
                </Col>
                <Col>
                    <Form.Control 
                        type="text" placeholder='Apellido'
                        value={formData.apellido}
                        name="apellido"
                        defaultValue={formData.apellido}
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
                        defaultValue={formData.email}
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
                        as="textarea"
                        type="text" 
                        placeholder='Biografia' 
                        row="5"
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
      nombre: user.nombre || "",
      apellido: user.apellido|| "",
      email: user.email|| "",
      ubicacion: user.ubicacion|| "",
      sitioWeb: user.sitioWeb|| "",
      biografia: user.biografia|| "",
      id: user._id
    }
  }