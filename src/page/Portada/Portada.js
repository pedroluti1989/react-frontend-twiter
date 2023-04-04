import React, {useState} from 'react'
import {Container, Row, Col, Button} from "react-bootstrap"
import Logo from "../../imagenes/png/logo.png";
import LogoBlanco from "../../imagenes/png/logo-white.png";
import "./Portada.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import BasicModal from '../../components/Modal/BasicModal';
import FormularioRegistro from '../../components/FormularioRegistro';
import FormularioLogin from '../../components/FormularioLogin';

export default function Portada (props) {

    const {setRefreshLogin} = props;
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    //Funcion
    const openModal = (content) =>{
        setShowModal(true)
        setContentModal(content)
    }
  return (
    <>
        <Container className='signin-signup' fluid>
            <Row>
                <LeftComponent/>
                <RightComponent 
                  openModal = {openModal} 
                  setShowModal = {setShowModal} 
                  setRefreshLogin = {setRefreshLogin}
                />
            </Row>
        </Container>
        <BasicModal
          show = {showModal}
          setShow = {setShowModal}
        >
            {contentModal}
        </BasicModal>
    </>


  )

}

function LeftComponent() {
    return(
        <Col className='signin-signup__left' xs={6}>
            <img src={Logo} alt ="twiter logo"/>
            <div>
                <h3>
                   <FontAwesomeIcon icon={faSearch}/>
                   Sigue a gente que te interesa.
                </h3>
                <h3>
                   <FontAwesomeIcon icon={faUser}/>
                    Enterate de las tendencias.
                </h3>
                <h3>
                   <FontAwesomeIcon icon={faComment}/>
                    Unete a alguna conversacion.
                </h3>
            </div>
        </Col>
    )
}

function RightComponent(props) {
    
    const {openModal, setShowModal, setRefreshLogin} = props;
    return(
        <Col className='signin-signup__right'xs={6}>
            <div>
                <img src={LogoBlanco} />
                <h2>Mira lo que esta pasando en el mundo en este momento</h2>
                <h3>Unete a Twiter ahora mismo</h3>

                <Button 
                  onClick = {()=> openModal(<FormularioRegistro setShowModal = {setShowModal}/>) }  
                  variant="primary"
                >
                    Registrate
                </Button>
                <Button 
                  onClick ={()=> openModal(<FormularioLogin setShowModal = {setShowModal} setRefreshLogin= {setRefreshLogin}  />) } 
                  variant="outline-primary"
                >
                    Inicia Sesión
                </Button>
            </div>
        </Col>
    )
}
