import React, { useRef } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompetenceSelector from './CompetenceSelector';
import { forwardRef, useImperativeHandle } from "react";

const Competence = (props, ref) => {

    let competenceSelectorRef = useRef();

    useImperativeHandle(ref, () => ({
        setScoreFromOutside (value) {
            competenceSelectorRef.current.setScoreFromOutside(value);
        },
        getScore() {
            return competenceSelectorRef.current.getScore();
        }
      }), [])

    return (
        <Form.Group className="mb-3">
            <Row xs={2} md={4} lg={6}>
                <Col>
                    <Form.Label>{props.label}</Form.Label>
                </Col>
                <Col>
                    <CompetenceSelector
                        label={props.label}
                        onChange={props.onChange}
                        ref={competenceSelectorRef} />
                </Col>
            </Row>
        </Form.Group>
    )
}

export default forwardRef(Competence);