import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap';
import { useLocalStorage } from '../useLocalStorage';
import ListeLycees from './ListeLycees';

const MesLycees = (props) => {
 
    const [lyceesSecteur1, setLyceesSecteur1] = useLocalStorage('lycees/Secteur1', []);
    const [lyceesSecteur2, setLyceesSecteur2] = useLocalStorage('lycees/Secteur2', []);
    const [lyceesSecteur3, setLyceesSecteur3] = useLocalStorage('lycees/Secteur3', []);

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
        <Tabs defaultActiveKey="secteur1" id="lycees" className="mb-3">
            <Tab
                eventKey="secteur1"
                mountOnEnter
                unmountOnExit={false}
                title={
                <React.Fragment>
                    Sect. 1 &nbsp;
                    <Badge pill variant='light' bg='success'>{lyceesSecteur1.length}</Badge>
                </React.Fragment>
                }
            >
                <ListeLycees
                    secteur='1'
                    key={props.inputLycees}
                    inputLycees={props.inputLycees}
                    onChange={onNewLyceesReceived} />
            </Tab>
            <Tab
                eventKey="secteur2"
                mountOnEnter
                unmountOnExit={false}
                title={
                <React.Fragment>
                    Sect. 2 &nbsp;
                    <Badge pill variant='light' bg='primary'>{lyceesSecteur2.length}</Badge>
                </React.Fragment>
                }
            >
                <ListeLycees
                    secteur='2'
                    key={props.inputLycees}
                    inputLycees={props.inputLycees}
                    onChange={onNewLyceesReceived} />
            </Tab>
            <Tab
                eventKey="secteur3"
                mountOnEnter
                unmountOnExit={false}
                title={
                <React.Fragment>
                    Sect. 3 &nbsp;
                    <Badge pill variant='light' bg='secondary'>{lyceesSecteur3.length}</Badge>
                </React.Fragment>
                }
            >
                <ListeLycees
                    secteur='3'
                    key={props.inputLycees}
                    inputLycees={props.inputLycees}
                    onChange={onNewLyceesReceived} />
            </Tab>
        </Tabs>
    )
}
export default MesLycees;
