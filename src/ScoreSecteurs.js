import React from "react";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ScoreSecteurs = (props) => {
    return (
        <Container className='border border-primary bg-light'> 
        <Row>
           <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center text-success'><h5>Secteur 1</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-primary'><h5>Secteur 2</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-secondary'><h5>Secteur 3</h5></Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center text-success'><h5>{props.scoreGlobal + 32640}</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-primary'><h5>{props.scoreGlobal + 17760}</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-secondary'><h5>{props.scoreGlobal + 16800}</h5></Col>
        </Row>
        <Row>
           <Col>&nbsp;</Col>
        </Row>
      </Container>

    )
}
export default ScoreSecteurs;