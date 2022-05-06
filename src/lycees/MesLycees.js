import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useLocalStorage } from '../useLocalStorage';
import ListeLycees from './ListeLycees';
import { specialitesMap } from '../data/specialites';
import FiltreSpecialite from './FiltreSpecialite';
import "bootstrap/dist/css/bootstrap.css";

const MesLycees = (props) => {
 
    const [lyceesSecteur1, setLyceesSecteur1] = useLocalStorage('lycees/Secteur1', []);
    const [lyceesSecteur2, setLyceesSecteur2] = useLocalStorage('lycees/Secteur2', []);
    const [lyceesSecteur3, setLyceesSecteur3] = useLocalStorage('lycees/Secteur3', []);

    const [lyceesBySpecialiteMap, setLyceesBySpecialiteMap] = useState(new Map());

    const secteurRefs = useRef([]);

    const handleFilterAdded = (newFiltre, spe) => {
        console.log("handleFilterAdded: " + spe);
        console.log(newFiltre);

        const found = lyceesBySpecialiteMap.get(spe);
        if (!found) {
            axios({
                "method": "GET",
                "url": "https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/LES_ENSEIGNEMENTS_DE_SPECIALITE_EN_CLASSE_DE_PREMIERE_RS_2021/FeatureServer/0/query",
                "headers": {},
                "params": {
                    outFields : 'ETABLISSEMENT',
                    returnGeometry : 'false',
                    f : 'pjson',
                    where : `ENSEIGNEMENT_DE_SPECIALITE='${specialitesMap.get(spe)}'`
                }
                })
                .then((response) => {
                    const payload = response.data.features;
                    if (payload) {
                        const lyceesWithSpe = payload.map((item) => {
                            return item.attributes.ETABLISSEMENT;
                        });
                        let newMap = new Map(lyceesBySpecialiteMap);
                        newMap.set(spe, lyceesWithSpe);
                        setLyceesBySpecialiteMap(newMap);
                        secteurRefs.current.forEach((ref) => {
                            ref.setFromOutside(newFiltre, newMap);
                        });                
                    }
                })
                .catch((error) => {
                    console.log(error);
                }); 
        }
        else {
            secteurRefs.current.forEach((ref) => {
                ref.setFromOutside(newFiltre, lyceesBySpecialiteMap);
            });    
        }
    }

    const handleFilterRemoved = (newFiltre, spe) => {
        console.log("handleFilterRemoved: " + spe);
        console.log(newFiltre);
        secteurRefs.current.forEach((ref) => {
            ref.setFromOutside(newFiltre, lyceesBySpecialiteMap);
        });
    }

    const onNewLyceesReceived = (secteur, lycees) => {
        switch (secteur) {
            case '1':
                setLyceesSecteur1(lycees);
                break;
            case '2':
                setLyceesSecteur2(lycees);
                break;
            case '3':
               setLyceesSecteur3(lycees);
                break;                
            default:
                break;
        }
    }
    
    return (
    <Container fluid>
        <FiltreSpecialite filterAdded={handleFilterAdded} filterRemoved={handleFilterRemoved}/>
        <div>&nbsp;</div>
        <Tabs defaultActiveKey="secteur1" id="lycees" className="mb-3">
            <Tab eventKey="secteur1" title='Secteur 1'>
                <ListeLycees
                    ref={(element) => {
                        secteurRefs.current[0] = element;
                    }}
                    secteur='1'
                    key={props.inputLycees}
                    inputLycees={props.inputLycees}
                    onChange={onNewLyceesReceived}
                 />
            </Tab>
            <Tab eventKey="secteur2" title='Secteur 2'>
                <ListeLycees
                    ref={(element) => {
                        secteurRefs.current[1] = element;
                    }}
                    secteur='2'
                    key={props.inputLycees}
                    inputLycees={props.inputLycees}
                    onChange={onNewLyceesReceived}
                />
            </Tab>
            <Tab eventKey="secteur3" title='Secteur 3'>
                <ListeLycees
                    ref={(element) => {
                        secteurRefs.current[2] = element;
                    }}
                    secteur='3'
                    key={props.inputLycees}
                    inputLycees={props.inputLycees}
                    onChange={onNewLyceesReceived}
                />
            </Tab>
        </Tabs>
    </Container>
    )
}

export default MesLycees;
