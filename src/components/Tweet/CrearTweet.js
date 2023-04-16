import React, {useState } from 'react'
import BasicLayout from '../../layout/BasicLayout';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth';
import {values, size} from "lodash"

import "./CrearTweet.scss"
import { crearTweetApi } from '../../api/tweets';


export default function CrearTweet() {
    const navigate = useNavigate();

    const user = useAuth()
    const [formData, setFormData] = useState('')
    const [loading, setLoading] = useState(false);


    const onSubmit = async (e) =>{

        e.preventDefault();

        //hago las validaciones antes de guardar den la BD
        if (size(formData.mensaje) === 0){
          toast.warning("Debes escribir algo.")  ;

        }else{

        //Inserto en la BASE DE DATOS
        setLoading(true)

        await crearTweetApi(formData).then(response =>{
            toast.success("Tu mensaje ha sido  creado")
            
          })
        .catch(()=>{
          toast.error("Error al crear el mensaje")
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
       <div className='crear-tweet'>
          <h2>
            Nuevo Tweet
         </h2>
        <div className='crear-tweet__form'>
            <Form onSubmit={onSubmit} onChange ={onChange }>
            <Form.Group>
                <Row>
                    <Col>
                    <Form.Control 
                        as="textarea"
                        type="text" 
                        placeholder='Escribe algo...' 
                        row="6"
                        value={formData?.mensaje}
                        name="mensaje"
                    />
                    </Col>
                </Row>
            </Form.Group>
            
            {loading? (
                   <div className='crear-tweet__loading'>
                        <Spinner animation="border" variant='info'/>
                        Publicando el mensaje...
                    </div>
                ):(
                    
                    <Button variant="primary" type="submit">
                     Tweetear
                    </Button>
                )
                }

        </Form>
      </div>

       </div>
    </BasicLayout>
  )
}
