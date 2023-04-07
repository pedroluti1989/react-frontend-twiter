import React from 'react'
import { Container , Row, Col} from 'react-bootstrap';
import Menu from '../../components/Menu';

import "./BasicLayout.scss"

export default function BasicLayout(props) {
    const {children, className} = props;
  return (
    <Container className={`basic-layout ${className}`}>
        <Row>
            <Col xs={3} className='basic-layout__menu'>
                <Menu/>
            </Col>
            <Col xs={9} className='basic-layout__content'>
                {children}
            </Col>
        </Row>
    </Container>
  )
}
