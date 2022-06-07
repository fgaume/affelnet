import React, { useState, useRef } from "react";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { updateSeuil } from '../seuildata';
import { listeLycees as lycees } from '../data/lycees';

import { Typeahead } from "react-bootstrap-typeahead";

const SeuilEditor = () => {

    const typeaheadRef = useRef(null);
    const [lyceeSeuil, setLyceeSeuil] = useState('');
    const [seuilLycee, setSeuilLycee] = useState(0);

    const onLyceeChange = (lyceeUpdate) => {
        setLyceeSeuil(lyceeUpdate[0]);
    }

    const onSeuilLyceeChange = (event) => {
        setSeuilLycee(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSeuil(lyceeSeuil.code, seuilLycee);
        typeaheadRef.current.clear();
        document.getElementById("seuilLycee").value = '';
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row >
                    <Col>
                        <Typeahead
                            id='lyceeSeuil'
                            labelKey='nom'
                            onChange={onLyceeChange}
                            options={lycees}
                            placeholder='nom du lycée'
                            ref={typeaheadRef}                  
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            id='seuilLycee'
                            placeholder="seuil d'admission du lycée"
                            type='number'
                            onChange={onSeuilLyceeChange}
                        />
                    </Col>
                    <Col>
                        <Button type='submit' disabled={seuilLycee < 1000 || seuilLycee > 42000}>Ajouter</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>&nbsp;</Col>
                </Row>
            </Form>
        </Container>
    ) 
}

export default SeuilEditor;