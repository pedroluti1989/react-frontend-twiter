import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editarUsuarioApi, getUserApi, subirAvatarApi, subirBannerApi } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'
import BasicLayout from '../../../layout/BasicLayout'
import {validarEmail } from '../../../utils/validaciones/validarFormRegistro'
import {useDropzone} from "react-dropzone"

import "./EditarUsuario.scss"
import { API_HOST } from '../../../utils/constantes'
import { Camara } from '../../../utils/Icons'

 export default function EditarUsuario(props) {
    const navigate = useNavigate();

    const user = useAuth()
    const [formData, setFormData] = useState(iniciarFormulario(user))
    const [loading, setLoading] = useState(false);
    const [bannerFile, setBannerFile] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)

    const [avatarUrl, setAvatarUrl] = useState(
      `${API_HOST}/obtenerAvatar?id=${user._id}`
    );
    const [bannerUrl, setBannerUrl] = useState(
      `${API_HOST}/obtenerBanner?id=${user._id}`
    );

  //Para subir el fichero del Banner
    //----------------------------------------------------------------------------------------------
  const onDropBanner = useCallback(aceptedFile =>{
    const file = aceptedFile[0]
    setBannerUrl(URL.createObjectURL(file))
    setBannerFile(file) //Guardo el fichero en un estado
  })

  const {getRootProps: getRootPropsBanner, getInputProps: getInputPropsBanner} = useDropzone({
    accept:"image/png, image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner

  })
  //--------------------------------------------------------------------------------------------------


    //Para subir el fichero del Avatar
    //----------------------------------------------------------------------------------------------
    const onDropAvatar = useCallback(aceptedFile =>{
      const file = aceptedFile[0]
      setAvatarUrl(URL.createObjectURL(file))
      setAvatarFile(file) //Guardo el fichero en un estado
    })
  
    const {getRootProps: getRootPropsAvatar, getInputProps: getInputPropsAvatar} = useDropzone({
      accept:"image/png, image/jpeg",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropAvatar
  
    })
    //--------------------------------------------------------------------------------------------------

  useEffect( ()=>{
      getUserApi(user._id)
      .then(response =>{
        setFormData(response)
          
      })
      .catch(() =>{
          toast.error("El usuario no existe en la base de datos")
      })
  },[user])
  

  /* ---------Guardar los datos en la BD --------------------------------------------------------------------------------*/

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
            
            })

            /* Actualizo el Banner */
            if (bannerFile){
              await subirBannerApi(bannerFile)
              .catch(()=>{
                  toast.error("Error al subir el Banner")
              })
            }

             /* Actualizo el Avatar */
             if (avatarFile){
                 await subirAvatarApi(avatarFile)
                .catch(()=>{
                   toast.error("Error al subir el Avatar")
                })
              }

            /* Regreso a la pagina anterior */

            navigate(`/${user._id}`)


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
            
          <div 
            className='banner' 
            style={{backgroundImage:`url('${bannerUrl}')`}}
            {...getRootPropsBanner()}
          >
              <input {...getInputPropsBanner()} />
              <Camara />
          </div>

          <div 
              className='avatar' 
              style={{backgroundImage:`url('${avatarUrl}')`}}
              {...getRootPropsAvatar()}
              >
              <input {...getInputPropsAvatar()} />
              <Camara />
            </div>


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
            {loading? (
                   <div className='editar-user__loading'>
                        <Spinner animation="border" variant='info'/>
                        Procesando...
                    </div>
                ):(
                    
                  <Button variant="primary" type="submit">
                  Aplicar Cambios
                  </Button>
                )
                }

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