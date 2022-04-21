import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useLocalStorage } from "../useLocalStorage";
import BonusSelector from "./BonusSelector";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './MonCollege.css';
import CollegeSelector from './CollegeSelector';

const MonCollege = (props) => {

    const [collegesMultiples, setCollegesMultiples] = useLocalStorage("collegesMultiples", false);
    //const [college, setCollege] = useLocalStorage('college', []);
    const [bonusCollege, setBonusCollege] = useLocalStorage('bonusCollege', 0);
    const [nomCollege, setNomCollege] = useLocalStorage('nomCollege', '');
    const [nomCollegeSecteur, setNomCollegeSecteur] = useLocalStorage('nomCollege', '');
    //const [collegeSecteur, setCollegeSecteur] = useLocalStorage('collegeSecteur', '');
    
    //let [responseData, setResponseData] = React.useState('');
    //let [loading, setLoading] = React.useState(false);
    //let [options, setOptions] = React.useState([]);


    /* const handleChange = (bonus) => {
        setBonusIPS(parseInt(bonus));
        props.onChange(parseInt(bonus));
    } */

    const onCollegeScolarisationChange = (collegeUpdate) => {
        console.log('onCollegeScolarisationChange ' +  JSON.stringify(collegeUpdate));
        if (collegeUpdate != null) {
            if (collegeUpdate.bonus !== bonusCollege) {
                props.onChange(collegeUpdate.bonus);
            }
            setNomCollege(collegeUpdate.nom);
            setBonusCollege(collegeUpdate.bonus);
            if (!collegesMultiples) {
                setNomCollegeSecteur(collegeUpdate.nom);
            }
            
        }
    }

    const onCollegeSecteurChange = (collegeUpdate) => {
        console.log('onCollegeSectorisationChange ' +  JSON.stringify(collegeUpdate));
        if (collegeUpdate != null) {
            setNomCollegeSecteur(collegeUpdate.nom);
        }
    }

    const handleCollegesMultiples = (event) => {
        setCollegesMultiples(event.target.checked);
    }

    return (
        <Container fluid>
            <CollegeSelector type="scolarisation" onChange={onCollegeScolarisationChange} />
            <Form.Group className="mb-3" >
            <Row>Bonus IPS : {bonusCollege}</Row>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Switch
                    id='collegesMultiples'
                    label='collège de secteur différent'
                    defaultChecked={collegesMultiples}
                    onChange={handleCollegesMultiples} />
            </Form.Group>
            {
                collegesMultiples && (
                    <CollegeSelector type="secteur" onChange={onCollegeSecteurChange} />
                )
            }
        </Container>
    )
}
export default MonCollege;
