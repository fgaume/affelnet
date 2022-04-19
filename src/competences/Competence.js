import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompetenceSelector from './CompetenceSelector';

const Competence = (props) => {
    return (
        <Form.Group className="mb-3">
            <Row xs={2} md={4} lg={6}>
                <Col>
                    <Form.Label>{props.label}</Form.Label>
                </Col>
                <Col>
                    <CompetenceSelector label={props.label} onChange={props.onChange}/>
                </Col>
            </Row>
        </Form.Group>
    )
}
export default Competence;