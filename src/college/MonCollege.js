import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
        if (collegeUpdate && collegeUpdate.nom !== nomCollege) {
            setNomCollege(collegeUpdate.nom);
            setBonusCollege(collegeUpdate.bonus);
            if (!collegesMultiples) {
                setNomCollegeSecteur(collegeUpdate.nom);
                props.onChange(collegeUpdate);
            }
            else {
                if (nomCollegeSecteur && (bonusCollege !== collegeUpdate.bonus)) {
                    props.onChange({ nom: nomCollegeSecteur, bonus: collegeUpdate.bonus});
                }
            }
        }
    }

    const onCollegeSecteurChange = (collegeUpdate) => {
        console.log('onCollegeSectorisationChange ' +  JSON.stringify(collegeUpdate));
        if (collegeUpdate && collegeUpdate.nom !== nomCollegeSecteur) {
            setNomCollegeSecteur(collegeUpdate.nom);
            props.onChange({ nom: collegeUpdate.nom, bonus: bonusCollege});
        }
    }

    const handleCollegesMultiples = (event) => {
        setCollegesMultiples(event.target.checked);
        setNomCollegeSecteur(event.target.checked ? [] : nomCollege);
        if (event.target.checked && nomCollegeSecteur && bonusCollege) {
            props.onChange({ nom: nomCollegeSecteur, bonus: bonusCollege});
        }

        else if (!event.target.checked && nomCollege && bonusCollege) {
            props.onChange({ nom: nomCollege, bonus: bonusCollege});
        }
    }

    return (
        <Container fluid>
            <CollegeSelector type="scolarisation" onChange={onCollegeScolarisationChange} />            
            <Form.Group className="mb-3" >
            Bonus IPS : {bonusCollege}
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
