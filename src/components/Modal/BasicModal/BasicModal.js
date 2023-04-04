import React from 'react';
import { Modal } from 'react-bootstrap';
import "./BasicModal.scss";
import LogoBlanco from "../../../imagenes/png/logo-white.png";

export default function BasicModal(props) {
    const {show, setShow, children} = props;
  return (
    <Modal
      className='basic-modal'
      show={show}
      centered
      onHide={() => setShow(false)}
      size="lg"
    >
       <Modal.Header>
          <Modal.Title>
            <img src={LogoBlanco} alt ="twiter"/>
          </Modal.Title>
       </Modal.Header>
       <Modal.Body>
          {children}
       </Modal.Body>

    </Modal>
  )
}
