import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLocalStorage } from "../useLocalStorage";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './MonCollege.css';
import CollegeSelector from './CollegeSelector';

const MonCollege = (props) => {

    const [collegesMultiples, setCollegesMultiples] = useLocalStorage('MonCollege/collegesMultiples', false);
    const [bonusCollege, setBonusCollege] = useLocalStorage('MonCollege/bonusCollege', 0);
    const [nomCollege, setNomCollege] = useLocalStorage('MonCollege/nomCollege', '');
    const [nomCollegeSecteur, setNomCollegeSecteur] = useLocalStorage('MonCollege/nomCollegeSecteur', '');

    const onCollegeScolarisationChange = (collegeUpdate) => {
        console.log('onCollegeScolarisationChange ' +  JSON.stringify(collegeUpdate));
        if (collegeUpdate != null) {
            if (collegeUpdate.bonus !== bonusCollege) {
                props.onBonusChange(collegeUpdate.bonus);
            }
            setNomCollege(collegeUpdate.nom);
            setBonusCollege(collegeUpdate.bonus);
            if (!collegesMultiples) {
                setNomCollegeSecteur(collegeUpdate.nom);
                props.onSecteurChange(collegeUpdate.nom);
            }
        }
    }

    const onCollegeSecteurChange = (collegeUpdate) => {
        console.log('onCollegeSectorisationChange ' +  JSON.stringify(collegeUpdate));
        if (collegeUpdate != null) {
            setNomCollegeSecteur(collegeUpdate.nom);
            props.onSecteurChange(collegeUpdate.nom);
        }
    }

    const handleCollegesMultiples = (event) => {
        setCollegesMultiples(event.target.checked);
        setNomCollegeSecteur(event.target.checked ? [] : nomCollege);
        if (event.target.checked) {
            props.onSecteurChange(nomCollege);
        }
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
