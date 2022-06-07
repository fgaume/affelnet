import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

import { getAllSeuils, updateSeuil } from '../seuildata';
import { listeLycees as lycees } from '../data/lycees';

import { CheckLg, ExclamationLg} from "react-bootstrap-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import { Alert } from "react-bootstrap";

const ContribSeuils = (props) => {

    const typeaheadRef = useRef(null);
    const [seuils, setSeuils] = useState(new Map());
    const [lyceeSeuil, setLyceeSeuil] = useState('');
    const [seuilLycee, setSeuilLycee] = useState(0);

    const handleNewSeuil = (event) => {
        if (seuils.get(lyceeSeuil.code) !== seuilLycee) {
            updateSeuil(lyceeSeuil.code, seuilLycee);
            const newSeuils = new Map(seuils);
            newSeuils.set(lyceeSeuil.code, seuilLycee);
            setSeuils(newSeuils);
            typeaheadRef.current.clear();
            document.getElementById("seuilLycee").value = '';
        }
        else {
            console.log("no change for " + lyceeSeuil.nom);
        }
    }

    const onLyceeChange = (lyceeUpdate) => {
        setLyceeSeuil(lyceeUpdate[0]);
    }

    const onSeuilLyceeChange = (event) => {
        setSeuilLycee(event.target.value);
    }

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            getAllSeuils().then((seuilList) => {
                console.log('in use');
                console.log(seuilList);
                setSeuils(seuilList);
            });   
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, []);


    return (
    <Container>
        <Alert variant='success'>
            Afin d'en faire profiter la communauté, ajoutez ici les seuils d'admission des lycées que vous avez demandés
            cette année (et qui ne sont pas déjà connus dans la liste ci-dessous).
            <br /> Il s'agit du score du dernier admis, fourni dans la dernière colonne de la fiche barème
            qu'il faut demander par email au Rectorat dès le 1er juillet à l'adresse : <b>ce.dve@ac-paris.fr</b>
        </Alert>
        <hr />
        <Row className="justify-content-md-center">
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
                <Button onClick={handleNewSeuil} disabled={seuilLycee < 1000 || seuilLycee > 42000}>Ajouter</Button>
            </Col>
        </Row>
        <Row>
            <Col>&nbsp;</Col>
        </Row>
            
        <ListGroup>
            {lycees.map((lycee,index) => (
                <ListGroup.Item key={lycee.code} variant={seuils.get(lycee.code) > 0 ? 'success' : 'warning'}>
                    <Row>
                        <Col>
                            {lycee.nom}&nbsp;
                            { seuils.get(lycee.code) > 0 && <CheckLg color='green' width='20' height='20' />}
                            { seuils.get(lycee.code) === 0  && <ExclamationLg color='red' width='20' height='20' />}
                        </Col>
                        <Col>
                            { seuils.get(lycee.code) > 0 && parseInt((seuils.get(lycee.code))).toLocaleString() }
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
    ) 
}

export default ContribSeuils;