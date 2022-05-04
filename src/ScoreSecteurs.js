import React from "react";
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { bonusSecteur } from "./data/affelnet";

const ScoreSecteurs = (props) => {
    return (
        <Container className='border border-primary bg-light rounded-pill'> 
        <Row>
           <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center text-success'>
            <h5>Secteur 1</h5>
          </Col>
          <Col className='d-flex justify-content-center text-primary'>
            <h5>Secteur 2</h5>
          </Col>
          <Col className='d-flex justify-content-center text-secondary'>
            <h5>Secteur 3</h5>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center text-success'>
          <OverlayTrigger placement="right" overlay={
                props => (
                    <Tooltip {...props}>Mon score pour les voeux de lycées en secteur 1</Tooltip>
                  )
            }>
            <h5>{(props.scoreGlobal + bonusSecteur.get('1')).toLocaleString()}</h5>
            </OverlayTrigger>
          </Col>
          <Col className='d-flex justify-content-center text-primary'>
          <OverlayTrigger placement="right" overlay={
                props => (
                    <Tooltip {...props}>Mon score pour les voeux de lycées en secteur 2</Tooltip>
                  )
            }>
            <h5>{(props.scoreGlobal + bonusSecteur.get('2')).toLocaleString()}</h5>
            </OverlayTrigger>
          </Col>
          <Col className='d-flex justify-content-center text-secondary'>
          <OverlayTrigger placement="right" overlay={
                props => (
                    <Tooltip {...props}>Mon score pour les voeux de lycées en secteur 3</Tooltip>
                  )
            }>
            <h5>{(props.scoreGlobal + bonusSecteur.get('3')).toLocaleString()}</h5>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row>
           <Col>&nbsp;</Col>
        </Row>
      </Container>

    )
}
export default ScoreSecteurs;